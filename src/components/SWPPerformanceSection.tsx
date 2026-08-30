import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  RotateCcw as ResetIcon, 
  Download, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowUpDown, 
  Check, 
  Info,
  Calendar,
  FileSpreadsheet,
  Upload,
  Layers,
  ArrowDownCircle,
  HelpCircle
} from 'lucide-react';
import { MutualFundScheme } from '../data/mutualFundsData';
import { calculateSWPForScheme, SWPSchemeCalculation } from '../utils/swpCalculator';

interface SWPPerformanceSectionProps {
  activeSchemes: MutualFundScheme[];
  handleFileUpload: (file: File) => void;
  uploadedFileName: string;
  isUploading: boolean;
  uploadError: string | null;
  handleClearUploadedData: () => void;
}

const SUB_CATEGORIES_MAP: Record<string, string[]> = {
  'EQUITY': [
    'Large Cap Fund', 'Mid Cap Fund', 'Small Cap Fund', 'Flexi Cap Fund', 
    'Large & Mid Cap Fund', 'ELSS (Tax Saving)', 'Multi Cap Fund', 
    'Value Fund', 'Focused Fund', 'Sectoral / Thematic', 'Contra Fund'
  ],
  'DEBT': [
    'Liquid Fund', 'Overnight Fund', 'Money Market Fund', 'Ultra Short Duration', 
    'Short Duration Fund', 'Corporate Bond Fund', 'Banking and PSU Fund', 
    'Dynamic Bond Fund', 'Gilt Fund', 'Floater Fund'
  ],
  'HYBRID': [
    'Balanced Advantage Fund', 'Aggressive Hybrid Fund', 'Dynamic Asset Allocation / Balanced Advantage', 
    'Conservative Hybrid Fund', 'Multi Asset Allocation', 'Arbitrage Fund', 'Equity Savings'
  ],
  'GOLD & SILVER': [
    'Gold ETF & FoF', 'Silver ETF & FoF', 'Precious Metals FoF'
  ]
};

const ALL_HORIZONS = [
  { key: '3Y', label: '3 Years', years: 3 },
  { key: '5Y', label: '5 Years', years: 5 },
  { key: '10Y', label: '10 Years', years: 10 },
  { key: '15Y', label: '15 Years', years: 15 }
];

