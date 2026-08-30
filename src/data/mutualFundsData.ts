// Step 1 & 2: Datasets
export const mutualFundData = [
  {
    "Scheme/Benchmark": "Franklin Asian Equity Fund - Gr",
    "1Y": 44.53, "5Y": 9.54, "10Y": 10.05, "15Y": 10.52,
    "Inception Date": "2008-01-16", "Expense Ratio (%)": 1.93, "AUM": 953.71
  },
  {
    "Scheme/Benchmark": "SBI Automotive Opportunities Fund - Gr",
    "1Y": 34.67, "5Y": null, "10Y": null, "15Y": null,
    "Inception Date": "2024-06-05", "Expense Ratio (%)": 1.59, "AUM": 5752.1
  },
  {
    "Scheme/Benchmark": "TRUSTMF Small Cap Fund - Gr",
    "1Y": 31.04, "5Y": null, "10Y": null, "15Y": null,
    "Inception Date": "2024-11-04", "Expense Ratio (%)": 1.71, "AUM": 2859.82
  },
  {
    "Scheme/Benchmark": "HDFC Defence Fund - Gr",
    "1Y": 30.74, "5Y": null, "10Y": null, "15Y": null,
    "Inception Date": "2023-06-02", "Expense Ratio (%)": 1.49, "AUM": 10709.17
  },
  {
    "Scheme/Benchmark": "Aditya Birla Sun Life Manufacturing Equity Fund - Regular Gr",
    "1Y": 26.68, "5Y": 16.19, "10Y": 13.72, "15Y": null,
    "Inception Date": "2015-01-13", "Expense Ratio (%)": 1.86, "AUM": 1288.36
  },
  {
    "Scheme/Benchmark": "Bank of India Small Cap Fund - Gr",
    "1Y": 26.65, "5Y": 25.18, "10Y": null, "15Y": null,
    "Inception Date": "2018-12-18", "Expense Ratio (%)": 1.68, "AUM": 1083.54
  },
  {
    "Scheme/Benchmark": "Motilal Oswal Midcap Fund - Gr",
    "1Y": 26.47, "5Y": 30.12, "10Y": 18.25, "15Y": 15.62,
    "Inception Date": "2007-02-24", "Expense Ratio (%)": 1.62, "AUM": 21456.89
  },
  {
    "Scheme/Benchmark": "Quant Small Cap Fund - Gr",
    "1Y": 26.24, "5Y": 28.17, "10Y": 21.05, "15Y": 14.51,
    "Inception Date": "2007-11-21", "Expense Ratio (%)": 1.63, "AUM": 23412.55
  },
  {
    "Scheme/Benchmark": "Invesco India Infrastructure Fund - Gr",
    "1Y": 25.89, "5Y": 25.13, "10Y": 14.47, "15Y": 10.63,
    "Inception Date": "2007-11-21", "Expense Ratio (%)": 1.99, "AUM": 1582.44
  },
  {
    "Scheme/Benchmark": "Quant Infrastructure Fund - Gr",
    "1Y": 25.76, "5Y": 31.95, "10Y": 18.06, "15Y": 12.87,
    "Inception Date": "2008-06-23", "Expense Ratio (%)": 1.68, "AUM": 4356.12
  },
  {
    "Scheme/Benchmark": "Bajaj Finserv Multi Cap Fund - Gr",
    "1Y": 11.59, "5Y": null, "10Y": null, "15Y": null,
    "Inception Date": "2025-02-27", "Expense Ratio (%)": 1.82, "AUM": 1510.55
  },
  {
    "Scheme/Benchmark": "Bandhan Small Cap Fund - Gr",
    "1Y": 11.51, "5Y": 19.65, "10Y": null, "15Y": null,
    "Inception Date": "2020-02-03", "Expense Ratio (%)": 1.36, "AUM": 31103.03
  },
  {
    "Scheme/Benchmark": "Axis Multicap Fund - Regular Gr",
    "1Y": 11.43, "5Y": null, "10Y": null, "15Y": null,
    "Inception Date": "2021-12-17", "Expense Ratio (%)": 1.5, "AUM": 10973.14
  },
  {
    "Scheme/Benchmark": "Tata Small Cap Fund - Gr",
    "1Y": 11.23, "5Y": 21.45, "10Y": null, "15Y": null,
    "Inception Date": "2018-11-12", "Expense Ratio (%)": 1.45, "AUM": 7890.12
  },
  {
    "Scheme/Benchmark": "Nippon India Small Cap Fund - Gr",
    "1Y": 11.10, "5Y": 24.50, "10Y": 17.80, "15Y": 13.90,
    "Inception Date": "2010-09-16", "Expense Ratio (%)": 1.55, "AUM": 54210.80
  },
  {
    "Scheme/Benchmark": "SBI Small Cap Fund - Gr",
    "1Y": 10.95, "5Y": 20.10, "10Y": 16.20, "15Y": null,
    "Inception Date": "2009-09-09", "Expense Ratio (%)": 1.62, "AUM": 28450.60
  },
  {
    "Scheme/Benchmark": "Axis Small Cap Fund - Gr",
    "1Y": 10.82, "5Y": 21.80, "10Y": 15.90, "15Y": null,
    "Inception Date": "2013-11-29", "Expense Ratio (%)": 1.48, "AUM": 19820.40
  },
  {
    "Scheme/Benchmark": "Kotak Small Cap Fund - Gr",
    "1Y": 10.70, "5Y": 19.40, "10Y": 15.10, "15Y": null,
    "Inception Date": "2008-02-25", "Expense Ratio (%)": 1.65, "AUM": 16540.30
  },
  {
    "Scheme/Benchmark": "DSP Small Cap Fund - Gr",
    "1Y": 10.55, "5Y": 18.90, "10Y": 14.80, "15Y": 12.40,
    "Inception Date": "2007-06-14", "Expense Ratio (%)": 1.72, "AUM": 14210.90
  },
  {
    "Scheme/Benchmark": "HDFC Small Cap Fund - Gr",
    "1Y": 10.40, "5Y": 22.10, "10Y": 16.50, "15Y": 13.10,
    "Inception Date": "2008-04-03", "Expense Ratio (%)": 1.58, "AUM": 32100.50
  }
];

