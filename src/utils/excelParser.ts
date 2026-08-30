import * as XLSX from 'xlsx';
import { MutualFundScheme } from '../data/mutualFundsData';

export interface ParseResult {
  schemes: MutualFundScheme[];
  fileName: string;
  totalRows: number;
  error?: string;
}

export async function parseExcelFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert sheet to json array
        const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: null });

        if (!rawJson || rawJson.length === 0) {
          resolve({ schemes: [], fileName: file.name, totalRows: 0, error: 'The uploaded file is empty.' });
          return;
        }

        const parsedSchemes: MutualFundScheme[] = rawJson.map((row, index) => {
          // Flexible key lookup
          const name = row['Scheme/Benchmark'] || row['Scheme / Benchmark'] || row['Scheme Name'] || row['Scheme'] || row['scheme'] || `Scheme ${index + 1}`;
          
          const ret1Y = parseNumeric(row['1Y'] ?? row['1y'] ?? row['1 Year'] ?? row['1 Yr'] ?? row['1yr']);
          const ret3Y = parseNumeric(row['3Y'] ?? row['3y'] ?? row['3 Year'] ?? row['3 Yr'] ?? row['3yr']);
          const ret5Y = parseNumeric(row['5Y'] ?? row['5y'] ?? row['5 Year'] ?? row['5 Yr'] ?? row['5yr']);
          const ret10Y = parseNumeric(row['10Y'] ?? row['10y'] ?? row['10 Year'] ?? row['10 Yr'] ?? row['10yr']);
          const ret15Y = parseNumeric(row['15Y'] ?? row['15y'] ?? row['15 Year'] ?? row['15 Yr'] ?? row['15yr']);

          const inceptionDateRaw = row['Inception Date'] || row['Inception'] || row['InceptionDate'] || row['Launch Date'] || '15-Jan-2015';
          const inceptionDate = formatInceptionDate(inceptionDateRaw);

          const expenseRatio = parseNumeric(row['Expense Ratio (%)'] ?? row['Expense Ratio'] ?? row['TER (%)'] ?? row['TER']) ?? 1.5;
          const aumCrores = parseNumeric(row['AUM (₹ Crores)'] ?? row['AUM'] ?? row['AUM (Cr)'] ?? row['AUM (₹ Cr)']) ?? 1000;

          // Categorization detection
          const category = detectCategory(name, row['Category'] || row['category']);
          const subCategory = row['Sub Category'] || row['SubCategory'] || detectSubCategory(name, category);
          const benchmark = row['Benchmark'] || detectBenchmark(subCategory, category);

          return {
            id: `uploaded-${index + 1}-${Date.now()}`,
            name: String(name).trim(),
            amc: extractAmc(String(name)),
            category,
            subCategory,
            nav: parseNumeric(row['NAV'] ?? row['nav']) ?? 50.0,
            return1Y: ret1Y,
            return3Y: ret3Y,
            return5Y: ret5Y,
            return10Y: ret10Y,
            return15Y: ret15Y,
            inceptionDate,
            inceptionReturn: parseNumeric(row['Inception Return']) ?? 14.5,
            expenseRatio: expenseRatio ?? 1.25,
            aumCrores: aumCrores ?? 2500,
            benchmark,
            riskLevel: category === 'DEBT' ? 'Low to Moderate' : 'Very High'
          };
        });

        resolve({
          schemes: parsedSchemes,
          fileName: file.name,
          totalRows: parsedSchemes.length
        });
      } catch (err: any) {
        resolve({
          schemes: [],
          fileName: file.name,
          totalRows: 0,
          error: err?.message || 'Failed to parse Excel file.'
        });
      }
    };

    reader.onerror = () => {
      resolve({ schemes: [], fileName: file.name, totalRows: 0, error: 'Error reading file.' });
    };

    reader.readAsArrayBuffer(file);
  });
}

function parseNumeric(val: any): number | null {
  if (val === null || val === undefined || val === '' || val === '-' || val === 'NA' || val === 'N/A') {
    return null;
  }
  const num = Number(val);
  return isNaN(num) ? null : num;
}

function formatInceptionDate(val: any): string {
  if (!val) return '01-Jan-2015';
  if (typeof val === 'number') {
    // Excel date serial number
    const date = new Date(Math.round((val - 25569) * 86400 * 1000));
    const day = String(date.getUTCDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getUTCMonth()] || 'Jan';
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
  const str = String(val).trim();
  // If YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[parseInt(m, 10) - 1] || m;
    return `${d}-${month}-${y}`;
  }
  return str;
}

