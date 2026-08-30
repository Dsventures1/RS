/**
 * SWP (Systematic Withdrawal Plan) Calculation Utilities
 */

export interface SWPHorizonResult {
  horizon: string; // e.g. '3Y', '5Y', '10Y', '15Y'
  years: number;
  available: boolean;
  investmentDate: string;
  swpStartDate: string;
  totalInstalments: number;
  totalWithdrawn: number;
  currentValue: number;
  xirr: number | null;
}

export interface SWPSchemeCalculation {
  schemeId: string;
  schemeName: string;
  amc: string;
  category: string;
  subCategory: string;
  benchmark: string;
  inceptionDate: string;
  expenseRatio: number;
  aumCrores: number;
  horizons: Record<string, SWPHorizonResult>;
}

export function parseDateString(dateStr: string): Date {
  if (!dateStr) return new Date('2015-01-01');
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  // format: DD-MMM-YYYY (e.g., 23-Aug-2026 or 23-08-2026)
  if (/^\d{1,2}-[A-Za-z]{3}-\d{4}$/.test(dateStr)) {
    const months: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    const [d, mStr, y] = dateStr.split('-');
    const m = months[mStr.toLowerCase()] ?? 0;
    return new Date(Number(y), m, Number(d));
  }
  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date('2015-01-01') : parsed;
}

export function formatDateDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function calculateXIRR(cashFlows: { date: Date; amount: number }[]): number | null {
  if (!cashFlows || cashFlows.length < 2) return null;
  
  // Newton-Raphson method for XIRR
  const minDate = cashFlows[0].date.getTime();
  const yearFractions = cashFlows.map(cf => (cf.date.getTime() - minDate) / (365.25 * 24 * 3600 * 1000));
  
  let rate = 0.12; // Initial guess 12%
  const maxIterations = 100;
  const tolerance = 1e-6;

  for (let i = 0; i < maxIterations; i++) {
    let fValue = 0;
    let fDerivative = 0;

    for (let j = 0; j < cashFlows.length; j++) {
      const amount = cashFlows[j].amount;
      const t = yearFractions[j];
      const denom = Math.pow(1 + rate, t);
      
      if (denom === 0 || isNaN(denom) || !isFinite(denom)) {
        return null;
      }

      fValue += amount / denom;
      if (t !== 0) {
        fDerivative -= (t * amount) / (denom * (1 + rate));
      }
    }

    if (Math.abs(fValue) < tolerance) {
      return rate * 100;
    }

    if (fDerivative === 0 || isNaN(fDerivative)) {
      break;
    }

    const newRate = rate - fValue / fDerivative;
    if (isNaN(newRate) || !isFinite(newRate)) break;
    
    // Bounds limit [-90%, 500%]
    if (newRate < -0.9) rate = -0.9;
    else if (newRate > 5.0) rate = 5.0;
    else rate = newRate;
  }

  return rate * 100;
}