export interface MutualFundScheme {
  id: string;
  name: string;
  amc: string;
  category: 'EQUITY' | 'DEBT' | 'HYBRID' | 'GOLD & SILVER';
  subCategory: string;
  nav: number;
  return1Y: number | null;
  return3Y?: number | null;
  return5Y: number | null;
  return10Y: number | null;
  return15Y: number | null;
  inceptionDate: string;
  inceptionReturn?: number | null;
  expenseRatio: number;
  aumCrores: number;
  benchmark: string;
  benchmark1Y?: number;
  benchmark5Y?: number;
  benchmark10Y?: number;
  riskLevel?: 'Very High' | 'High' | 'Moderately High' | 'Moderate' | 'Low to Moderate' | 'Low';
}

export const BASE_MUTUAL_FUNDS: MutualFundScheme[] = [
  {
    id: 'franklin-asian-01',
    name: 'Franklin Asian Equity Fund - Gr',
    amc: 'Franklin Templeton Mutual Fund',
    category: 'EQUITY',
    subCategory: 'International / Sectoral',
    nav: 38.65,
    return1Y: 44.53,
    return3Y: 18.20,
    return5Y: 9.54,
    return10Y: 10.05,
    return15Y: 10.52,
    inceptionDate: '16-Jan-2008',
    inceptionReturn: 9.85,
    expenseRatio: 1.93,
    aumCrores: 953.71,
    benchmark: 'MSCI Asia (ex-Japan) TRI',
    benchmark1Y: 38.40,
    benchmark5Y: 8.20,
    benchmark10Y: 8.90,
    riskLevel: 'Very High'
  },
  {
    id: 'sbi-auto-02',
    name: 'SBI Automotive Opportunities Fund - Gr',
    amc: 'SBI Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Sectoral / Thematic',
    nav: 14.85,
    return1Y: 34.67,
    return3Y: null,
    return5Y: null,
    return10Y: null,
    return15Y: null,
    inceptionDate: '05-Jun-2024',
    inceptionReturn: 34.67,
    expenseRatio: 1.59,
    aumCrores: 5752.10,
    benchmark: 'Nifty Auto TRI',
    benchmark1Y: 32.10,
    benchmark5Y: null as any,
    benchmark10Y: null as any,
    riskLevel: 'Very High'
  },
  {
    id: 'trust-small-03',
    name: 'TRUSTMF Small Cap Fund - Gr',
    amc: 'TRUST Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 13.10,
    return1Y: 31.04,
    return3Y: null,
    return5Y: null,
    return10Y: null,
    return15Y: null,
    inceptionDate: '04-Nov-2024',
    inceptionReturn: 31.04,
    expenseRatio: 1.71,
    aumCrores: 2859.82,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 29.80,
    riskLevel: 'Very High'
  },
  {
    id: 'hdfc-defence-04',
    name: 'HDFC Defence Fund - Gr',
    amc: 'HDFC Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Sectoral / Thematic',
    nav: 22.45,
    return1Y: 30.74,
    return3Y: null,
    return5Y: null,
    return10Y: null,
    return15Y: null,
    inceptionDate: '02-Jun-2023',
    inceptionReturn: 52.80,
    expenseRatio: 1.49,
    aumCrores: 10709.17,
    benchmark: 'Nifty India Defence TRI',
    benchmark1Y: 38.90,
    riskLevel: 'Very High'
  },
  {
    id: 'absl-mfg-05',
    name: 'Aditya Birla Sun Life Manufacturing Equity Fund - Regular Gr',
    amc: 'Aditya Birla Sun Life Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Sectoral / Thematic',
    nav: 29.40,
    return1Y: 26.68,
    return3Y: 19.80,
    return5Y: 16.19,
    return10Y: 13.72,
    return15Y: null,
    inceptionDate: '13-Jan-2015',
    inceptionReturn: 14.20,
    expenseRatio: 1.86,
    aumCrores: 1288.36,
    benchmark: 'Nifty India Manufacturing TRI',
    benchmark1Y: 25.40,
    benchmark5Y: 15.20,
    benchmark10Y: 12.80,
    riskLevel: 'Very High'
  },
  {
    id: 'boi-small-06',
    name: 'Bank of India Small Cap Fund - Gr',
    amc: 'Bank of India Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 41.25,
    return1Y: 26.65,
    return3Y: 28.90,
    return5Y: 25.18,
    return10Y: null,
    return15Y: null,
    inceptionDate: '18-Dec-2018',
    inceptionReturn: 26.40,
    expenseRatio: 1.68,
    aumCrores: 1083.54,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 26.50,
    benchmark5Y: 22.10,
    riskLevel: 'Very High'
  },
  {
    id: 'motilal-mid-07',
    name: 'Motilal Oswal Midcap Fund - Gr',
    amc: 'Motilal Oswal Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Mid Cap Fund',
    nav: 96.80,
    return1Y: 26.47,
    return3Y: 34.50,
    return5Y: 30.12,
    return10Y: 18.25,
    return15Y: 15.62,
    inceptionDate: '24-Feb-2007',
    inceptionReturn: 17.80,
    expenseRatio: 1.62,
    aumCrores: 21456.89,
    benchmark: 'NIFTY Midcap 150 TRI',
    benchmark1Y: 27.80,
    benchmark5Y: 24.10,
    benchmark10Y: 16.50,
    riskLevel: 'Very High'
  },
  {
    id: 'quant-small-08',
    name: 'Quant Small Cap Fund - Gr',
    amc: 'Quant Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 245.80,
    return1Y: 26.24,
    return3Y: 32.40,
    return5Y: 28.17,
    return10Y: 21.05,
    return15Y: 14.51,
    inceptionDate: '21-Nov-2007',
    inceptionReturn: 16.80,
    expenseRatio: 1.63,
    aumCrores: 23412.55,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 26.50,
    benchmark5Y: 22.10,
    benchmark10Y: 17.80,
    riskLevel: 'Very High'
  },
  {
    id: 'invesco-infra-09',
    name: 'Invesco India Infrastructure Fund - Gr',
    amc: 'Invesco Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Sectoral / Thematic',
    nav: 58.70,
    return1Y: 25.89,
    return3Y: 26.10,
    return5Y: 25.13,
    return10Y: 14.47,
    return15Y: 10.63,
    inceptionDate: '21-Nov-2007',
    inceptionReturn: 12.30,
    expenseRatio: 1.99,
    aumCrores: 1582.44,
    benchmark: 'S&P BSE India Infrastructure TRI',
    benchmark1Y: 27.20,
    benchmark5Y: 22.80,
    benchmark10Y: 13.50,
    riskLevel: 'Very High'
  },
  {
    id: 'quant-infra-10',
    name: 'Quant Infrastructure Fund - Gr',
    amc: 'Quant Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Sectoral / Thematic',
    nav: 44.90,
    return1Y: 25.76,
    return3Y: 34.20,
    return5Y: 31.95,
    return10Y: 18.06,
    return15Y: 12.87,
    inceptionDate: '23-Jun-2008',
    inceptionReturn: 14.25,
    expenseRatio: 1.68,
    aumCrores: 4356.12,
    benchmark: 'NIFTY Infrastructure TRI',
    benchmark1Y: 27.10,
    benchmark5Y: 23.40,
    benchmark10Y: 15.20,
    riskLevel: 'Very High'
  },
  {
    id: 'bajaj-multi-11',
    name: 'Bajaj Finserv Multi Cap Fund - Gr',
    amc: 'Bajaj Finserv Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Multi Cap Fund',
    nav: 11.20,
    return1Y: 11.59,
    return3Y: null,
    return5Y: null,
    return10Y: null,
    return15Y: null,
    inceptionDate: '27-Feb-2025',
    inceptionReturn: 11.59,
    expenseRatio: 1.82,
    aumCrores: 1510.55,
    benchmark: 'NIFTY 500 Multicap 50:25:25 TRI',
    benchmark1Y: 12.40,
    riskLevel: 'Very High'
  },
  {
    id: 'bandhan-small-12',
    name: 'Bandhan Small Cap Fund - Gr',
    amc: 'Bandhan Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 36.80,
    return1Y: 11.51,
    return3Y: 16.40,
    return5Y: 19.65,
    return10Y: null,
    return15Y: null,
    inceptionDate: '03-Feb-2020',
    inceptionReturn: 21.30,
    expenseRatio: 1.36,
    aumCrores: 31103.03,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 12.10,
    benchmark5Y: 18.20,
    riskLevel: 'Very High'
  },
  {
    id: 'axis-multi-13',
    name: 'Axis Multicap Fund - Regular Gr',
    amc: 'Axis Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Multi Cap Fund',
    nav: 15.60,
    return1Y: 11.43,
    return3Y: 14.80,
    return5Y: null,
    return10Y: null,
    return15Y: null,
    inceptionDate: '17-Dec-2021',
    inceptionReturn: 13.90,
    expenseRatio: 1.50,
    aumCrores: 10973.14,
    benchmark: 'NIFTY 500 Multicap 50:25:25 TRI',
    benchmark1Y: 12.40,
    riskLevel: 'Very High'
  },
  {
    id: 'tata-small-14',
    name: 'Tata Small Cap Fund - Gr',
    amc: 'Tata Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 38.40,
    return1Y: 11.23,
    return3Y: 18.20,
    return5Y: 21.45,
    return10Y: null,
    return15Y: null,
    inceptionDate: '12-Nov-2018',
    inceptionReturn: 22.80,
    expenseRatio: 1.45,
    aumCrores: 7890.12,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 12.10,
    benchmark5Y: 18.20,
    riskLevel: 'Very High'
  },
  {
    id: 'nippon-small-15',
    name: 'Nippon India Small Cap Fund - Gr',
    amc: 'Nippon India Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 158.40,
    return1Y: 11.10,
    return3Y: 22.80,
    return5Y: 24.50,
    return10Y: 17.80,
    return15Y: 13.90,
    inceptionDate: '16-Sep-2010',
    inceptionReturn: 19.50,
    expenseRatio: 1.55,
    aumCrores: 54210.80,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 12.10,
    benchmark5Y: 18.20,
    benchmark10Y: 15.60,
    riskLevel: 'Very High'
  },
  {
    id: 'sbi-small-16',
    name: 'SBI Small Cap Fund - Gr',
    amc: 'SBI Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 162.10,
    return1Y: 10.95,
    return3Y: 18.90,
    return5Y: 20.10,
    return10Y: 16.20,
    return15Y: null,
    inceptionDate: '09-Sep-2009',
    inceptionReturn: 18.40,
    expenseRatio: 1.62,
    aumCrores: 28450.60,
    benchmark: 'BSE 250 SmallCap TRI',
    benchmark1Y: 11.90,
    benchmark5Y: 17.80,
    benchmark10Y: 14.90,
    riskLevel: 'Very High'
  },
  {
    id: 'axis-small-17',
    name: 'Axis Small Cap Fund - Gr',
    amc: 'Axis Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 98.70,
    return1Y: 10.82,
    return3Y: 19.20,
    return5Y: 21.80,
    return10Y: 15.90,
    return15Y: null,
    inceptionDate: '29-Nov-2013',
    inceptionReturn: 20.10,
    expenseRatio: 1.48,
    aumCrores: 19820.40,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 12.10,
    benchmark5Y: 18.20,
    benchmark10Y: 15.60,
    riskLevel: 'Very High'
  },
  {
    id: 'kotak-small-18',
    name: 'Kotak Small Cap Fund - Gr',
    amc: 'Kotak Mahindra Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 224.50,
    return1Y: 10.70,
    return3Y: 17.50,
    return5Y: 19.40,
    return10Y: 15.10,
    return15Y: null,
    inceptionDate: '25-Feb-2008',
    inceptionReturn: 17.20,
    expenseRatio: 1.65,
    aumCrores: 16540.30,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 12.10,
    benchmark5Y: 18.20,
    benchmark10Y: 15.60,
    riskLevel: 'Very High'
  },
  {
    id: 'dsp-small-19',
    name: 'DSP Small Cap Fund - Gr',
    amc: 'DSP Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 148.90,
    return1Y: 10.55,
    return3Y: 16.80,
    return5Y: 18.90,
    return10Y: 14.80,
    return15Y: 12.40,
    inceptionDate: '14-Jun-2007',
    inceptionReturn: 15.90,
    expenseRatio: 1.72,
    aumCrores: 14210.90,
    benchmark: 'BSE 250 SmallCap TRI',
    benchmark1Y: 11.90,
    benchmark5Y: 17.80,
    benchmark10Y: 14.90,
    riskLevel: 'Very High'
  },
  {
    id: 'hdfc-small-20',
    name: 'HDFC Small Cap Fund - Gr',
    amc: 'HDFC Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 128.60,
    return1Y: 10.40,
    return3Y: 20.40,
    return5Y: 22.10,
    return10Y: 16.50,
    return15Y: 13.10,
    inceptionDate: '03-Apr-2008',
    inceptionReturn: 17.40,
    expenseRatio: 1.58,
    aumCrores: 32100.50,
    benchmark: 'BSE 250 SmallCap TRI',
    benchmark1Y: 11.90,
    benchmark5Y: 17.80,
    benchmark10Y: 14.90,
    riskLevel: 'Very High'
  },
  {
    id: 'ppfc-11',
    name: 'Parag Parikh Flexi Cap Fund - Gr',
    amc: 'Parag Parikh Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Flexi Cap Fund',
    nav: 79.42,
    return1Y: 28.64,
    return3Y: 21.85,
    return5Y: 24.12,
    return10Y: 19.83,
    return15Y: 18.25,
    inceptionDate: '28-May-2013',
    inceptionReturn: 19.45,
    expenseRatio: 0.62,
    aumCrores: 68450.25,
    benchmark: 'Nifty 500 TRI',
    benchmark1Y: 26.15,
    benchmark5Y: 18.42,
    benchmark10Y: 14.85,
    riskLevel: 'Very High'
  },
  {
    id: 'hdfc-mc-12',
    name: 'HDFC Mid-Cap Opportunities Fund - Gr',
    amc: 'HDFC Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Mid Cap Fund',
    nav: 178.65,
    return1Y: 38.45,
    return3Y: 29.12,
    return5Y: 26.85,
    return10Y: 20.45,
    return15Y: 21.18,
    inceptionDate: '25-Jun-2007',
    inceptionReturn: 18.92,
    expenseRatio: 0.74,
    aumCrores: 74210.80,
    benchmark: 'NIFTY Midcap 150 TRI',
    benchmark1Y: 34.20,
    benchmark5Y: 24.60,
    benchmark10Y: 18.90,
    riskLevel: 'Very High'
  },
  {
    id: 'nippon-sc-13',
    name: 'Nippon India Small Cap Fund - Gr',
    amc: 'Nippon India Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 164.20,
    return1Y: 42.15,
    return3Y: 32.65,
    return5Y: 31.42,
    return10Y: 24.65,
    return15Y: 22.90,
    inceptionDate: '16-Sep-2010',
    inceptionReturn: 21.40,
    expenseRatio: 0.68,
    aumCrores: 56340.10,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 37.80,
    benchmark5Y: 27.40,
    benchmark10Y: 20.15,
    riskLevel: 'Very High'
  },
  {
    id: 'icici-ba-14',
    name: 'ICICI Prudential Balanced Advantage Fund - Gr',
    amc: 'ICICI Prudential Mutual Fund',
    category: 'HYBRID',
    subCategory: 'Dynamic Asset Allocation / Balanced Advantage',
    nav: 68.90,
    return1Y: 18.45,
    return3Y: 14.80,
    return5Y: 15.65,
    return10Y: 13.25,
    return15Y: 13.90,
    inceptionDate: '30-Dec-2006',
    inceptionReturn: 12.85,
    expenseRatio: 0.88,
    aumCrores: 59840.40,
    benchmark: 'NIFTY 50 Hybrid Composite Debt 50:50 Index',
    benchmark1Y: 14.20,
    benchmark5Y: 12.50,
    benchmark10Y: 11.10,
    riskLevel: 'Moderately High'
  },
  {
    id: 'sbi-bluechip-15',
    name: 'SBI Bluechip Fund - Gr',
    amc: 'SBI Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Large Cap Fund',
    nav: 92.40,
    return1Y: 22.15,
    return3Y: 17.65,
    return5Y: 18.90,
    return10Y: 15.40,
    return15Y: 16.20,
    inceptionDate: '14-Feb-2006',
    inceptionReturn: 13.75,
    expenseRatio: 0.84,
    aumCrores: 48900.50,
    benchmark: 'S&P BSE 100 TRI',
    benchmark1Y: 23.40,
    benchmark5Y: 17.80,
    benchmark10Y: 14.20,
    riskLevel: 'Very High'
  },
  {
    id: 'mirae-large-16',
    name: 'Mirae Asset Large Cap Fund - Gr',
    amc: 'Mirae Asset Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Large Cap Fund',
    nav: 112.50,
    return1Y: 21.80,
    return3Y: 16.40,
    return5Y: 17.95,
    return10Y: 16.80,
    return15Y: 17.40,
    inceptionDate: '04-Apr-2008',
    inceptionReturn: 15.60,
    expenseRatio: 0.55,
    aumCrores: 39450.00,
    benchmark: 'NIFTY 100 TRI',
    benchmark1Y: 24.10,
    benchmark5Y: 17.90,
    benchmark10Y: 14.40,
    riskLevel: 'Very High'
  },
  {
    id: 'quant-small-07',
    name: 'Quant Small Cap Fund - Growth',
    amc: 'Quant Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Small Cap Fund',
    nav: 245.80,
    return1Y: 48.90,
    return3Y: 36.40,
    return5Y: 41.20,
    return10Y: 23.80,
    return15Y: 19.50,
    inceptionDate: '29-Oct-1996',
    inceptionReturn: 16.80,
    expenseRatio: 0.77,
    aumCrores: 22400.30,
    benchmark: 'NIFTY Smallcap 250 TRI',
    benchmark1Y: 37.80,
    benchmark5Y: 27.40,
    benchmark10Y: 20.15,
    riskLevel: 'Very High'
  },
  {
    id: 'tata-digital-08',
    name: 'Tata Digital India Fund - Growth',
    amc: 'Tata Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Sectoral / Thematic',
    nav: 54.12,
    return1Y: 31.40,
    return3Y: 11.20,
    return5Y: 23.60,
    return10Y: -1.51,
    return15Y: -7.53,
    inceptionDate: '28-Dec-2015',
    inceptionReturn: 20.40,
    expenseRatio: 0.42,
    aumCrores: 10450.60,
    benchmark: 'BSE Teck TRI',
    benchmark1Y: 28.90,
    benchmark5Y: 20.40,
    benchmark10Y: 16.10,
    riskLevel: 'Very High'
  },
  {
    id: 'kotak-em-09',
    name: 'Kotak Emerging Equity Fund - Growth',
    amc: 'Kotak Mahindra Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Mid Cap Fund',
    nav: 128.40,
    return1Y: 36.20,
    return3Y: 26.80,
    return5Y: 25.40,
    return10Y: 21.10,
    return15Y: 19.80,
    inceptionDate: '30-Mar-2007',
    inceptionReturn: 16.45,
    expenseRatio: 0.65,
    aumCrores: 48900.20,
    benchmark: 'NIFTY Midcap 150 TRI',
    benchmark1Y: 34.20,
    benchmark5Y: 24.60,
    benchmark10Y: 18.90,
    riskLevel: 'Very High'
  },
  {
    id: 'uti-nifty-10',
    name: 'UTI Nifty 50 Index Fund - Growth',
    amc: 'UTI Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Large Cap Fund',
    nav: 162.80,
    return1Y: 25.10,
    return3Y: 16.90,
    return5Y: 17.50,
    return10Y: 14.60,
    return15Y: 14.10,
    inceptionDate: '06-Mar-2000',
    inceptionReturn: 13.90,
    expenseRatio: 0.18,
    aumCrores: 19800.70,
    benchmark: 'NIFTY 50 TRI',
    benchmark1Y: 25.30,
    benchmark5Y: 17.65,
    benchmark10Y: 14.80,
    riskLevel: 'Very High'
  },
  {
    id: 'motilal-midcap-11',
    name: 'Motilal Oswal Midcap Fund - Growth',
    amc: 'Motilal Oswal Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Mid Cap Fund',
    nav: 98.40,
    return1Y: 52.60,
    return3Y: 38.40,
    return5Y: 29.80,
    return10Y: 21.50,
    return15Y: 18.90,
    inceptionDate: '24-Feb-2014',
    inceptionReturn: 22.80,
    expenseRatio: 0.72,
    aumCrores: 16700.40,
    benchmark: 'NIFTY Midcap 150 TRI',
    benchmark1Y: 34.20,
    benchmark5Y: 24.60,
    benchmark10Y: 18.90,
    riskLevel: 'Very High'
  },
  {
    id: 'dsp-tax-12',
    name: 'DSP ELSS Tax Saver Fund - Growth',
    amc: 'DSP Mutual Fund',
    category: 'EQUITY',
    subCategory: 'ELSS (Tax Saving)',
    nav: 114.60,
    return1Y: 34.50,
    return3Y: 22.10,
    return5Y: 21.90,
    return10Y: 17.80,
    return15Y: 16.90,
    inceptionDate: '18-Jan-2007',
    inceptionReturn: 15.20,
    expenseRatio: 0.75,
    aumCrores: 15400.90,
    benchmark: 'Nifty 500 TRI',
    benchmark1Y: 26.15,
    benchmark5Y: 18.42,
    benchmark10Y: 14.85,
    riskLevel: 'Very High'
  },
  {
    id: 'icici-corp-13',
    name: 'ICICI Prudential Corporate Bond Fund - Growth',
    amc: 'ICICI Prudential Mutual Fund',
    category: 'DEBT',
    subCategory: 'Corporate Bond Fund',
    nav: 28.45,
    return1Y: 8.12,
    return3Y: 6.95,
    return5Y: 7.42,
    return10Y: 8.05,
    return15Y: 8.40,
    inceptionDate: '18-Aug-2009',
    inceptionReturn: 8.25,
    expenseRatio: 0.32,
    aumCrores: 28400.10,
    benchmark: 'CRISIL Corporate Bond Composite Index',
    benchmark1Y: 7.80,
    benchmark5Y: 7.10,
    benchmark10Y: 7.75,
    riskLevel: 'Moderate'
  },
  {
    id: 'hdfc-short-14',
    name: 'HDFC Short Term Debt Fund - Growth',
    amc: 'HDFC Mutual Fund',
    category: 'DEBT',
    subCategory: 'Short Duration Fund',
    nav: 32.10,
    return1Y: 7.65,
    return3Y: 6.70,
    return5Y: 7.15,
    return10Y: 7.80,
    return15Y: 8.10,
    inceptionDate: '25-Jun-2010',
    inceptionReturn: 7.90,
    expenseRatio: 0.38,
    aumCrores: 17800.00,
    benchmark: 'CRISIL Short Duration Debt Index',
    benchmark1Y: 7.40,
    benchmark5Y: 6.85,
    benchmark10Y: 7.50,
    riskLevel: 'Low to Moderate'
  },
  {
    id: 'sbi-liquid-15',
    name: 'SBI Liquid Fund - Regular Growth',
    amc: 'SBI Mutual Fund',
    category: 'DEBT',
    subCategory: 'Liquid Fund',
    nav: 3840.50,
    return1Y: 7.20,
    return3Y: 6.15,
    return5Y: 5.85,
    return10Y: 6.75,
    return15Y: 7.20,
    inceptionDate: '24-Nov-2003',
    inceptionReturn: 7.10,
    expenseRatio: 0.22,
    aumCrores: 64200.00,
    benchmark: 'CRISIL Liquid Debt Index',
    benchmark1Y: 7.10,
    benchmark5Y: 5.80,
    benchmark10Y: 6.60,
    riskLevel: 'Low'
  },
  {
    id: 'bandhan-banking-16',
    name: 'Bandhan Banking & PSU Debt Fund - Growth',
    amc: 'Bandhan Mutual Fund',
    category: 'DEBT',
    subCategory: 'Banking and PSU Fund',
    nav: 24.30,
    return1Y: 7.85,
    return3Y: 6.45,
    return5Y: 6.95,
    return10Y: 7.60,
    return15Y: 7.95,
    inceptionDate: '07-Mar-2013',
    inceptionReturn: 7.70,
    expenseRatio: 0.31,
    aumCrores: 14500.00,
    benchmark: 'CRISIL Banking and PSU Debt Index',
    benchmark1Y: 7.50,
    benchmark5Y: 6.70,
    benchmark10Y: 7.35,
    riskLevel: 'Low to Moderate'
  },
  {
    id: 'canara-hybrid-17',
    name: 'Canara Robeco Equity Hybrid Fund - Growth',
    amc: 'Canara Robeco Mutual Fund',
    category: 'HYBRID',
    subCategory: 'Aggressive Hybrid Fund',
    nav: 340.20,
    return1Y: 24.80,
    return3Y: 17.90,
    return5Y: 18.20,
    return10Y: 14.90,
    return15Y: 15.60,
    inceptionDate: '01-Feb-1993',
    inceptionReturn: 14.20,
    expenseRatio: 0.62,
    aumCrores: 11200.00,
    benchmark: 'CRISIL Hybrid 35+65 Aggressive Index',
    benchmark1Y: 20.40,
    benchmark5Y: 15.80,
    benchmark10Y: 13.20,
    riskLevel: 'Very High'
  },
  {
    id: 'kotak-debt-hybrid-18',
    name: 'Kotak Debt Hybrid Fund - Growth',
    amc: 'Kotak Mahindra Mutual Fund',
    category: 'HYBRID',
    subCategory: 'Conservative Hybrid Fund',
    nav: 52.80,
    return1Y: 12.40,
    return3Y: 10.15,
    return5Y: 10.80,
    return10Y: 10.40,
    return15Y: 10.10,
    inceptionDate: '02-Dec-2003',
    inceptionReturn: 9.80,
    expenseRatio: 0.78,
    aumCrores: 3400.00,
    benchmark: 'CRISIL Hybrid 85+15 Conservative Index',
    benchmark1Y: 11.20,
    benchmark5Y: 9.90,
    benchmark10Y: 9.50,
    riskLevel: 'Moderate'
  },
  {
    id: 'nippon-gold-19',
    name: 'Nippon India Gold ETF BeES / Gold Savings Fund',
    amc: 'Nippon India Mutual Fund',
    category: 'GOLD & SILVER',
    subCategory: 'Gold ETF & FoF',
    nav: 32.50,
    return1Y: 29.40,
    return3Y: 16.80,
    return5Y: 14.90,
    return10Y: 11.20,
    return15Y: 9.80,
    inceptionDate: '08-Mar-2007',
    inceptionReturn: 11.40,
    expenseRatio: 0.12,
    aumCrores: 12400.00,
    benchmark: 'Domestic Price of Physical Gold',
    benchmark1Y: 29.80,
    benchmark5Y: 15.10,
    benchmark10Y: 11.45,
    riskLevel: 'High'
  },
  {
    id: 'icici-silver-20',
    name: 'ICICI Prudential Silver ETF Fund of Fund - Growth',
    amc: 'ICICI Prudential Mutual Fund',
    category: 'GOLD & SILVER',
    subCategory: 'Silver ETF & FoF',
    nav: 16.80,
    return1Y: 34.60,
    return3Y: 21.40,
    return5Y: 16.80,
    return10Y: 8.90,
    return15Y: 6.40,
    inceptionDate: '25-Jan-2022',
    inceptionReturn: 19.80,
    expenseRatio: 0.35,
    aumCrores: 4800.00,
    benchmark: 'Domestic Price of Physical Silver',
    benchmark1Y: 35.20,
    benchmark5Y: 17.10,
    benchmark10Y: 9.10,
    riskLevel: 'Very High'
  },
  {
    id: 'whiteoak-flexi-21',
    name: 'WhiteOak Capital Flexi Cap Fund - Growth',
    amc: 'WhiteOak Capital Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Flexi Cap Fund',
    nav: 19.85,
    return1Y: 36.80,
    return3Y: 23.40,
    return5Y: 20.10,
    return10Y: 17.50,
    return15Y: 16.20,
    inceptionDate: '02-Aug-2022',
    inceptionReturn: 24.50,
    expenseRatio: 0.69,
    aumCrores: 4120.00,
    benchmark: 'S&P BSE 500 TRI',
    benchmark1Y: 26.40,
    benchmark5Y: 18.60,
    benchmark10Y: 15.10,
    riskLevel: 'Very High'
  },
  {
    id: 'axis-elss-22',
    name: 'Axis ELSS Tax Saver Fund - Growth',
    amc: 'Axis Mutual Fund',
    category: 'EQUITY',
    subCategory: 'ELSS (Tax Saving)',
    nav: 86.40,
    return1Y: 23.40,
    return3Y: 14.20,
    return5Y: 16.80,
    return10Y: 15.90,
    return15Y: 16.40,
    inceptionDate: '29-Dec-2009',
    inceptionReturn: 15.80,
    expenseRatio: 0.76,
    aumCrores: 34200.00,
    benchmark: 'Nifty 500 TRI',
    benchmark1Y: 26.15,
    benchmark5Y: 18.42,
    benchmark10Y: 14.85,
    riskLevel: 'Very High'
  },
  {
    id: 'mirae-midcap-23',
    name: 'Mirae Asset Midcap Fund - Growth',
    amc: 'Mirae Asset Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Mid Cap Fund',
    nav: 38.60,
    return1Y: 37.90,
    return3Y: 25.80,
    return5Y: 26.40,
    return10Y: 20.10,
    return15Y: 18.70,
    inceptionDate: '29-Jul-2019',
    inceptionReturn: 27.60,
    expenseRatio: 0.61,
    aumCrores: 17200.00,
    benchmark: 'NIFTY Midcap 150 TRI',
    benchmark1Y: 34.20,
    benchmark5Y: 24.60,
    benchmark10Y: 18.90,
    riskLevel: 'Very High'
  },
  {
    id: 'sbi-magnum-mid-24',
    name: 'SBI Magnum Midcap Fund - Growth',
    amc: 'SBI Mutual Fund',
    category: 'EQUITY',
    subCategory: 'Mid Cap Fund',
    nav: 224.50,
    return1Y: 33.40,
    return3Y: 26.20,
    return5Y: 27.80,
    return10Y: 19.80,
    return15Y: 20.10,
    inceptionDate: '29-Mar-2005',
    inceptionReturn: 17.10,
    expenseRatio: 0.82,
    aumCrores: 21800.00,
    benchmark: 'NIFTY Midcap 150 TRI',
    benchmark1Y: 34.20,
    benchmark5Y: 24.60,
    benchmark10Y: 18.90,
    riskLevel: 'Very High'
  },
  {
    id: 'tata-arbitrage-25',
    name: 'Tata Arbitrage Fund - Growth',
    amc: 'Tata Mutual Fund',
    category: 'HYBRID',
    subCategory: 'Arbitrage Fund',
    nav: 14.80,
    return1Y: 8.20,
    return3Y: 6.80,
    return5Y: 6.10,
    return10Y: 6.45,
    return15Y: 6.90,
    inceptionDate: '18-Dec-2018',
    inceptionReturn: 6.60,
    expenseRatio: 0.35,
    aumCrores: 9800.00,
    benchmark: 'Nifty 50 Arbitrage Index',
    benchmark1Y: 7.90,
    benchmark5Y: 5.95,
    benchmark10Y: 6.20,
    riskLevel: 'Low'
  }
];