export default function SWPPerformanceSection({
  activeSchemes,
  handleFileUpload,
  uploadedFileName,
  isUploading,
  uploadError,
  handleClearUploadedData
}: SWPPerformanceSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter States - Default HYBRID selected as per requirement
  const [schemeType, setSchemeType] = useState<'EQUITY' | 'DEBT' | 'HYBRID' | 'GOLD & SILVER'>('HYBRID');
  const [subType, setSubType] = useState<string>('');
  const [selectedAmc, setSelectedAmc] = useState<string>('');
  const [searchSchemeText, setSearchSchemeText] = useState<string>('');
  const [selectedSchemeDropdown, setSelectedSchemeDropdown] = useState<string>('');

  // Input Configuration
  const [investmentAmount, setInvestmentAmount] = useState<number>(2000000); // ₹ 20,00,000
  const [investmentAmountDisplay, setInvestmentAmountDisplay] = useState<string>('20,00,000');
  const [swpStartType, setSwpStartType] = useState<'next_month' | 'after_years'>('next_month');
  const [afterYearsValue, setAfterYearsValue] = useState<number>(1);
  const [asOnDate, setAsOnDate] = useState<string>('23-08-2026');

  // Withdrawal Options
  const [withdrawalOption, setWithdrawalOption] = useState<'amount' | 'rate'>('amount');
  const [swpAmount, setSwpAmount] = useState<number>(10000); // ₹ 10,000
  const [swpAmountDisplay, setSwpAmountDisplay] = useState<string>('10,000');
  const [swpRate, setSwpRate] = useState<number>(6.0); // 6.0% p.a.

  // Multi-select for Show Years (Default: 3 Selected -> 3Y, 5Y, 10Y)
  const [selectedHorizons, setSelectedHorizons] = useState<string[]>(['3Y', '5Y', '10Y']);
  const [isYearsDropdownOpen, setIsYearsDropdownOpen] = useState<boolean>(false);
  const yearsDropdownRef = useRef<HTMLDivElement>(null);

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (yearsDropdownRef.current && !yearsDropdownRef.current.contains(event.target as Node)) {
        setIsYearsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract distinct AMCs
  const amcList = useMemo(() => {
    const set = new Set<string>();
    activeSchemes.forEach(s => {
      if (s.amc) set.add(s.amc);
    });
    return Array.from(set).sort();
  }, [activeSchemes]);

  // Handler for Investment Amount
  const handleInvestmentAmountChange = (valStr: string) => {
    const rawNum = Number(valStr.replace(/[^0-9]/g, ''));
    setInvestmentAmount(rawNum);
    setInvestmentAmountDisplay(rawNum ? rawNum.toLocaleString('en-IN') : '');
  };

  // Handler for SWP Amount
  const handleSwpAmountChange = (valStr: string) => {
    const rawNum = Number(valStr.replace(/[^0-9]/g, ''));
    setSwpAmount(rawNum);
    setSwpAmountDisplay(rawNum ? rawNum.toLocaleString('en-IN') : '');
  };

  // Handle Reset Filter
  const handleResetFilters = () => {
    setSchemeType('HYBRID');
    setSubType('');
    setSelectedAmc('');
    setSearchSchemeText('');
    setSelectedSchemeDropdown('');
    setInvestmentAmount(2000000);
    setInvestmentAmountDisplay('20,00,000');
    setSwpStartType('next_month');
    setAfterYearsValue(1);
    setAsOnDate('23-08-2026');
    setWithdrawalOption('amount');
    setSwpAmount(10000);
    setSwpAmountDisplay('10,000');
    setSwpRate(6.0);
    setSelectedHorizons(['3Y', '5Y', '10Y']);
    setCurrentPage(1);
  };

  const toggleHorizon = (key: string) => {
    if (selectedHorizons.includes(key)) {
      if (selectedHorizons.length > 1) {
        setSelectedHorizons(selectedHorizons.filter(h => h !== key));
      }
    } else {
      setSelectedHorizons([...selectedHorizons, key]);
    }
  };

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return activeSchemes.filter(scheme => {
      if (schemeType && scheme.category !== schemeType) return false;
      if (subType && scheme.subCategory !== subType) return false;
      if (selectedAmc && scheme.amc !== selectedAmc) return false;
      if (selectedSchemeDropdown && scheme.name !== selectedSchemeDropdown) return false;
      if (searchSchemeText.trim()) {
        const q = searchSchemeText.toLowerCase();
        const matchesName = scheme.name.toLowerCase().includes(q);
        const matchesAmc = scheme.amc.toLowerCase().includes(q);
        if (!matchesName && !matchesAmc) return false;
      }
      return true;
    });
  }, [activeSchemes, schemeType, subType, selectedAmc, selectedSchemeDropdown, searchSchemeText]);

  // Compute SWP metrics for filtered schemes
  const swpCalculatedData = useMemo(() => {
    const horizonNums = ALL_HORIZONS.map(h => h.years);
    return filteredSchemes.map(scheme => {
      return calculateSWPForScheme({
        scheme,
        investmentAmount,
        asOnDateStr: asOnDate,
        swpStartType,
        swpWaitYears: afterYearsValue,
        withdrawalType: withdrawalOption,
        swpAmount,
        swpRate,
        horizonYearsList: horizonNums
      });
    });
  }, [filteredSchemes, investmentAmount, asOnDate, swpStartType, afterYearsValue, withdrawalOption, swpAmount, swpRate]);

  // Sort SWP data
  const sortedSwpData = useMemo(() => {
    const list = [...swpCalculatedData];
    list.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.schemeName.localeCompare(b.schemeName) 
          : b.schemeName.localeCompare(a.schemeName);
      }
      // If sorting by a horizon metric (e.g., '5Y_xirr' or '5Y_currentValue')
      if (sortField.includes('_')) {
        const [hKey, metric] = sortField.split('_');
        const aHor = a.horizons[hKey];
        const bHor = b.horizons[hKey];
        const aVal = aHor && aHor.available ? (aHor as any)[metric] : -Infinity;
        const bVal = bHor && bHor.available ? (bHor as any)[metric] : -Infinity;
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return list;
  }, [swpCalculatedData, sortField, sortDirection]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedSwpData.length / rowsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedSwpData.slice(start, start + rowsPerPage);
  }, [sortedSwpData, currentPage, rowsPerPage]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // CSV Export for SWP Data
  const handleExportCSV = () => {
    const visibleHorizons = ALL_HORIZONS.filter(h => selectedHorizons.includes(h.key));
    const headerRow1 = ['Scheme Name', 'AMC', 'Category', 'Sub Category'];
    visibleHorizons.forEach(h => {
      headerRow1.push(
        `${h.label} - Investment Date`,
        `${h.label} - SWP Start Date`,
        `${h.label} - Total No. of Instalments`,
        `${h.label} - Total Amount Withdrawn (INR)`,
        `${h.label} - Current Value (INR)`,
        `${h.label} - XIRR (%)`
      );
    });

    const rows = sortedSwpData.map(item => {
      const row = [
        `"${item.schemeName}"`,
        `"${item.amc}"`,
        `"${item.category}"`,
        `"${item.subCategory}"`
      ];
      visibleHorizons.forEach(h => {
        const hor = item.horizons[h.key];
        if (hor && hor.available) {
          row.push(
            `"${hor.investmentDate}"`,
            `"${hor.swpStartDate}"`,
            String(hor.totalInstalments),
            String(hor.totalWithdrawn),
            String(hor.currentValue),
            hor.xirr !== null ? `${hor.xirr}%` : '-'
          );
        } else {
          row.push('-', '-', '-', '-', '-', '-');
        }
      });
      return row;
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headerRow1.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SWP_Performance_${schemeType}_${asOnDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const visibleHorizonObjects = useMemo(() => {
    return ALL_HORIZONS.filter(h => selectedHorizons.includes(h.key));
  }, [selectedHorizons]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Dynamic Data Source / Excel Upload Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D68EC] flex items-center justify-center font-bold">
            <FileSpreadsheet size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0B1B3D]">Mutual Fund Data Source (SWP Engine)</h3>
              {uploadedFileName ? (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check size={10} /> Active: {uploadedFileName} ({activeSchemes.length} Schemes)
                </span>
              ) : (
                <span className="bg-blue-100 text-[#1D68EC] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Standard Scheme Master ({activeSchemes.length} Schemes)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload a fresh Excel (.xlsx, .xls) or CSV sheet to dynamically populate scheme data for SWP calculation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            accept=".xlsx, .xls, .csv"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-[#1D68EC] hover:bg-[#1554c2] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Upload size={14} />
            <span>{isUploading ? 'Parsing...' : 'Upload Excel / CSV'}</span>
          </button>

          {uploadedFileName && (
            <button
              onClick={handleClearUploadedData}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
              title="Reset to default scheme dataset"
            >
              <ResetIcon size={13} />
              <span>Reset Data</span>
            </button>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
          <span className="font-bold">Error:</span>
          <span>{uploadError}</span>
        </div>
      )}

      {/* 2. ADVANCED FILTER & CONTROL BAR */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0] space-y-4">
        
        {/* Row 1: Scheme Type Selector Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Scheme Type:
            </span>
            {(['EQUITY', 'DEBT', 'HYBRID', 'GOLD & SILVER'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSchemeType(cat);
                  setSubType('');
                  setSelectedSchemeDropdown('');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  schemeType === cat
                    ? 'bg-[#1D68EC] text-white shadow-sm ring-2 ring-blue-400/20'
                    : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Matching Funds: <span className="font-bold text-[#0B1B3D]">{filteredSchemes.length}</span>
          </div>
        </div>

        {/* Row 2: Sub-Type, AMC, Scheme Search, Scheme Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sub Type */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Scheme Sub Type
            </label>
            <select
              value={subType}
              onChange={(e) => {
                setSubType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
            >
              <option value="">---Select Sub Type---</option>
              {(SUB_CATEGORIES_MAP[schemeType] || []).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* AMC Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              AMC
            </label>
            <select
              value={selectedAmc}
              onChange={(e) => {
                setSelectedAmc(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
            >
              <option value="">---Select AMC---</option>
              {amcList.map((amc) => (
                <option key={amc} value={amc}>{amc}</option>
              ))}
            </select>
          </div>

          {/* Scheme Search Input */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Scheme Name Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search scheme name..."
                value={searchSchemeText}
                onChange={(e) => {
                  setSearchSchemeText(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-9 pr-3.5 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
            </div>
          </div>

          {/* Secondary Scheme Selection Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Select Specific Scheme
            </label>
            <select
              value={selectedSchemeDropdown}
              onChange={(e) => {
                setSelectedSchemeDropdown(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
            >
              <option value="">---Select Scheme---</option>
              {activeSchemes
                .filter(s => s.category === schemeType)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(s => (
                  <option key={s.id || s.name} value={s.name}>{s.name}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Row 3: Input Configuration (Investment Amount, SWP Start, As On Date) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-[#E2E8F0]">
          {/* Investment Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Investment Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
              <input
                type="text"
                value={investmentAmountDisplay}
                onChange={(e) => handleInvestmentAmountChange(e.target.value)}
                placeholder="20,00,000"
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-7 pr-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          {/* SWP Start Radio */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              SWP Start
            </label>
            <div className="flex items-center gap-4 py-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="swpStartType"
                  value="next_month"
                  checked={swpStartType === 'next_month'}
                  onChange={() => setSwpStartType('next_month')}
                  className="text-[#1D68EC] focus:ring-[#1D68EC]"
                />
                <span>Next Month</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="swpStartType"
                  value="after_years"
                  checked={swpStartType === 'after_years'}
                  onChange={() => setSwpStartType('after_years')}
                  className="text-[#1D68EC] focus:ring-[#1D68EC]"
                />
                <span>After Years</span>
              </label>

              {swpStartType === 'after_years' && (
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={afterYearsValue}
                  onChange={(e) => setAfterYearsValue(Math.max(1, Number(e.target.value)))}
                  className="w-14 bg-white border border-[#CBD5E1] rounded-lg px-2 py-0.5 text-xs font-bold text-center text-slate-800"
                />
              )}
            </div>
          </div>

          {/* As On Date */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              As On Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={asOnDate}
                onChange={(e) => setAsOnDate(e.target.value)}
                placeholder="23-08-2026"
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-9 pr-3.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <Calendar className="absolute left-3 top-2 text-slate-400" size={14} />
            </div>
          </div>
        </div>

        {/* Row 4: Withdrawal Options & Submit / Reset Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-[#E2E8F0] items-end">
          {/* Withdrawal Option */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Withdrawal Option
            </label>
            <div className="flex items-center gap-4 py-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="withdrawalOption"
                  value="amount"
                  checked={withdrawalOption === 'amount'}
                  onChange={() => setWithdrawalOption('amount')}
                  className="text-[#1D68EC] focus:ring-[#1D68EC]"
                />
                <span>Amount</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="withdrawalOption"
                  value="rate"
                  checked={withdrawalOption === 'rate'}
                  onChange={() => setWithdrawalOption('rate')}
                  className="text-[#1D68EC] focus:ring-[#1D68EC]"
                />
                <span>Rate (%)</span>
              </label>
            </div>
          </div>

          {/* SWP Amount or Rate */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              {withdrawalOption === 'amount' ? 'SWP Amount (₹ / Month)' : 'SWP Annual Rate (%)'}
            </label>
            {withdrawalOption === 'amount' ? (
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
                <input
                  type="text"
                  value={swpAmountDisplay}
                  onChange={(e) => handleSwpAmountChange(e.target.value)}
                  placeholder="10,000"
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-7 pr-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="30"
                  value={swpRate}
                  onChange={(e) => setSwpRate(Number(e.target.value))}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-3 pr-7 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
              </div>
            )}
          </div>

          {/* Action Buttons: Green SUBMIT and Dark RESET */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage(1)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check size={15} />
              <span>SUBMIT</span>
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 bg-[#0B1B3D] hover:bg-slate-900 text-white py-2 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ResetIcon size={14} />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. SWP PERFORMANCE TABLE & STRUCTURE */}
      <div className="bg-white rounded-2xl shadow-xs border border-[#E2E8F0] overflow-hidden">
        
        {/* Table Title Bar with Show Years and Green Export Button */}
        <div className="p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0B1B3D] flex items-center gap-2">
              <ArrowDownCircle size={19} className="text-[#1D68EC]" />
              <span>SWP Performance As on {asOnDate}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulated systematic withdrawal returns with initial corpus ₹{investmentAmount.toLocaleString('en-IN')} and ₹{swpAmount.toLocaleString('en-IN')}/mo withdrawal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Show Years Multi-Select Dropdown */}
            <div className="relative" ref={yearsDropdownRef}>
              <button
                onClick={() => setIsYearsDropdownOpen(!isYearsDropdownOpen)}
                className="bg-white border border-[#CBD5E1] text-[#0B1B3D] px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Show Years ({selectedHorizons.length} Selected)</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${isYearsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isYearsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#CBD5E1] rounded-xl shadow-lg z-30 p-2 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Horizons
                  </div>
                  {ALL_HORIZONS.map((h) => (
                    <label
                      key={h.key}
                      className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-blue-50 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedHorizons.includes(h.key)}
                        onChange={() => toggleHorizon(h.key)}
                        className="rounded text-[#1D68EC] focus:ring-[#1D68EC]"
                      />
                      <span>{h.label} ({h.key})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Green EXPORT Button */}
            <button
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* SWP Multi-Tier Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              {/* TIER 1 HEADER: Scheme Name + Horizon Group Names */}
              <tr className="bg-[#F8FAFC] border-b border-[#CBD5E1] text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th 
                  rowSpan={2} 
                  className="p-3.5 pl-5 border-r border-[#CBD5E1] sticky left-0 bg-[#F8FAFC] z-10 w-72 min-w-[280px]"
                >
                  <div 
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1.5 cursor-pointer hover:text-[#1D68EC]"
                  >
                    <span>Scheme / Benchmark Name</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>

                {visibleHorizonObjects.map((h) => (
                  <th 
                    key={h.key} 
                    colSpan={6} 
                    className="p-2.5 text-center border-r border-[#CBD5E1] bg-blue-50/70 text-[#173B7A] font-extrabold"
                  >
                    {h.label} ({h.key})
                  </th>
                ))}
              </tr>

              {/* TIER 2 HEADER: Sub-columns for each horizon */}
              <tr className="bg-[#F1F5F9] border-b border-[#CBD5E1] text-[10px] font-bold uppercase tracking-wider text-slate-700 text-right">
                {visibleHorizonObjects.map((h) => (
                  <React.Fragment key={h.key}>
                    <th className="p-2.5 text-center border-r border-[#E2E8F0]">Investment Date</th>
                    <th className="p-2.5 text-center border-r border-[#E2E8F0]">SWP Start Date</th>
                    <th className="p-2.5 text-center border-r border-[#E2E8F0]">Total Instalments</th>
                    <th className="p-2.5 border-r border-[#E2E8F0]">Total Withdrawn (₹)</th>
                    <th 
                      onClick={() => handleSort(`${h.key}_currentValue`)}
                      className="p-2.5 border-r border-[#E2E8F0] cursor-pointer hover:text-[#1D68EC]"
                    >
                      Current Value (₹)
                    </th>
                    <th 
                      onClick={() => handleSort(`${h.key}_xirr`)}
                      className="p-2.5 border-r border-[#CBD5E1] text-emerald-700 cursor-pointer hover:text-emerald-800"
                    >
                      XIRR (%)
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {paginatedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={1 + visibleHorizonObjects.length * 6} 
                    className="p-12 text-center text-slate-500 font-medium"
                  >
                    No mutual fund schemes match the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, idx) => (
                  <tr 
                    key={item.schemeId || idx}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    {/* Scheme Name Column */}
                    <td className="p-3 pl-5 border-r border-[#E2E8F0] sticky left-0 bg-white group-hover:bg-blue-50/40 z-10">
                      <div className="font-bold text-[#0B1B3D] line-clamp-2">
                        {item.schemeName}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-600">
                          {item.subCategory}
                        </span>
                        <span>•</span>
                        <span>Inception: {item.inceptionDate}</span>
                      </div>
                    </td>

                    {/* Horizon Columns */}
                    {visibleHorizonObjects.map((h) => {
                      const hor = item.horizons[h.key];
                      if (!hor || !hor.available) {
                        return (
                          <React.Fragment key={h.key}>
                            <td className="p-2.5 text-center text-slate-400 border-r border-[#E2E8F0]">-</td>
                            <td className="p-2.5 text-center text-slate-400 border-r border-[#E2E8F0]">-</td>
                            <td className="p-2.5 text-center text-slate-400 border-r border-[#E2E8F0]">-</td>
                            <td className="p-2.5 text-right text-slate-400 border-r border-[#E2E8F0]">-</td>
                            <td className="p-2.5 text-right text-slate-400 border-r border-[#E2E8F0] font-medium">-</td>
                            <td className="p-2.5 text-right text-slate-400 border-r border-[#CBD5E1] font-bold">-</td>
                          </React.Fragment>
                        );
                      }

                      return (
                        <React.Fragment key={h.key}>
                          <td className="p-2.5 text-center text-slate-600 border-r border-[#E2E8F0] font-medium text-[11px]">
                            {hor.investmentDate}
                          </td>
                          <td className="p-2.5 text-center text-slate-600 border-r border-[#E2E8F0] font-medium text-[11px]">
                            {hor.swpStartDate}
                          </td>
                          <td className="p-2.5 text-center text-slate-800 border-r border-[#E2E8F0] font-bold">
                            {hor.totalInstalments}
                          </td>
                          <td className="p-2.5 text-right text-slate-700 border-r border-[#E2E8F0] font-semibold">
                            ₹{hor.totalWithdrawn.toLocaleString('en-IN')}
                          </td>
                          <td className="p-2.5 text-right text-[#0B1B3D] border-r border-[#E2E8F0] font-extrabold">
                            ₹{hor.currentValue.toLocaleString('en-IN')}
                          </td>
                          <td className="p-2.5 text-right border-r border-[#CBD5E1] font-bold text-emerald-600">
                            {hor.xirr !== null ? `${hor.xirr.toFixed(2)}%` : '-'}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION */}
        <div className="p-4 sm:p-5 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC]">
          <div className="text-xs text-slate-600 font-medium">
            Showing <span className="font-bold text-[#0B1B3D]">{paginatedData.length}</span> of <span className="font-bold text-[#0B1B3D]">{sortedSwpData.length}</span> schemes (Page {currentPage} of {totalPages})
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span>Show:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <option value={25}>25/page</option>
                <option value={50}>50/page</option>
                <option value={100}>100/page</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                title="First Page"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft size={14} />
              </button>
              
              {getPageNumbers().map((pg, i) => (
                typeof pg === 'number' ? (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pg)}
                    className={`min-w-[28px] h-7 px-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      currentPage === pg
                        ? 'bg-[#1D68EC] text-white shadow-xs'
                        : 'bg-white border border-[#CBD5E1] text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pg}
                  </button>
                ) : (
                  <span key={i} className="px-1 text-slate-400 text-xs font-bold select-none">
                    {pg}
                  </span>
                )
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                title="Last Page"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FOOTER NOTES */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] space-y-2">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-[#1D68EC] shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">
              Note: *) Last instalment is the instalment where SWP amount earlier processed based on sufficient available balance units.
            </p>
            <p>
              Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Past performance may or may not be sustained in the future. The simulated SWP cash flows and XIRR computations are based on historical compounding rates of the underlying regular/growth plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