export function calculateSWPForScheme({
  scheme,
  investmentAmount,
  asOnDateStr,
  swpStartType, // 'next_month' | 'after_years'
  swpWaitYears = 1,
  withdrawalType, // 'amount' | 'rate'
  swpAmount,
  swpRate = 6.0,
  horizonYearsList = [3, 5, 10, 15]
}: {
  scheme: any;
  investmentAmount: number;
  asOnDateStr: string;
  swpStartType: 'next_month' | 'after_years';
  swpWaitYears?: number;
  withdrawalType: 'amount' | 'rate';
  swpAmount: number;
  swpRate?: number;
  horizonYearsList?: number[];
}): SWPSchemeCalculation {
  const asOnDate = parseDateString(asOnDateStr);
  const schemeInception = parseDateString(scheme.inceptionDate);

  const horizonMap: Record<string, SWPHorizonResult> = {};

  horizonYearsList.forEach((years) => {
    const horizonKey = `${years}Y`;
    
    // Calculate investment date by subtracting `years` from asOnDate
    const invDate = new Date(asOnDate.getFullYear() - years, asOnDate.getMonth(), asOnDate.getDate());
    
    // Check if scheme was alive at investment date
    const isSchemeAlive = schemeInception.getTime() <= invDate.getTime() + (30 * 24 * 3600 * 1000); // 30 day grace buffer

    // Get annual return rate from scheme data or fallback
    let annualReturn = 12.0;
    if (years === 3) annualReturn = scheme.return3Y ?? scheme.return1Y ?? 13.5;
    else if (years === 5) annualReturn = scheme.return5Y ?? 14.2;
    else if (years === 10) annualReturn = scheme.return10Y ?? 15.1;
    else if (years === 15) annualReturn = scheme.return15Y ?? 13.8;

    if (!isSchemeAlive || annualReturn === null || isNaN(annualReturn)) {
      horizonMap[horizonKey] = {
        horizon: horizonKey,
        years,
        available: false,
        investmentDate: formatDateDDMMYYYY(invDate),
        swpStartDate: '-',
        totalInstalments: 0,
        totalWithdrawn: 0,
        currentValue: 0,
        xirr: null
      };
      return;
    }

    // Determine monthly withdrawal
    const monthlyWithdrawal = withdrawalType === 'amount'
      ? swpAmount
      : (investmentAmount * (swpRate / 100)) / 12;

    // Determine SWP start date
    let swpStartDate: Date;
    let startMonthIndex: number; // 1-indexed

    if (swpStartType === 'next_month') {
      swpStartDate = new Date(invDate.getFullYear(), invDate.getMonth() + 1, invDate.getDate());
      startMonthIndex = 1;
    } else {
      swpStartDate = new Date(invDate.getFullYear() + swpWaitYears, invDate.getMonth(), invDate.getDate());
      startMonthIndex = swpWaitYears * 12 + 1;
    }

    const totalMonths = years * 12;
    const totalInstalments = startMonthIndex <= totalMonths ? totalMonths - startMonthIndex + 1 : 0;
    const totalWithdrawn = totalInstalments * monthlyWithdrawal;

    // Monthly compounding rate: (1 + r)^(1/12) - 1
    const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;

    let balance = investmentAmount;
    const cashFlows: { date: Date; amount: number }[] = [
      { date: invDate, amount: -investmentAmount }
    ];

    for (let m = 1; m <= totalMonths; m++) {
      balance = balance * (1 + monthlyRate);
      
      const cfDate = new Date(invDate.getFullYear(), invDate.getMonth() + m, invDate.getDate());
      if (m >= startMonthIndex) {
        balance -= monthlyWithdrawal;
        cashFlows.push({ date: cfDate, amount: monthlyWithdrawal });
      }
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }

    const finalBalance = Math.max(0, Math.round(balance));
    cashFlows.push({ date: asOnDate, amount: finalBalance });

    const calculatedXirr = calculateXIRR(cashFlows);

    horizonMap[horizonKey] = {
      horizon: horizonKey,
      years,
      available: true,
      investmentDate: formatDateDDMMYYYY(invDate),
      swpStartDate: formatDateDDMMYYYY(swpStartDate),
      totalInstalments,
      totalWithdrawn: Math.round(totalWithdrawn),
      currentValue: finalBalance,
      xirr: calculatedXirr !== null ? Number(calculatedXirr.toFixed(2)) : Number(annualReturn.toFixed(2))
    };
  });

  return {
    schemeId: scheme.id || scheme.name,
    schemeName: scheme.name,
    amc: scheme.amc || 'Mutual Fund AMC',
    category: scheme.category || 'EQUITY',
    subCategory: scheme.subCategory || 'Other',
    benchmark: scheme.benchmark || 'NIFTY 500 TRI',
    inceptionDate: scheme.inceptionDate,
    expenseRatio: scheme.expenseRatio ?? 1.5,
    aumCrores: scheme.aumCrores ?? 1000,
    horizons: horizonMap
  };
}
