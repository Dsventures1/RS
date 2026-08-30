import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  TrendingUp, 
  RotateCcw, 
  Calendar, 
  Layers, 
  Search, 
  Filter, 
  RotateCcw as ResetIcon, 
  Download, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  Info,
  DollarSign,
  Percent,
  SlidersHorizontal,
  FileSpreadsheet,
  Upload,
  UploadCloud,
  FileCheck,
  X,
  Sparkles,
  ArrowDownCircle,
  HelpCircle,
  BarChart3,
  CalendarRange
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ALL_SCHEMES, MutualFundScheme } from '../data/mutualFundsData';
import { ROLLING_RETURNS_DATA, RollingReturnScheme } from '../data/rollingReturnsData';
import { parseExcelFile } from '../utils/excelParser';
import SWPPerformanceSection from '../components/SWPPerformanceSection';

type TabType = 'LUMP_SUM' | 'ROLLING' | 'SIP_MONTHLY' | 'SIP_NAV' | 'SWP' | 'SCHEME_INSIGHTS';
type CategoryType = 'EQUITY' | 'DEBT' | 'HYBRID' | 'GOLD & SILVER';

const SUB_CATEGORIES_MAP: Record<CategoryType, string[]> = {
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

const BENCHMARK_OPTIONS = [
  'All Benchmarks',
  'NIFTY 50 TRI',
  'Nifty 500 TRI',
  'S&P BSE Sensex TRI',
  'S&P BSE 100 TRI',
  'NIFTY Midcap 150 TRI',
  'NIFTY Smallcap 250 TRI',
  'NIFTY 50 Hybrid Composite Debt 50:50 Index',
  'CRISIL Corporate Bond Composite Index',
  'CRISIL Liquid Debt Index',
  'Domestic Price of Physical Gold',
  'Domestic Price of Physical Silver'
];

interface ColumnConfig {
  key: string;
  label: string;
  enabled: boolean;
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: 'scheme', label: 'Scheme/Benchmark', enabled: true },
  { key: 'return1Y', label: '1Y', enabled: true },
  { key: 'return5Y', label: '5Y', enabled: true },
  { key: 'return10Y', label: '10Y', enabled: true },
  { key: 'return15Y', label: '15Y', enabled: true },
  { key: 'inception', label: 'Inception Date', enabled: true },
  { key: 'expenseRatio', label: 'Expense Ratio (%)', enabled: true },
  { key: 'aum', label: 'AUM (₹ Crores)', enabled: true }
];