// Generate dynamic 600 schemes across multiple AMCs and subcategories for full 24-page pagination
export function generateAllMutualFunds(): MutualFundScheme[] {
  const amcs = [
    'HDFC Mutual Fund', 'ICICI Prudential Mutual Fund', 'SBI Mutual Fund', 'Nippon India Mutual Fund',
    'Kotak Mahindra Mutual Fund', 'Parag Parikh Mutual Fund', 'Quant Mutual Fund', 'Tata Mutual Fund',
    'Mirae Asset Mutual Fund', 'Axis Mutual Fund', 'UTI Mutual Fund', 'DSP Mutual Fund',
    'Bandhan Mutual Fund', 'Motilal Oswal Mutual Fund', 'WhiteOak Capital Mutual Fund', 'Canara Robeco Mutual Fund',
    'Sundaram Mutual Fund', 'Edelweiss Mutual Fund', 'Invesco Mutual Fund', 'Franklin Templeton Mutual Fund',
    'HSBC Mutual Fund', 'Aditya Birla Sun Life Mutual Fund', 'Baroda BNP Paribas Mutual Fund', 'Mahindra Manulife Mutual Fund'
  ];

  const equitySubCategories = [
    'Large Cap Fund', 'Mid Cap Fund', 'Small Cap Fund', 'Flexi Cap Fund', 'Large & Mid Cap Fund',
    'ELSS (Tax Saving)', 'Multi Cap Fund', 'Value Fund', 'Focused Fund', 'Sectoral / Thematic', 'Contra Fund'
  ];

  const debtSubCategories = [
    'Liquid Fund', 'Overnight Fund', 'Money Market Fund', 'Ultra Short Duration', 'Short Duration Fund',
    'Corporate Bond Fund', 'Banking and PSU Fund', 'Dynamic Bond Fund', 'Gilt Fund', 'Floater Fund'
  ];

  const hybridSubCategories = [
    'Aggressive Hybrid Fund', 'Dynamic Asset Allocation / Balanced Advantage', 'Conservative Hybrid Fund',
    'Multi Asset Allocation', 'Arbitrage Fund', 'Equity Savings'
  ];

  const goldSilverSubCategories = [
    'Gold ETF & FoF', 'Silver ETF & FoF', 'Precious Metals FoF'
  ];

  const schemes: MutualFundScheme[] = [...BASE_MUTUAL_FUNDS];
  let idCounter = 26;

  // Generate 600 schemes to populate 24 full pages at 25/page
  const targetCount = 600;

  for (let i = BASE_MUTUAL_FUNDS.length; i < targetCount; i++) {
    const amc = amcs[i % amcs.length];
    
    // Pick category distribution (60% Equity, 20% Debt, 15% Hybrid, 5% Gold & Silver)
    let category: 'EQUITY' | 'DEBT' | 'HYBRID' | 'GOLD & SILVER' = 'EQUITY';
    let subCategory = '';
    const mod = i % 100;
    
    if (mod < 60) {
      category = 'EQUITY';
      subCategory = equitySubCategories[i % equitySubCategories.length];
    } else if (mod < 80) {
      category = 'DEBT';
      subCategory = debtSubCategories[i % debtSubCategories.length];
    } else if (mod < 95) {
      category = 'HYBRID';
      subCategory = hybridSubCategories[i % hybridSubCategories.length];
    } else {
      category = 'GOLD & SILVER';
      subCategory = goldSilverSubCategories[i % goldSilverSubCategories.length];
    }

    const shortAmc = amc.replace(' Mutual Fund', '');
    const cleanSub = subCategory.replace(' Fund', '').replace(' (Tax Saving)', '');
    const planType = (i % 3 === 0) ? 'Direct - Growth' : 'Regular - Growth';
    const schemeName = `${shortAmc} ${cleanSub} ${planType}`;

    // Generate realistic returns based on category
    let ret1Y = 0;
    let ret5Y = 0;
    let ret10Y = 0;
    let ret15Y = 0;
    let expRatio = 0.5;
    let aum = 1500 + ((i * 187) % 45000);
    let riskLevel: MutualFundScheme['riskLevel'] = 'Very High';
    let benchmark = 'Nifty 500 TRI';

    if (category === 'EQUITY') {
      const baseMult = (i % 2 === 0 ? 1 : -1) * ((i % 11 === 0) ? 0.3 : 1);
      ret1Y = parseFloat((18.5 + (Math.sin(i) * 16.5)).toFixed(2));
      ret5Y = parseFloat((17.2 + (Math.cos(i * 1.5) * 8.4)).toFixed(2));
      // Occasional negative return for sectoral funds to match screenshot
      ret10Y = (i % 23 === 0) ? parseFloat((-1 * (1.2 + (i % 8) * 0.9)).toFixed(2)) : parseFloat((14.8 + (Math.sin(i * 2) * 5.2)).toFixed(2));
      ret15Y = (i % 27 === 0) ? parseFloat((-1 * (2.5 + (i % 7) * 1.1)).toFixed(2)) : parseFloat((14.1 + (Math.cos(i * 2) * 4.6)).toFixed(2));
      expRatio = parseFloat((0.45 + (i % 80) * 0.015).toFixed(2));
      riskLevel = subCategory.includes('Large') ? 'Very High' : 'Very High';
      benchmark = subCategory.includes('Mid') ? 'NIFTY Midcap 150 TRI' : subCategory.includes('Small') ? 'NIFTY Smallcap 250 TRI' : 'Nifty 500 TRI';
    } else if (category === 'DEBT') {
      ret1Y = parseFloat((6.8 + (Math.sin(i) * 1.6)).toFixed(2));
      ret5Y = parseFloat((6.5 + (Math.cos(i) * 1.2)).toFixed(2));
      ret10Y = parseFloat((7.1 + (Math.sin(i * 0.5) * 1.1)).toFixed(2));
      ret15Y = parseFloat((7.4 + (Math.cos(i * 0.5) * 0.9)).toFixed(2));
      expRatio = parseFloat((0.15 + (i % 40) * 0.01).toFixed(2));
      riskLevel = subCategory.includes('Liquid') ? 'Low' : 'Low to Moderate';
      benchmark = 'CRISIL Composite Bond Fund Index';
    } else if (category === 'HYBRID') {
      ret1Y = parseFloat((14.5 + (Math.sin(i) * 8.2)).toFixed(2));
      ret5Y = parseFloat((13.8 + (Math.cos(i) * 4.6)).toFixed(2));
      ret10Y = parseFloat((12.4 + (Math.sin(i * 0.8) * 3.1)).toFixed(2));
      ret15Y = parseFloat((12.1 + (Math.cos(i * 0.8) * 2.8)).toFixed(2));
      expRatio = parseFloat((0.55 + (i % 60) * 0.012).toFixed(2));
      riskLevel = 'Moderately High';
      benchmark = 'NIFTY 50 Hybrid Composite Debt 50:50 Index';
    } else {
      ret1Y = parseFloat((24.2 + (Math.sin(i) * 11.5)).toFixed(2));
      ret5Y = parseFloat((14.6 + (Math.cos(i) * 4.2)).toFixed(2));
      ret10Y = parseFloat((10.8 + (Math.sin(i * 0.5) * 2.4)).toFixed(2));
      ret15Y = parseFloat((9.2 + (Math.cos(i * 0.5) * 1.8)).toFixed(2));
      expRatio = parseFloat((0.25 + (i % 30) * 0.01).toFixed(2));
      riskLevel = 'High';
      benchmark = subCategory.includes('Silver') ? 'Domestic Price of Physical Silver' : 'Domestic Price of Physical Gold';
    }

    const year = 2005 + (i % 18);
    const day = 1 + (i % 28);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[i % 12];
    const inceptionDate = `${day.toString().padStart(2, '0')}-${month}-${year}`;

    schemes.push({
      id: `sch-${idCounter++}`,
      name: schemeName,
      amc: amc,
      category: category,
      subCategory: subCategory,
      nav: parseFloat((20 + (i * 3.7) % 240).toFixed(2)),
      return1Y: ret1Y,
      return3Y: parseFloat((ret5Y * 0.95 + ret1Y * 0.05).toFixed(2)),
      return5Y: ret5Y,
      return10Y: ret10Y,
      return15Y: ret15Y,
      inceptionDate: inceptionDate,
      inceptionReturn: parseFloat((11.5 + (i % 14) * 0.8).toFixed(2)),
      expenseRatio: expRatio,
      aumCrores: parseFloat(aum.toFixed(2)),
      benchmark: benchmark,
      riskLevel: riskLevel
    });
  }

  return schemes;
}

export const ALL_SCHEMES = generateAllMutualFunds();