function extractAmc(schemeName: string): string {
  const knownAmcs = [
    'HDFC', 'ICICI Prudential', 'SBI', 'Nippon India', 'Kotak', 'Parag Parikh',
    'Quant', 'Tata', 'Mirae Asset', 'Axis', 'UTI', 'DSP', 'Bandhan', 'Motilal Oswal',
    'WhiteOak Capital', 'Canara Robeco', 'Sundaram', 'Edelweiss', 'Invesco',
    'Franklin', 'HSBC', 'Aditya Birla Sun Life', 'TRUSTMF', 'Bajaj Finserv', 'Bank of India'
  ];
  for (const amc of knownAmcs) {
    if (schemeName.toLowerCase().includes(amc.toLowerCase())) {
      return `${amc} Mutual Fund`;
    }
  }
  const firstWord = schemeName.split(' ')[0];
  return `${firstWord} Mutual Fund`;
}

function detectCategory(name: string, explicitCat?: string): 'EQUITY' | 'DEBT' | 'HYBRID' | 'GOLD & SILVER' {
  if (explicitCat) {
    const c = explicitCat.toUpperCase();
    if (c.includes('EQUITY')) return 'EQUITY';
    if (c.includes('DEBT') || c.includes('BOND') || c.includes('LIQUID')) return 'DEBT';
    if (c.includes('HYBRID') || c.includes('BALANCED') || c.includes('ADVANTAGE')) return 'HYBRID';
    if (c.includes('GOLD') || c.includes('SILVER') || c.includes('COMMODITY')) return 'GOLD & SILVER';
  }

  const lower = name.toLowerCase();
  if (lower.includes('gold') || lower.includes('silver') || lower.includes('commodity') || lower.includes('precious metals')) {
    return 'GOLD & SILVER';
  }
  if (lower.includes('balanced') || lower.includes('hybrid') || lower.includes('arbitrage') || lower.includes('multi asset') || lower.includes('equity savings')) {
    return 'HYBRID';
  }
  if (lower.includes('liquid') || lower.includes('overnight') || lower.includes('gilt') || lower.includes('bond') || lower.includes('debt') || lower.includes('money market') || lower.includes('short duration') || lower.includes('banking and psu') || lower.includes('floater')) {
    return 'DEBT';
  }
  return 'EQUITY';
}

function detectSubCategory(name: string, category: 'EQUITY' | 'DEBT' | 'HYBRID' | 'GOLD & SILVER'): string {
  const lower = name.toLowerCase();
  if (category === 'EQUITY') {
    if (lower.includes('small cap')) return 'Small Cap Fund';
    if (lower.includes('mid cap') || lower.includes('midcap')) return 'Mid Cap Fund';
    if (lower.includes('large & mid') || lower.includes('large and mid')) return 'Large & Mid Cap Fund';
    if (lower.includes('large cap') || lower.includes('bluechip') || lower.includes('top 100')) return 'Large Cap Fund';
    if (lower.includes('flexi cap') || lower.includes('flexicap')) return 'Flexi Cap Fund';
    if (lower.includes('multi cap') || lower.includes('multicap')) return 'Multi Cap Fund';
    if (lower.includes('elss') || lower.includes('tax')) return 'ELSS (Tax Saving)';
    if (lower.includes('value') || lower.includes('contra')) return 'Value Fund';
    if (lower.includes('focused')) return 'Focused Fund';
    return 'Sectoral / Thematic';
  }
  if (category === 'DEBT') {
    if (lower.includes('liquid')) return 'Liquid Fund';
    if (lower.includes('overnight')) return 'Overnight Fund';
    if (lower.includes('money market')) return 'Money Market Fund';
    if (lower.includes('corporate bond')) return 'Corporate Bond Fund';
    if (lower.includes('gilt')) return 'Gilt Fund';
    if (lower.includes('banking')) return 'Banking and PSU Fund';
    return 'Short Duration Fund';
  }
  if (category === 'HYBRID') {
    if (lower.includes('balanced advantage') || lower.includes('dynamic asset')) return 'Dynamic Asset Allocation / Balanced Advantage';
    if (lower.includes('aggressive')) return 'Aggressive Hybrid Fund';
    if (lower.includes('arbitrage')) return 'Arbitrage Fund';
    if (lower.includes('multi asset')) return 'Multi Asset Allocation';
    return 'Balanced Advantage Fund';
  }
  if (lower.includes('silver')) return 'Silver ETF & FoF';
  return 'Gold ETF & FoF';
}

function detectBenchmark(subCategory: string, category: string): string {
  if (category === 'GOLD & SILVER') {
    return subCategory.includes('Silver') ? 'Domestic Price of Physical Silver' : 'Domestic Price of Physical Gold';
  }
  if (category === 'DEBT') {
    return 'CRISIL Corporate Bond Composite Index';
  }
  if (category === 'HYBRID') {
    return 'NIFTY 50 Hybrid Composite Debt 50:50 Index';
  }
  if (subCategory.includes('Small')) return 'NIFTY Smallcap 250 TRI';
  if (subCategory.includes('Mid')) return 'NIFTY Midcap 150 TRI';
  if (subCategory.includes('Large')) return 'NIFTY 100 TRI';
  return 'Nifty 500 TRI';
}