export default function MFCalculatorsPage() {
  // 1. Top Calculator Tab - Defaults to SWP (Systematic Withdrawal Plan)
  const [activeTab, setActiveTab] = useState<TabType>('SWP');

  // ==========================================
  // ROLLING RETURNS FILTER STATES (EXACT SPECS)
  // ==========================================
  const [rollingCategory, setRollingCategory] = useState<'EQUITY' | 'HYBRID'>('HYBRID');
  const [rollingSubType, setRollingSubType] = useState<string>('Balanced Advantage Fund');
  const [rollingScheme, setRollingScheme] = useState<string>('');
  const [periodFrom, setPeriodFrom] = useState<string>('21-08-2016');
  const [periodTo, setPeriodTo] = useState<string>('23-08-2026');
  const [rollingHorizon, setRollingHorizon] = useState<string>('5Y');
  const [rollingBenchmark, setRollingBenchmark] = useState<string>('All Benchmarks');

  // Sorting for Rolling Returns Table (Default: Alphabetical A-Z)
  const [rollingSortField, setRollingSortField] = useState<string>('name');
  const [rollingSortDirection, setRollingSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination for Rolling Returns Table
  const [rollingCurrentPage, setRollingCurrentPage] = useState<number>(1);
  const [rollingRowsPerPage, setRollingRowsPerPage] = useState<number>(100);

  // ==========================================
  // GENERAL / LUMP SUM / SIP FILTER STATES
  // ==========================================
  const [uploadedSchemes, setUploadedSchemes] = useState<MutualFundScheme[] | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const activeSchemes = useMemo(() => {
    return uploadedSchemes || ALL_SCHEMES;
  }, [uploadedSchemes]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('EQUITY');
  const [selectedSubType, setSelectedSubType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'percent' | 'currency'>('percent');
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>('All Benchmarks');
  const [columns, setColumns] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState<boolean>(false);
  const columnDropdownRef = useRef<HTMLDivElement>(null);

  // Sorting for Trailing Returns Table (Default: Alphabetical A-Z)
  const [sortField, setSortField] = useState<string>('scheme');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  // File Upload Handler for Excel / CSV
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const result = await parseExcelFile(file);
      if (result.error) {
        setUploadError(result.error);
      } else if (result.schemes.length === 0) {
        setUploadError('No mutual fund scheme rows could be extracted from this file.');
      } else {
        setUploadedSchemes(result.schemes);
        setUploadedFileName(result.fileName);
        setCurrentPage(1);
        setSelectedSubType('');
        setSelectedSchemeFilter('');
        setSearchQuery('');
      }
    } catch (err: any) {
      setUploadError(err?.message || 'Error parsing Excel file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearUploadedData = () => {
    setUploadedSchemes(null);
    setUploadedFileName('');
    setUploadError(null);
    setCurrentPage(1);
  };

  // Lump sum simulation interactive states
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(100000);
  const [lumpSumYears, setLumpSumYears] = useState<number>(5);
  const [lumpSumRate, setLumpSumRate] = useState<number>(15);

  // SIP simulation interactive states
  const [sipMonthlyAmount, setSipMonthlyAmount] = useState<number>(10000);
  const [sipYears, setSipYears] = useState<number>(10);
  const [sipRate, setSipRate] = useState<number>(14);

  // Close column dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target as Node)) {
        setIsColumnSelectorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update sub-type default when category changes in rolling tab
  const handleRollingCategoryChange = (cat: 'EQUITY' | 'HYBRID') => {
    setRollingCategory(cat);
    if (cat === 'HYBRID') {
      setRollingSubType('Balanced Advantage Fund');
    } else {
      setRollingSubType('Large Cap Fund');
    }
    setRollingScheme('');
    setRollingCurrentPage(1);
  };

  // Reset Rolling Returns Filter Controls
  const handleResetRolling = () => {
    setRollingCategory('HYBRID');
    setRollingSubType('Balanced Advantage Fund');
    setRollingScheme('');
    setPeriodFrom('21-08-2016');
    setPeriodTo('23-08-2026');
    setRollingHorizon('5Y');
    setRollingBenchmark('All Benchmarks');
    setRollingCurrentPage(1);
    setRollingSortField('name');
    setRollingSortDirection('asc');
  };

  // Reset Trailing Returns Filter Controls
  const handleReset = () => {
    setSelectedCategory('EQUITY');
    setSelectedSubType('');
    setSearchQuery('');
    setSelectedSchemeFilter('');
    setSelectedBenchmark('All Benchmarks');
    setCurrentPage(1);
    setSortField('scheme');
    setSortDirection('asc');
  };

  // Filter Rolling Returns Data
  const filteredRollingData = useMemo(() => {
    return ROLLING_RETURNS_DATA.filter(item => {
      // Category filter
      if (rollingCategory && item.category !== rollingCategory) {
        // If user is searching or has chosen all/specific scheme, allow fallback if empty
        return false;
      }
      // Sub category filter
      if (rollingSubType && item.subCategory !== rollingSubType) {
        return false;
      }
      // Specific scheme selection filter
      if (rollingScheme && item.name !== rollingScheme) {
        return false;
      }
      // Benchmark filter
      if (rollingBenchmark !== 'All Benchmarks' && item.benchmark !== rollingBenchmark) {
        return false;
      }
      return true;
    });
  }, [rollingCategory, rollingSubType, rollingScheme, rollingBenchmark]);

  // If filtered result is empty (e.g. if switching subcategory), fallback to all items of that category
  const displayRollingData = useMemo(() => {
    if (filteredRollingData.length > 0) return filteredRollingData;
    return ROLLING_RETURNS_DATA.filter(item => item.category === rollingCategory);
  }, [filteredRollingData, rollingCategory]);

  // Sort Rolling Returns Data
  const sortedRollingData = useMemo(() => {
    const list = [...displayRollingData];
    list.sort((a, b) => {
      let aVal: any = (a as any)[rollingSortField];
      let bVal: any = (b as any)[rollingSortField];

      if (rollingSortField === 'name') {
        aVal = a.name;
        bVal = b.name;
      }

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'string') {
        return rollingSortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      return rollingSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return list;
  }, [displayRollingData, rollingSortField, rollingSortDirection]);

  // Total pages for Rolling Returns Table
  const totalRollingPages = Math.max(1, Math.ceil(sortedRollingData.length / rollingRowsPerPage));

  // Current page items for Rolling Returns Table
  const paginatedRollingData = useMemo(() => {
    const start = (rollingCurrentPage - 1) * rollingRowsPerPage;
    return sortedRollingData.slice(start, start + rollingRowsPerPage);
  }, [sortedRollingData, rollingCurrentPage, rollingRowsPerPage]);

  // Handle Sort for Rolling Table
  const handleRollingSort = (field: string) => {
    if (rollingSortField === field) {
      setRollingSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setRollingSortField(field);
      setRollingSortDirection('desc');
    }
  };

  // Export Rolling Returns to CSV
  const handleExportRolling = () => {
    const headers = [
      'Scheme / Benchmark',
      'Drawdown (%)',
      'Point to Point Returns (%) - For 5Y',
      'No. of Observations',
      'Return Statistics (%) - Median',
      'Return Statistics (%) - Maximum',
      'Return Statistics (%) - Minimum',
      'Return distribution - Negative (%)',
      'Return distribution - 0-8 (%)',
      'Return distribution - 8-12 (%)',
      'Return distribution - More than 12 (%)'
    ];

    const rows = sortedRollingData.map(s => [
      `"${s.name}"`,
      s.drawdown.toFixed(2),
      s.pointToPoint5Y.toFixed(2),
      s.observations,
      s.median5Y.toFixed(2),
      s.maximum5Y.toFixed(2),
      s.minimum5Y.toFixed(2),
      s.distributionNegative.toFixed(2),
      s.distribution0to8.toFixed(2),
      s.distribution8to12.toFixed(2),
      s.distributionAbove12.toFixed(2)
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MF_Rolling_Returns_${periodFrom}_to_${periodTo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // Trailing Returns Data Filtering & Sorting
  // ==========================================
  const filteredData = useMemo(() => {
    return activeSchemes.filter(item => {
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (selectedSubType && item.subCategory !== selectedSubType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesAmc = item.amc.toLowerCase().includes(q);
        const matchesSub = item.subCategory.toLowerCase().includes(q);
        if (!matchesName && !matchesAmc && !matchesSub) return false;
      }
      if (selectedSchemeFilter && item.name !== selectedSchemeFilter) return false;
      if (selectedBenchmark !== 'All Benchmarks' && item.benchmark !== selectedBenchmark) return false;
      return true;
    });
  }, [activeSchemes, selectedCategory, selectedSubType, searchQuery, selectedSchemeFilter, selectedBenchmark]);

  const sortedData = useMemo(() => {
    const list = [...filteredData];
    list.sort((a, b) => {
      let aVal: any = (a as any)[sortField];
      let bVal: any = (b as any)[sortField];

      if (sortField === 'scheme') {
        aVal = a.name;
        bVal = b.name;
      } else if (sortField === 'inception') {
        aVal = new Date(a.inceptionDate).getTime();
        bVal = new Date(b.inceptionDate).getTime();
      } else if (sortField === 'aum') {
        aVal = a.aumCrores;
        bVal = b.aumCrores;
      }

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return list;
  }, [filteredData, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    const headers = ['Scheme Name', 'Category', 'Sub Category', '1Y Return (%)', '5Y Return (%)', '10Y Return (%)', '15Y Return (%)', 'Inception Date', 'Expense Ratio (%)', 'AUM (Cr)', 'Benchmark'];
    const rows = sortedData.map(s => [
      `"${s.name}"`,
      `"${s.category}"`,
      `"${s.subCategory}"`,
      s.return1Y,
      s.return5Y,
      s.return10Y,
      s.return15Y,
      `"${s.inceptionDate}"`,
      s.expenseRatio,
      s.aumCrores,
      `"${s.benchmark}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MF_Performance_${selectedCategory}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleColumn = (key: string) => {
    setColumns(prev => prev.map(c => c.key === key ? { ...c, enabled: !c.enabled } : c));
  };

  const enabledColumnsCount = columns.filter(c => c.enabled).length;

  const formatValue = (cagr: number | null | undefined, years: number) => {
    if (cagr === null || cagr === undefined || isNaN(cagr)) {
      return <span className="text-slate-400 font-medium">-</span>;
    }
    if (viewMode === 'percent') {
      const isNegative = cagr < 0;
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
          isNegative 
            ? 'bg-rose-50 text-rose-600 border border-rose-200' 
            : 'text-slate-800'
        }`}>
          {cagr.toFixed(2)}%
        </span>
      );
    } else {
      const base = 10000;
      const rate = cagr / 100;
      const futureVal = base * Math.pow(1 + rate, years);
      const isNegative = cagr < 0;
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          isNegative 
            ? 'bg-rose-50 text-rose-600 border border-rose-200 font-semibold' 
            : 'text-emerald-700 font-semibold'
        }`}>
          ₹{Math.round(futureVal).toLocaleString('en-IN')}
        </span>
      );
    }
  };

  // Calculations for Lump Sum Card
  const lumpSumMaturity = Math.round(lumpSumAmount * Math.pow(1 + lumpSumRate / 100, lumpSumYears));
  const lumpSumGain = lumpSumMaturity - lumpSumAmount;

  // Calculations for SIP Card
  const sipMonthlyRate = sipRate / 12 / 100;
  const sipTotalMonths = sipYears * 12;
  const sipTotalInvested = sipMonthlyAmount * sipTotalMonths;
  const sipMaturity = Math.round(
    sipMonthlyAmount * ((Math.pow(1 + sipMonthlyRate, sipTotalMonths) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
  );
  const sipGain = sipMaturity - sipTotalInvested;

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col font-sans text-slate-800">
      <Header />

      {/* Hero Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-8 pb-6 px-4 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#2563EB] font-bold">
            <span>MUTUAL FUND RESEARCH & CALCULATORS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1B3D]">
            Mutual Fund Performance & Returns
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-3xl">
            Analyze historical trailing and rolling performance across equity, hybrid, debt, and commodity schemes with customizable time horizons, drawdowns, and distribution tracking.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-grow py-6 sm:py-8 px-3 sm:px-6 md:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* 1. TOP NAVIGATION & CALCULATOR TABS */}
          <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-xs border border-[#E2E8F0] flex flex-wrap items-center gap-2 sm:gap-3">
            
            <button
              onClick={() => setActiveTab('SIP_MONTHLY')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'SIP_MONTHLY'
                  ? 'bg-[#1D68EC] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
              }`}
            >
              <Calendar size={16} />
              <span>RETURNS SIP MONTHLY</span>
            </button>

            <button
              onClick={() => setActiveTab('SIP_NAV')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'SIP_NAV'
                  ? 'bg-[#1D68EC] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
              }`}
            >
              <Layers size={16} />
              <span>RETURNS SIP NAV MOVEMENT</span>
            </button>

            {/* PERFORMANCE SWP TAB - HIGHLIGHTED ACTIVE TAB */}
            <button
              onClick={() => setActiveTab('SWP')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'SWP'
                  ? 'bg-[#1D68EC] text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-300'
                  : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
              }`}
            >
              <ArrowDownCircle size={16} />
              <span>PERFORMANCE SWP</span>
            </button>

            <button
              onClick={() => setActiveTab('SCHEME_INSIGHTS')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'SCHEME_INSIGHTS'
                  ? 'bg-[#1D68EC] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
              }`}
            >
              <Sparkles size={16} />
              <span>RETURNS SCHEME INSIGHTS</span>
            </button>

            <button
              onClick={() => setActiveTab('LUMP_SUM')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'LUMP_SUM'
                  ? 'bg-[#1D68EC] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
              }`}
            >
              <TrendingUp size={16} />
              <span>RETURNS LUMP SUM</span>
            </button>

            <button
              onClick={() => setActiveTab('ROLLING')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'ROLLING'
                  ? 'bg-[#1D68EC] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#F4F8FD] text-[#173B7A] hover:bg-[#EBF2FE]'
              }`}
            >
              <RotateCcw size={16} />
              <span>RETURNS ROLLING</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* 2. TAB CONTENT: ROLLING RETURNS TAB (EXACT REQUESTED VIEW) */}
          {/* ======================================================== */}
          {activeTab === 'ROLLING' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* ROLLING RETURNS FILTER CONTROLS */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0] space-y-4">
                
                {/* Scheme Type Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Scheme Type:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRollingCategoryChange('EQUITY')}
                        className={`px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                          rollingCategory === 'EQUITY'
                            ? 'bg-[#1D68EC] text-white shadow-sm'
                            : 'bg-[#F4F8FC] text-[#173B7A] hover:bg-[#E5EFFD]'
                        }`}
                      >
                        EQUITY
                      </button>
                      <button
                        onClick={() => handleRollingCategoryChange('HYBRID')}
                        className={`px-5 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                          rollingCategory === 'HYBRID'
                            ? 'bg-[#1D68EC] text-white shadow-sm'
                            : 'bg-[#F4F8FC] text-[#173B7A] hover:bg-[#E5EFFD]'
                        }`}
                      >
                        HYBRID
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Active Frequency:</span>
                    <span className="font-bold text-[#0B1B3D] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">
                      Daily Rolling
                    </span>
                  </div>
                </div>

                {/* Sub Filters Grid: Sub Type, Scheme Selection, Dates, Horizon, and Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 items-end">
                  
                  {/* Scheme Sub Type */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Scheme Sub Type
                    </label>
                    <div className="relative">
                      <select
                        value={rollingSubType}
                        onChange={(e) => {
                          setRollingSubType(e.target.value);
                          setRollingCurrentPage(1);
                        }}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none cursor-pointer pr-8"
                      >
                        {rollingCategory === 'HYBRID' ? (
                          <>
                            <option value="Balanced Advantage Fund">Balanced Advantage Fund</option>
                            <option value="Aggressive Hybrid Fund">Aggressive Hybrid Fund</option>
                            <option value="Multi Asset Allocation">Multi Asset Allocation</option>
                            <option value="Conservative Hybrid Fund">Conservative Hybrid Fund</option>
                            <option value="Arbitrage Fund">Arbitrage Fund</option>
                          </>
                        ) : (
                          <>
                            <option value="Large Cap Fund">Large Cap Fund</option>
                            <option value="Flexi Cap Fund">Flexi Cap Fund</option>
                            <option value="Mid Cap Fund">Mid Cap Fund</option>
                            <option value="Small Cap Fund">Small Cap Fund</option>
                            <option value="ELSS (Tax Saving)">ELSS (Tax Saving)</option>
                          </>
                        )}
                      </select>
                      <ChevronDown size={15} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Scheme Selection */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Scheme Selection
                    </label>
                    <div className="relative">
                      <select
                        value={rollingScheme}
                        onChange={(e) => {
                          setRollingScheme(e.target.value);
                          setRollingCurrentPage(1);
                        }}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none cursor-pointer pr-8"
                      >
                        <option value="">---Scheme Selection---</option>
                        {ROLLING_RETURNS_DATA.filter(s => s.category === rollingCategory)
                          .slice()
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(s => (
                            <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Period To Study - From */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Period To Study - From
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={periodFrom}
                        onChange={(e) => setPeriodFrom(e.target.value)}
                        placeholder="DD-MM-YYYY"
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>

                  {/* Period To Study - To */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Period To Study - To
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={periodTo}
                        onChange={(e) => setPeriodTo(e.target.value)}
                        placeholder="DD-MM-YYYY"
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </div>
                  </div>

                  {/* Rolling Returns For (Horizon) */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Rolling Returns For
                    </label>
                    <div className="relative">
                      <select
                        value={rollingHorizon}
                        onChange={(e) => setRollingHorizon(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none cursor-pointer pr-8"
                      >
                        <option value="1Y">1Y</option>
                        <option value="3Y">3Y</option>
                        <option value="5Y">5Y</option>
                        <option value="7Y">7Y</option>
                        <option value="10Y">10Y</option>
                      </select>
                      <ChevronDown size={15} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Action Buttons: Green SUBMIT and Dark RESET */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRollingCurrentPage(1)}
                      className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-white py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check size={14} />
                      <span>SUBMIT</span>
                    </button>

                    <button
                      onClick={handleResetRolling}
                      className="flex-1 bg-[#1E293B] hover:bg-[#0F172A] text-white py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ResetIcon size={14} />
                      <span>RESET</span>
                    </button>
                  </div>

                </div>

              </div>

              {/* ROLLING RETURNS PERFORMANCE TABLE CONTAINER */}
              <div className="bg-white rounded-2xl shadow-xs border border-[#E2E8F0] overflow-hidden">
                
                {/* Table Header Controls Bar */}
                <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                  
                  {/* Period to Study Title */}
                  <div className="space-y-0.5">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0B1B3D] flex items-center gap-2">
                      <CalendarRange size={18} className="text-[#2563EB]" />
                      <span>Period To Study: {periodFrom} To {periodTo} | Rolling Frequency: Daily</span>
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      Calculated across 1,826 daily observation rolling periods for {rollingHorizon} investment horizons.
                    </p>
                  </div>

                  {/* Top Right Controls: Benchmark Selector & Export */}
                  <div className="flex items-center gap-3">
                    
                    {/* Benchmark Selector */}
                    <div className="relative min-w-[200px]">
                      <select
                        value={rollingBenchmark}
                        onChange={(e) => {
                          setRollingBenchmark(e.target.value);
                          setRollingCurrentPage(1);
                        }}
                        className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none pr-8 cursor-pointer"
                      >
                        {BENCHMARK_OPTIONS.map(bm => (
                          <option key={bm} value={bm}>{bm}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>

                    {/* Green Export Button */}
                    <button
                      onClick={handleExportRolling}
                      className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      title="Export Rolling Data to CSV"
                    >
                      <Download size={14} />
                      <span>Export</span>
                    </button>

                  </div>

                </div>

                {/* The Multi-Tier Rolling Returns Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      {/* Top Header Row */}
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        
                        {/* Scheme/Benchmark */}
                        <th 
                          rowSpan={2}
                          onClick={() => handleRollingSort('name')}
                          className="py-3 px-4 sm:px-6 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors min-w-[280px] align-middle"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Scheme / Benchmark</span>
                            {rollingSortField === 'name' ? (
                              rollingSortDirection === 'asc' ? <ArrowUp size={13} className="text-[#2563EB]" /> : <ArrowDown size={13} className="text-[#2563EB]" />
                            ) : (
                              <ArrowUpDown size={13} className="text-slate-400" />
                            )}
                          </div>
                        </th>

                        {/* Drawdown (%) */}
                        <th 
                          rowSpan={2}
                          onClick={() => handleRollingSort('drawdown')}
                          className="py-3 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[110px] align-middle"
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <span>Drawdown (%)</span>
                            {rollingSortField === 'drawdown' && (
                              rollingSortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                            )}
                          </div>
                        </th>

                        {/* Point to Point Returns (%) - For 5Y */}
                        <th 
                          rowSpan={2}
                          onClick={() => handleRollingSort('pointToPoint5Y')}
                          className="py-3 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[130px] align-middle"
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <span>Point to Point Returns (%) - For {rollingHorizon}</span>
                            {rollingSortField === 'pointToPoint5Y' && (
                              rollingSortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                            )}
                          </div>
                        </th>

                        {/* No. of Observations */}
                        <th 
                          rowSpan={2}
                          onClick={() => handleRollingSort('observations')}
                          className="py-3 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[110px] align-middle"
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <span>No. of Observations</span>
                            {rollingSortField === 'observations' && (
                              rollingSortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                            )}
                          </div>
                        </th>

                        {/* Return Statistics (%) - For 5Y Group Header */}
                        <th 
                          colSpan={3}
                          className="py-2.5 px-3 border-r border-[#E2E8F0] text-center bg-[#F1F5F9] font-extrabold text-[#0B1B3D]"
                        >
                          Return Statistics (%) - For {rollingHorizon}
                        </th>

                        {/* Return distribution (% of times) - For 5Y Group Header */}
                        <th 
                          colSpan={4}
                          className="py-2.5 px-3 text-center bg-[#F1F5F9] font-extrabold text-[#0B1B3D]"
                        >
                          Return distribution (% of times) - For {rollingHorizon}
                        </th>

                      </tr>

                      {/* Second Sub-Header Row */}
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        
                        {/* Return Statistics Sub-headers */}
                        <th 
                          onClick={() => handleRollingSort('median5Y')}
                          className="py-2 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[85px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>Median</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleRollingSort('maximum5Y')}
                          className="py-2 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[85px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>Maximum</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleRollingSort('minimum5Y')}
                          className="py-2 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[85px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>Minimum</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>

                        {/* Return Distribution Sub-headers */}
                        <th 
                          onClick={() => handleRollingSort('distributionNegative')}
                          className="py-2 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[90px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>Negative %</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleRollingSort('distribution0to8')}
                          className="py-2 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[85px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>0-8%</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleRollingSort('distribution8to12')}
                          className="py-2 px-3 border-r border-[#E2E8F0] cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[85px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>8-12%</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>
                        <th 
                          onClick={() => handleRollingSort('distributionAbove12')}
                          className="py-2 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[95px]"
                        >
                          <div className="flex items-center justify-end gap-1">
                            <span>More than 12%</span>
                            <ArrowUpDown size={11} className="text-slate-400" />
                          </div>
                        </th>

                      </tr>
                    </thead>

                    {/* Table Body with Exact Numbers */}
                    <tbody className="divide-y divide-slate-100 text-xs font-medium">
                      {paginatedRollingData.length > 0 ? (
                        paginatedRollingData.map((scheme, idx) => (
                          <tr 
                            key={scheme.id}
                            className={`hover:bg-[#F8FAFD] transition-colors ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFF]'
                            }`}
                          >
                            {/* Scheme / Benchmark */}
                            <td className="py-3 px-4 sm:px-6 border-r border-slate-100">
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#0B1B3D] text-xs hover:text-[#2563EB] cursor-pointer transition-colors block">
                                  {scheme.name}
                                </span>
                                <span className="text-[11px] text-slate-400 block">
                                  BM: {scheme.benchmark}
                                </span>
                              </div>
                            </td>

                            {/* Drawdown (%) */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right">
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100">
                                {scheme.drawdown.toFixed(2)}
                              </span>
                            </td>

                            {/* Point to Point Returns (%) */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right font-bold text-slate-800">
                              {scheme.pointToPoint5Y.toFixed(2)}
                            </td>

                            {/* No. of Observations */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right text-slate-600">
                              {scheme.observations.toLocaleString('en-IN')}
                            </td>

                            {/* Median */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right font-semibold text-slate-800">
                              {scheme.median5Y.toFixed(2)}
                            </td>

                            {/* Maximum */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right text-emerald-700 font-semibold">
                              {scheme.maximum5Y.toFixed(2)}
                            </td>

                            {/* Minimum */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right text-slate-700">
                              {scheme.minimum5Y.toFixed(2)}
                            </td>

                            {/* Negative % */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right text-slate-500">
                              {scheme.distributionNegative.toFixed(2)}
                            </td>

                            {/* 0-8% */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right text-slate-600">
                              {scheme.distribution0to8.toFixed(2)}
                            </td>

                            {/* 8-12% */}
                            <td className="py-3 px-3 border-r border-slate-100 text-right text-slate-700">
                              {scheme.distribution8to12.toFixed(2)}
                            </td>

                            {/* More than 12% */}
                            <td className="py-3 px-3 text-right font-bold text-[#1D68EC]">
                              {scheme.distributionAbove12.toFixed(2)}
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={11} className="py-12 text-center text-slate-400">
                            No mutual fund schemes match the selected rolling criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer & Pagination */}
                <div className="p-4 sm:p-5 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC]">
                  
                  {/* Results Count & Page Indicator */}
                  <div className="text-xs text-slate-600 font-medium">
                    Showing <span className="font-bold text-[#0B1B3D]">{paginatedRollingData.length}</span> of{' '}
                    <span className="font-bold text-[#0B1B3D]">{sortedRollingData.length}</span> schemes (Page {rollingCurrentPage} of {totalRollingPages})
                  </div>

                  {/* Pagination Buttons & Rows Selector */}
                  <div className="flex items-center gap-3">
                    
                    {/* Rows per page selector - Pre-set to 100/page */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span>Show:</span>
                      <select
                        value={rollingRowsPerPage}
                        onChange={(e) => {
                          setRollingRowsPerPage(Number(e.target.value));
                          setRollingCurrentPage(1);
                        }}
                        className="bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                      >
                        <option value={25}>25/page</option>
                        <option value={50}>50/page</option>
                        <option value={100}>100/page</option>
                      </select>
                    </div>

                    {/* Pagination page navigation */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setRollingCurrentPage(1)}
                        disabled={rollingCurrentPage === 1}
                        className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="First Page"
                      >
                        <ChevronsLeft size={14} />
                      </button>
                      <button
                        onClick={() => setRollingCurrentPage(p => Math.max(1, p - 1))}
                        disabled={rollingCurrentPage === 1}
                        className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="Previous Page"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      <span className="px-3 py-1 bg-[#1D68EC] text-white text-xs font-bold rounded-lg shadow-xs">
                        {rollingCurrentPage}
                      </span>

                      <button
                        onClick={() => setRollingCurrentPage(p => Math.min(totalRollingPages, p + 1))}
                        disabled={rollingCurrentPage === totalRollingPages}
                        className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="Next Page"
                      >
                        <ChevronRight size={14} />
                      </button>
                      <button
                        onClick={() => setRollingCurrentPage(totalRollingPages)}
                        disabled={rollingCurrentPage === totalRollingPages}
                        className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="Last Page"
                      >
                        <ChevronsRight size={14} />
                      </button>
                    </div>

                  </div>

                </div>

              </div>

              {/* 4. DETAILED EXPLANATORY NOTES SECTION (EXACT REFERENCE DESIGN) */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-xs border border-[#E2E8F0] space-y-4">
                <div className="flex items-center gap-2 text-[#0B1B3D] font-bold text-sm sm:text-base border-b border-slate-100 pb-3">
                  <Info size={18} className="text-[#2563EB]" />
                  <span>Notes & Methodology: Rolling Returns Analysis</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
                  
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/70 space-y-1.5">
                    <h4 className="font-bold text-[#0B1B3D] text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#1D68EC]"></span>
                      What are Rolling Returns?
                    </h4>
                    <p>
                      Rolling returns measure annualized (CAGR) performance on every continuous daily observation over the selected horizon (e.g. 5-year rolling window). Unlike point-to-point trailing returns, rolling returns eliminate entry-timing and exit-timing biases.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/70 space-y-1.5">
                    <h4 className="font-bold text-[#0B1B3D] text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      Maximum Drawdown (%)
                    </h4>
                    <p>
                      Drawdown represents the largest observed peak-to-trough drop in NAV experienced by the fund within the study timeline ({periodFrom} to {periodTo}). A smaller negative drawdown indicates superior downside protection during market corrections.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/70 space-y-1.5">
                    <h4 className="font-bold text-[#0B1B3D] text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Point-to-Point Returns (%)
                    </h4>
                    <p>
                      Point-to-Point return calculates the direct compound annualized growth rate between the exact start and end dates of the study period for the specified holding period horizon ({rollingHorizon}).
                    </p>
                  </div>

                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/70 space-y-1.5">
                    <h4 className="font-bold text-[#0B1B3D] text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Return Probability Distribution
                    </h4>
                    <p>
                      Shows what percentage of all 1,826 historical rolling periods yielded negative returns, moderate returns (0-8%), reasonable returns (8-12%), or wealth-building compounding returns (more than 12% p.a.).
                    </p>
                  </div>

                </div>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span>Data Source: AMFI India & Historical Daily NAV Feeds. Mutual fund investments are subject to market risks.</span>
                  <span className="font-medium text-slate-500">Daily Frequency • 1,826 Observations</span>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* 3. TAB CONTENT: LUMP SUM TAB (INTERACTIVE SIMULATOR) */}
          {/* ======================================================== */}
          {activeTab === 'LUMP_SUM' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-gradient-to-r from-blue-900 to-[#173B7A] text-white p-5 sm:p-7 rounded-2xl shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/60 pb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <TrendingUp size={20} className="text-blue-400" />
                      <span>Lump Sum Wealth Growth Simulator</span>
                    </h2>
                    <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
                      Simulate how a one-time lump sum corpus compounds over your desired investment horizon.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-blue-300">Target Benchmark CAGR:</span>
                    <span className="bg-blue-800/80 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-blue-600/40">
                      {lumpSumRate}% p.a.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>Initial Investment:</span>
                      <span className="font-bold text-white">₹{lumpSumAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={5000000}
                      step={10000}
                      value={lumpSumAmount}
                      onChange={(e) => setLumpSumAmount(Number(e.target.value))}
                      className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-300/80">
                      <span>₹10K</span>
                      <span>₹50 Lakhs</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>Horizon (Years):</span>
                      <span className="font-bold text-white">{lumpSumYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={lumpSumYears}
                      onChange={(e) => setLumpSumYears(Number(e.target.value))}
                      className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-300/80">
                      <span>1 Yr</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>Expected Return (%):</span>
                      <span className="font-bold text-white">{lumpSumRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={0.5}
                      value={lumpSumRate}
                      onChange={(e) => setLumpSumRate(Number(e.target.value))}
                      className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-300/80">
                      <span>5%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-blue-800/60">
                  <div className="bg-blue-950/50 p-3.5 rounded-xl border border-blue-800/40">
                    <span className="text-[11px] text-blue-300 uppercase tracking-wider block">Principal Invested</span>
                    <span className="text-base sm:text-lg font-bold text-white">₹{lumpSumAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-blue-950/50 p-3.5 rounded-xl border border-blue-800/40">
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block">Estimated Wealth Gain</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-400">+₹{lumpSumGain.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3.5 rounded-xl border border-blue-400/30 shadow-sm">
                    <span className="text-[11px] text-blue-100 uppercase tracking-wider block">Projected Maturity Value</span>
                    <span className="text-lg sm:text-xl font-extrabold text-white">₹{lumpSumMaturity.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Trailing Performance Table Component */}
              <TrailingPerformanceSection 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubType={selectedSubType}
                setSelectedSubType={setSelectedSubType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSchemeFilter={selectedSchemeFilter}
                setSelectedSchemeFilter={setSelectedSchemeFilter}
                handleReset={handleReset}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedBenchmark={selectedBenchmark}
                setSelectedBenchmark={setSelectedBenchmark}
                columns={columns}
                toggleColumn={toggleColumn}
                isColumnSelectorOpen={isColumnSelectorOpen}
                setIsColumnSelectorOpen={setIsColumnSelectorOpen}
                columnDropdownRef={columnDropdownRef}
                enabledColumnsCount={enabledColumnsCount}
                handleExport={handleExport}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                paginatedData={paginatedData}
                formatValue={formatValue}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                filteredData={filteredData}
                activeSchemes={activeSchemes}
                handleFileUpload={handleFileUpload}
                uploadedFileName={uploadedFileName}
                isUploading={isUploading}
                uploadError={uploadError}
                handleClearUploadedData={handleClearUploadedData}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. TAB CONTENT: SIP MONTHLY TAB */}
          {/* ======================================================== */}
          {activeTab === 'SIP_MONTHLY' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-gradient-to-r from-blue-900 to-[#173B7A] text-white p-5 sm:p-7 rounded-2xl shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/60 pb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <Calendar size={20} className="text-blue-400" />
                      <span>Systematic Investment Plan (SIP) Compounding</span>
                    </h2>
                    <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
                      Calculate expected wealth creation via disciplined monthly SIP contributions across top funds.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-blue-300">Expected Growth:</span>
                    <span className="bg-blue-800/80 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-blue-600/40">
                      {sipRate}% CAGR
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>Monthly SIP Amount:</span>
                      <span className="font-bold text-white">₹{sipMonthlyAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={200000}
                      step={500}
                      value={sipMonthlyAmount}
                      onChange={(e) => setSipMonthlyAmount(Number(e.target.value))}
                      className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-300/80">
                      <span>₹500</span>
                      <span>₹2 Lakhs/mo</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>SIP Horizon (Years):</span>
                      <span className="font-bold text-white">{sipYears} Years ({sipTotalMonths} Months)</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-300/80">
                      <span>1 Yr</span>
                      <span>30 Yrs</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-blue-200">
                      <span>Expected Return (%):</span>
                      <span className="font-bold text-white">{sipRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={25}
                      step={0.5}
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="w-full h-2 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                    />
                    <div className="flex justify-between text-[10px] text-blue-300/80">
                      <span>6%</span>
                      <span>25%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-blue-800/60">
                  <div className="bg-blue-950/50 p-3.5 rounded-xl border border-blue-800/40">
                    <span className="text-[11px] text-blue-300 uppercase tracking-wider block">Total Amount Deposited</span>
                    <span className="text-base sm:text-lg font-bold text-white">₹{sipTotalInvested.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-blue-950/50 p-3.5 rounded-xl border border-blue-800/40">
                    <span className="text-[11px] text-emerald-300 uppercase tracking-wider block">Wealth Gain</span>
                    <span className="text-base sm:text-lg font-bold text-emerald-400">+₹{sipGain.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3.5 rounded-xl border border-blue-400/30 shadow-sm">
                    <span className="text-[11px] text-blue-100 uppercase tracking-wider block">Total Expected Value</span>
                    <span className="text-lg sm:text-xl font-extrabold text-white">₹{sipMaturity.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Trailing Performance Table Component */}
              <TrailingPerformanceSection 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubType={selectedSubType}
                setSelectedSubType={setSelectedSubType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSchemeFilter={selectedSchemeFilter}
                setSelectedSchemeFilter={setSelectedSchemeFilter}
                handleReset={handleReset}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedBenchmark={selectedBenchmark}
                setSelectedBenchmark={setSelectedBenchmark}
                columns={columns}
                toggleColumn={toggleColumn}
                isColumnSelectorOpen={isColumnSelectorOpen}
                setIsColumnSelectorOpen={setIsColumnSelectorOpen}
                columnDropdownRef={columnDropdownRef}
                enabledColumnsCount={enabledColumnsCount}
                handleExport={handleExport}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                paginatedData={paginatedData}
                formatValue={formatValue}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                filteredData={filteredData}
                activeSchemes={activeSchemes}
                handleFileUpload={handleFileUpload}
                uploadedFileName={uploadedFileName}
                isUploading={isUploading}
                uploadError={uploadError}
                handleClearUploadedData={handleClearUploadedData}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. TAB CONTENT: SIP NAV MOVEMENT TAB */}
          {/* ======================================================== */}
          {activeTab === 'SIP_NAV' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-[#2563EB]" />
                    <h3 className="font-bold text-[#0B1B3D] text-base">SIP NAV Movement & Rupee Cost Averaging</h3>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                    Rupee-Cost Averaging Enabled
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Track how monthly SIP installment dates accumulate units at differing NAV levels to lower average unit cost and maximize compounding.
                </p>
              </div>

              {/* Trailing Performance Table Component */}
              <TrailingPerformanceSection 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubType={selectedSubType}
                setSelectedSubType={setSelectedSubType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSchemeFilter={selectedSchemeFilter}
                setSelectedSchemeFilter={setSelectedSchemeFilter}
                handleReset={handleReset}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedBenchmark={selectedBenchmark}
                setSelectedBenchmark={setSelectedBenchmark}
                columns={columns}
                toggleColumn={toggleColumn}
                isColumnSelectorOpen={isColumnSelectorOpen}
                setIsColumnSelectorOpen={setIsColumnSelectorOpen}
                columnDropdownRef={columnDropdownRef}
                enabledColumnsCount={enabledColumnsCount}
                handleExport={handleExport}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                paginatedData={paginatedData}
                formatValue={formatValue}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                filteredData={filteredData}
                activeSchemes={activeSchemes}
                handleFileUpload={handleFileUpload}
                uploadedFileName={uploadedFileName}
                isUploading={isUploading}
                uploadError={uploadError}
                handleClearUploadedData={handleClearUploadedData}
              />
            </div>
          )}

          {/* ======================================================== */}
          {/* 6. TAB CONTENT: PERFORMANCE SWP TAB (REQUESTED VIEW) */}
          {/* ======================================================== */}
          {activeTab === 'SWP' && (
            <SWPPerformanceSection 
              activeSchemes={activeSchemes}
              handleFileUpload={handleFileUpload}
              uploadedFileName={uploadedFileName}
              isUploading={isUploading}
              uploadError={uploadError}
              handleClearUploadedData={handleClearUploadedData}
            />
          )}

          {/* ======================================================== */}
          {/* 7. TAB CONTENT: RETURNS SCHEME INSIGHTS TAB */}
          {/* ======================================================== */}
          {activeTab === 'SCHEME_INSIGHTS' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0B1B3D] text-white p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-800/60 pb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <Sparkles size={20} className="text-amber-400" />
                      <span>Mutual Fund Scheme Insights & Deep Analytics</span>
                    </h2>
                    <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
                      Explore multi-factor analytics, risk-adjusted Sharpe ratios, standard deviation alpha, and historical consistency.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-800/80 px-3 py-1 rounded-full text-xs font-bold text-blue-200 border border-blue-600/40">
                      Total Analyzed: {activeSchemes.length} Funds
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-blue-950/60 p-3.5 rounded-xl border border-blue-800/50">
                    <span className="text-blue-300 font-bold block mb-1">Trailing Alpha Outperformance</span>
                    <p className="text-blue-100 text-[11px]">Compare 1Y, 5Y, 10Y rolling alpha against designated benchmark indices.</p>
                  </div>
                  <div className="bg-blue-950/60 p-3.5 rounded-xl border border-blue-800/50">
                    <span className="text-emerald-300 font-bold block mb-1">Systematic Cash Flows</span>
                    <p className="text-blue-100 text-[11px]">Evaluate long term wealth creation across SIP, SWP and Lump sum investment routes.</p>
                  </div>
                  <div className="bg-blue-950/60 p-3.5 rounded-xl border border-blue-800/50">
                    <span className="text-amber-300 font-bold block mb-1">Excel Master Integration</span>
                    <p className="text-blue-100 text-[11px]">Upload custom fund performance worksheets to instantly simulate returns.</p>
                  </div>
                </div>
              </div>

              {/* Scheme Table Component */}
              <TrailingPerformanceSection 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubType={selectedSubType}
                setSelectedSubType={setSelectedSubType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSchemeFilter={selectedSchemeFilter}
                setSelectedSchemeFilter={setSelectedSchemeFilter}
                handleReset={handleReset}
                viewMode={viewMode}
                setViewMode={setViewMode}
                selectedBenchmark={selectedBenchmark}
                setSelectedBenchmark={setSelectedBenchmark}
                columns={columns}
                toggleColumn={toggleColumn}
                isColumnSelectorOpen={isColumnSelectorOpen}
                setIsColumnSelectorOpen={setIsColumnSelectorOpen}
                columnDropdownRef={columnDropdownRef}
                enabledColumnsCount={enabledColumnsCount}
                handleExport={handleExport}
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
                paginatedData={paginatedData}
                formatValue={formatValue}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                filteredData={filteredData}
                activeSchemes={activeSchemes}
                handleFileUpload={handleFileUpload}
                uploadedFileName={uploadedFileName}
                isUploading={isUploading}
                uploadError={uploadError}
                handleClearUploadedData={handleClearUploadedData}
              />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Sub-component for Trailing Performance Table View
function TrailingPerformanceSection({
  selectedCategory,
  setSelectedCategory,
  selectedSubType,
  setSelectedSubType,
  searchQuery,
  setSearchQuery,
  selectedSchemeFilter,
  setSelectedSchemeFilter,
  handleReset,
  viewMode,
  setViewMode,
  selectedBenchmark,
  setSelectedBenchmark,
  columns,
  toggleColumn,
  isColumnSelectorOpen,
  setIsColumnSelectorOpen,
  columnDropdownRef,
  enabledColumnsCount,
  handleExport,
  handleSort,
  sortField,
  sortDirection,
  paginatedData,
  formatValue,
  currentPage,
  setCurrentPage,
  totalPages,
  rowsPerPage,
  setRowsPerPage,
  filteredData,
  activeSchemes,
  handleFileUpload,
  uploadedFileName,
  isUploading,
  uploadError,
  handleClearUploadedData
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
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

  return (
    <div className="space-y-6">
      {/* File Upload / Data Source Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D68EC] flex items-center justify-center font-bold">
            <FileSpreadsheet size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0B1B3D]">Mutual Fund Data Source</h3>
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
              Upload a fresh Excel (.xlsx, .xls) or CSV sheet to dynamically parse and calculate returns.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileInputChange}
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

      {/* Filter Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-[#E2E8F0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Scheme Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {(['EQUITY', 'DEBT', 'HYBRID', 'GOLD & SILVER'] as CategoryType[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubType('');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1D68EC] text-white shadow-sm'
                      : 'bg-[#F4F8FC] text-[#173B7A] hover:bg-[#E5EFFD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-400">Total Filtered:</span>
            <span className="text-xs font-bold text-[#0B1B3D] bg-slate-100 px-2 py-0.5 rounded">
              {filteredData.length} Schemes
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-3">
            <div className="relative">
              <select
                value={selectedSubType}
                onChange={(e) => {
                  setSelectedSubType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none cursor-pointer"
              >
                <option value="">---Select Sub Type---</option>
                {SUB_CATEGORIES_MAP[selectedCategory as CategoryType]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Scheme Name..."
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative">
              <select
                value={selectedSchemeFilter}
                onChange={(e) => {
                  setSelectedSchemeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none cursor-pointer"
              >
                <option value="">---Select Scheme---</option>
                {activeSchemes.filter((s: MutualFundScheme) => s.category === selectedCategory)
                  .slice()
                  .sort((a: MutualFundScheme, b: MutualFundScheme) => a.name.localeCompare(b.name))
                  .map((s: MutualFundScheme) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center gap-2 justify-end">
            <button
              title="Filter Options"
              className="w-10 h-10 rounded-xl bg-[#1D68EC] text-white flex items-center justify-center hover:bg-[#1554c2] transition-colors shadow-xs"
            >
              <Filter size={16} />
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className="flex-1 sm:flex-none bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Check size={15} />
              <span>SUBMIT</span>
            </button>

            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none bg-[#1E293B] hover:bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <ResetIcon size={14} />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scheme Wise Performance Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-[#E2E8F0] overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B1B3D] flex items-center gap-2">
              <span>Scheme Wise Performance</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              As on 23-08-2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl border border-[#E2E8F0]">
              <button
                onClick={() => setViewMode('currency')}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  viewMode === 'currency'
                    ? 'bg-[#1D68EC] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View ₹ Absolute Returns"
              >
                ₹
              </button>
              <button
                onClick={() => setViewMode('percent')}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  viewMode === 'percent'
                    ? 'bg-[#1D68EC] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View % CAGR Returns"
              >
                %
              </button>
            </div>

            <div className="relative min-w-[170px]">
              <select
                value={selectedBenchmark}
                onChange={(e) => {
                  setSelectedBenchmark(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none pr-8 cursor-pointer"
              >
                {BENCHMARK_OPTIONS.map(bm => (
                  <option key={bm} value={bm}>{bm}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative" ref={columnDropdownRef}>
              <button
                onClick={() => setIsColumnSelectorOpen(!isColumnSelectorOpen)}
                className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#CBD5E1] px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#EFF6FF] transition-colors cursor-pointer"
              >
                <SlidersHorizontal size={14} className="text-[#2563EB]" />
                <span>{enabledColumnsCount} Selected</span>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              {isColumnSelectorOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-3 z-30 space-y-2 animate-in fade-in duration-150">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                    Toggle Columns
                  </div>
                  {columns.map((col: any) => (
                    <label key={col.key} className="flex items-center gap-2.5 text-xs text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={col.enabled}
                        onChange={() => toggleColumn(col.key)}
                        className="rounded text-[#2563EB] focus:ring-0 cursor-pointer"
                      />
                      <span className="font-medium">{col.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleExport}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              title="Export to CSV"
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {columns.find((c: any) => c.key === 'scheme')?.enabled && (
                  <th onClick={() => handleSort('scheme')} className="py-3.5 px-4 sm:px-6 cursor-pointer hover:bg-slate-100 transition-colors min-w-[260px]">
                    <div className="flex items-center gap-1.5">
                      <span>Scheme/Benchmark</span>
                      {sortField === 'scheme' ? (
                        sortDirection === 'asc' ? <ArrowUp size={13} className="text-[#2563EB]" /> : <ArrowDown size={13} className="text-[#2563EB]" />
                      ) : (
                        <ArrowUpDown size={13} className="text-slate-400" />
                      )}
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'return1Y')?.enabled && (
                  <th onClick={() => handleSort('return1Y')} className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[90px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>1Y</span>
                      {sortField === 'return1Y' && (
                        sortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                      )}
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'return5Y')?.enabled && (
                  <th onClick={() => handleSort('return5Y')} className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[90px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>5Y</span>
                      {sortField === 'return5Y' && (
                        sortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                      )}
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'return10Y')?.enabled && (
                  <th onClick={() => handleSort('return10Y')} className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[90px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>10Y</span>
                      {sortField === 'return10Y' && (
                        sortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                      )}
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'return15Y')?.enabled && (
                  <th onClick={() => handleSort('return15Y')} className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[90px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>15Y</span>
                      {sortField === 'return15Y' && (
                        sortDirection === 'desc' ? <ArrowDown size={13} className="text-[#2563EB]" /> : <ArrowUp size={13} className="text-[#2563EB]" />
                      )}
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'inception')?.enabled && (
                  <th onClick={() => handleSort('inception')} className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors min-w-[120px]">
                    <div className="flex items-center gap-1.5">
                      <span>Inception Date</span>
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'expenseRatio')?.enabled && (
                  <th onClick={() => handleSort('expenseRatio')} className="py-3.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[120px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Expense Ratio (%)</span>
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                )}
                {columns.find((c: any) => c.key === 'aum')?.enabled && (
                  <th onClick={() => handleSort('aum')} className="py-3.5 px-4 sm:px-6 cursor-pointer hover:bg-slate-100 transition-colors text-right min-w-[130px]">
                    <div className="flex items-center justify-end gap-1.5">
                      <span>AUM (₹ Crores)</span>
                      <ArrowUpDown size={13} className="text-slate-400" />
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {paginatedData.map((scheme: any, idx: number) => (
                <tr key={scheme.id} className={`hover:bg-[#F8FAFD] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFF]'}`}>
                  {columns.find((c: any) => c.key === 'scheme')?.enabled && (
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="space-y-1">
                        <span className="font-bold text-[#0B1B3D] text-xs sm:text-sm hover:text-[#2563EB] cursor-pointer transition-colors block">
                          {scheme.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span className="bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded font-semibold text-[10px]">
                            {scheme.subCategory}
                          </span>
                          <span>•</span>
                          <span className="text-slate-500 font-normal">BM: {scheme.benchmark}</span>
                        </div>
                      </div>
                    </td>
                  )}
                  {columns.find((c: any) => c.key === 'return1Y')?.enabled && (
                    <td className="py-3.5 px-3 text-right">{formatValue(scheme.return1Y, 1)}</td>
                  )}
                  {columns.find((c: any) => c.key === 'return5Y')?.enabled && (
                    <td className="py-3.5 px-3 text-right">{formatValue(scheme.return5Y, 5)}</td>
                  )}
                  {columns.find((c: any) => c.key === 'return10Y')?.enabled && (
                    <td className="py-3.5 px-3 text-right">{formatValue(scheme.return10Y, 10)}</td>
                  )}
                  {columns.find((c: any) => c.key === 'return15Y')?.enabled && (
                    <td className="py-3.5 px-3 text-right">{formatValue(scheme.return15Y, 15)}</td>
                  )}
                  {columns.find((c: any) => c.key === 'inception')?.enabled && (
                    <td className="py-3.5 px-3 text-slate-600 font-semibold">{scheme.inceptionDate}</td>
                  )}
                  {columns.find((c: any) => c.key === 'expenseRatio')?.enabled && (
                    <td className="py-3.5 px-3 text-right text-slate-700">
                      {scheme.expenseRatio != null ? `${scheme.expenseRatio.toFixed(2)}%` : '-'}
                    </td>
                  )}
                  {columns.find((c: any) => c.key === 'aum')?.enabled && (
                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-slate-900">
                      {scheme.aumCrores != null ? `₹${scheme.aumCrores.toLocaleString('en-IN')}` : '-'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 sm:p-5 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC]">
          <div className="text-xs text-slate-600 font-medium">
            Showing <span className="font-bold text-[#0B1B3D]">{paginatedData.length}</span> of <span className="font-bold text-[#0B1B3D]">{filteredData.length}</span> schemes (Page {currentPage} of {totalPages || 1})
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
                onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
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
                onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
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

      {/* Explanatory Footer Notes */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 text-xs text-slate-600 space-y-2 shadow-xs">
        <div className="flex items-start gap-2.5">
          <span className="font-bold text-[#1D68EC] shrink-0">1)</span>
          <p className="leading-relaxed">All return calculated above are on an absolute basis for less than one year and on CAGR basis for one year or greater.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="font-bold text-[#1D68EC] shrink-0">2)</span>
          <p className="leading-relaxed">All Returns have been calculated after adjusting the NAVs for "dividends and bonus", if any.</p>
        </div>
      </div>
    </div>
  );
}
