// app/components/tools.tsx
"use client";

import { useState, useCallback } from "react";
import { 
  Calculator, 
  Home, 
  RefreshCw, 
  Scale, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

// Define types
interface CalculatorInputs {
  [key: string]: number | string;
}

interface ToolData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultInputs: Record<string, number>;
}

interface ToolResults {
  [key: string]: any;
}

// Tool data with proper typing
const toolsData: ToolData[] = [
  {
    id: 'mortgage-payment',
    title: 'Mortgage Payment Calculator',
    description: 'Estimate monthly P&I payments instantly',
    icon: Calculator,
    defaultInputs: {
      price: 400000,
      downPayment: 80000,
      rate: 6.5,
      term: 30,
      taxes: 4400,
      insurance: 1500
    }
  },
  {
    id: 'affordability',
    title: 'Home Affordability Calculator',
    description: 'Discover what price range fits your budget',
    icon: Home,
    defaultInputs: {
      income: 9000,
      debts: 800,
      downPayment: 40000,
      targetDTI: 43,
      rate: 6.5,
      term: 30
    }
  },
  {
    id: 'refinance',
    title: 'Refinance Break-Even',
    description: 'Calculate time to recoup closing costs',
    icon: RefreshCw,
    defaultInputs: {
      balance: 350000,
      currentRate: 7,
      newRate: 6,
      termRemaining: 28,
      refiFees: 4500
    }
  },
  {
    id: 'rent-vs-buy',
    title: 'Rent vs. Buy Calculator',
    description: 'Compare long-term costs & equity growth',
    icon: Scale,
    defaultInputs: {
      price: 400000,
      downPayment: 80000,
      rate: 6.5,
      term: 30,
      taxRate: 1.1,
      insurance: 1500,
      maintenance: 1,
      rent: 2200,
      rentGrowth: 3,
      appreciation: 3,
      years: 7
    }
  },
  {
    id: 'dscr',
    title: 'DSCR Calculator',
    description: 'Analyze cash-flow for investment properties',
    icon: TrendingUp,
    defaultInputs: {
      monthlyRent: 2500,
      operatingExpenses: 300,
      pitia: 2100
    }
  }
];

// Helper to format currency
const formatCurrency = (value: number): string => {
  return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatCurrencyNoCents = (value: number): string => {
  return '$' + Math.round(value).toLocaleString('en-US');
};

export default function Tools() {
  const [results, setResults] = useState<ToolResults>({});
  const [inputs, setInputs] = useState<Record<string, CalculatorInputs>>({});

  // Get default inputs for a tool
  const getDefaultInputs = (toolId: string): Record<string, number> => {
    const tool = toolsData.find(t => t.id === toolId);
    return tool?.defaultInputs || {};
  };

  // Get input value with proper typing
  const getInput = (toolId: string, field: string): number => {
    const toolInputs = inputs[toolId] || {};
    const defaultValue = getDefaultInputs(toolId)[field] || 0;
    const value = toolInputs[field];
    return typeof value === 'number' ? value : defaultValue;
  };

  // Handle input change with proper typing
  const handleInputChange = (toolId: string, field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [toolId]: {
        ...(prev[toolId] || {}),
        [field]: value === '' ? '' : Number(value)
      }
    }));
    // Auto-calculate on change
    setTimeout(() => calculateTool(toolId), 100);
  };

  // ----- Calculator Functions -----
  const calculateMortgage = useCallback((toolId: string) => {
    const price = getInput(toolId, 'price');
    const downPayment = getInput(toolId, 'downPayment');
    const rate = getInput(toolId, 'rate') / 100 / 12;
    const term = getInput(toolId, 'term') * 12;
    const taxes = getInput(toolId, 'taxes') / 12;
    const insurance = getInput(toolId, 'insurance') / 12;
    const loanAmt = price - downPayment;

    let monthlyPI = 0;
    if (rate > 0 && term > 0) {
      monthlyPI = loanAmt * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    }

    const total = monthlyPI + taxes + insurance;
    
    setResults(prev => ({
      ...prev,
      [toolId]: {
        monthlyPayment: total,
        principalInterest: monthlyPI,
        taxesInsurance: taxes + insurance
      }
    }));
  }, [getInput]);

  const calculateAffordability = useCallback((toolId: string) => {
    const income = getInput(toolId, 'income');
    const debts = getInput(toolId, 'debts');
    const downPayment = getInput(toolId, 'downPayment');
    const targetDTI = getInput(toolId, 'targetDTI') / 100;
    const rate = getInput(toolId, 'rate') / 100 / 12;
    const term = getInput(toolId, 'term') * 12;

    const maxTotalPITI = income * targetDTI;
    const maxPITI = maxTotalPITI - debts;

    let loan = 0;
    let step = 1000;
    for (let i = 0; i < 1000; i++) {
      const p = loan * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const taxIns = (loan + downPayment) * 0.015 / 12;
      const total = p + taxIns;
      if (total > maxPITI) {
        loan -= step;
        break;
      }
      loan += step;
    }

    const maxPrice = loan + downPayment;
    
    setResults(prev => ({
      ...prev,
      [toolId]: {
        maxPITIA: maxPITI,
        maxLoanAmount: loan,
        maxHomePrice: maxPrice
      }
    }));
  }, [getInput]);

  const calculateRefinance = useCallback((toolId: string) => {
    const balance = getInput(toolId, 'balance');
    const currentRate = getInput(toolId, 'currentRate') / 100 / 12;
    const newRate = getInput(toolId, 'newRate') / 100 / 12;
    const termMonths = getInput(toolId, 'termRemaining') * 12;
    const fees = getInput(toolId, 'refiFees');

    const monthlyPayment = (rate: number) => {
      if (rate === 0 || termMonths === 0) return 0;
      return balance * (rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
    };

    const currentPmt = monthlyPayment(currentRate);
    const newPmt = monthlyPayment(newRate);
    const savings = currentPmt - newPmt;
    const breakEven = savings > 0 ? Math.ceil(fees / savings) : 0;

    setResults(prev => ({
      ...prev,
      [toolId]: {
        monthlySavings: savings,
        breakEvenMonths: breakEven
      }
    }));
  }, [getInput]);

  const calculateRentVsBuy = useCallback((toolId: string) => {
    const price = getInput(toolId, 'price');
    const downPayment = getInput(toolId, 'downPayment');
    const rate = getInput(toolId, 'rate') / 100 / 12;
    const term = getInput(toolId, 'term') * 12;
    const taxRate = getInput(toolId, 'taxRate') / 100;
    const insurance = getInput(toolId, 'insurance') / 12;
    const maintenance = getInput(toolId, 'maintenance') / 100;
    const rent = getInput(toolId, 'rent');
    const rentGrowth = getInput(toolId, 'rentGrowth') / 100;
    const appreciation = getInput(toolId, 'appreciation') / 100;
    const years = getInput(toolId, 'years');

    const loanAmt = price - downPayment;
    let monthlyPI = 0;
    if (rate > 0 && term > 0) {
      monthlyPI = loanAmt * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    }
    const monthlyTax = (price * taxRate) / 12;
    const monthlyMaint = (price * maintenance) / 12;
    const monthlyCost = monthlyPI + monthlyTax + insurance + monthlyMaint;

    const futurePrice = price * Math.pow(1 + appreciation, years);
    const remainingTerm = term - years * 12;
    let remainingBalance = 0;
    if (rate > 0 && remainingTerm > 0) {
      remainingBalance = loanAmt * (Math.pow(1 + rate, remainingTerm) - 1) / (Math.pow(1 + rate, remainingTerm)) * (1 + rate);
    }
    const equity = futurePrice - remainingBalance - (price - loanAmt);

    setResults(prev => ({
      ...prev,
      [toolId]: {
        monthlyOwnershipCost: monthlyCost,
        equityIncrease: equity
      }
    }));
  }, [getInput]);

  const calculateDSCR = useCallback((toolId: string) => {
    const monthlyRent = getInput(toolId, 'monthlyRent');
    const operatingExpenses = getInput(toolId, 'operatingExpenses');
    const pitia = getInput(toolId, 'pitia');
    const noi = monthlyRent - operatingExpenses;
    const dscr = pitia > 0 ? noi / pitia : 0;

    setResults(prev => ({
      ...prev,
      [toolId]: {
        dscr: dscr
      }
    }));
  }, [getInput]);

  const calculateTool = useCallback((toolId: string) => {
    switch(toolId) {
      case 'mortgage-payment':
        calculateMortgage(toolId);
        break;
      case 'affordability':
        calculateAffordability(toolId);
        break;
      case 'refinance':
        calculateRefinance(toolId);
        break;
      case 'rent-vs-buy':
        calculateRentVsBuy(toolId);
        break;
      case 'dscr':
        calculateDSCR(toolId);
        break;
    }
  }, [calculateMortgage, calculateAffordability, calculateRefinance, calculateRentVsBuy, calculateDSCR]);

  // Render calculator inputs
  const renderInputs = (toolId: string, defaultInputs: Record<string, number>) => {
    const toolInputs = inputs[toolId] || {};
    
    return Object.entries(defaultInputs).map(([key, defaultValue]) => {
      const inputValue = toolInputs[key] ?? defaultValue;
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
      
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleInputChange(toolId, key, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006132] focus:border-transparent bg-gray-50"
            step="any"
          />
        </div>
      );
    });
  };

  // Render results
  const renderResults = (toolId: string, resultKeys: string[]) => {
    const result = results[toolId] || {};
    
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        {resultKeys.map((key) => {
          const value = result[key];
          if (value === undefined || value === null) return null;
          
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
          const isCurrency = ['monthlyPayment', 'principalInterest', 'taxesInsurance', 'maxPITIA', 'maxLoanAmount', 'maxHomePrice', 'monthlySavings', 'monthlyOwnershipCost', 'equityIncrease'].includes(key);
          const isPercent = key === 'dscr';
          
          let displayValue: string = String(value);
          if (isCurrency) displayValue = formatCurrency(value);
          else if (isPercent) displayValue = value.toFixed(2);
          else if (Number.isInteger(value)) displayValue = String(value);
          else displayValue = value.toFixed(2);
          
          return (
            <div key={key} className="mb-3 last:mb-0">
              <div className="text-sm text-gray-600">{label}</div>
              <div className="text-2xl font-bold text-[#006132]">{displayValue}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#006132] to-[#004d26] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            📊 Mortgage Tools
          </h1>
          <p className="text-xl text-green-200">
            Empower your home financing journey with professional-grade calculators.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {toolsData.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition hover:border-[#006132] cursor-pointer"
                onClick={() => {
                  document.getElementById(tool.id)?.scrollIntoView({ behavior: 'smooth' });
                  calculateTool(tool.id);
                }}
              >
                <Icon className="w-10 h-10 text-[#006132] mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                <button className="text-[#006132] font-medium text-sm flex items-center gap-1 hover:gap-2 transition">
                  Launch <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Calculator Sections */}
        {toolsData.map((tool) => {
          const Icon = tool.icon;
          const defaultInputs = tool.defaultInputs || {};
          const result = results[tool.id] || {};
          const resultKeys = Object.keys(result);
          
          return (
            <div
              key={tool.id}
              id={tool.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8 scroll-mt-4"
            >
              <div className="flex items-start gap-3 mb-6">
                <Icon className="w-8 h-8 text-[#006132] mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{tool.title}</h2>
                  <p className="text-gray-600">{tool.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div>
                  {renderInputs(tool.id, defaultInputs)}
                  <button
                    onClick={() => calculateTool(tool.id)}
                    className="w-full bg-[#006132] hover:bg-[#004d26] text-white font-semibold py-3 rounded-lg transition"
                  >
                    Calculate
                  </button>
                </div>

                {/* Results */}
                <div>
                  {resultKeys.length === 0 ? (
                    <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
                      <p>Enter values and click Calculate</p>
                    </div>
                  ) : (
                    renderResults(tool.id, resultKeys)
                  )}
                </div>
              </div>

              {tool.id === 'rent-vs-buy' && (
                <p className="text-xs text-gray-500 mt-4 italic">
                  *Simplified model. Excludes tax deductions and selling costs.
                </p>
              )}
              {tool.id === 'dscr' && (
                <p className="text-xs text-gray-500 mt-4">
                  *Many programs target ≥ 1.00 (some allow lower).
                </p>
              )}
              {tool.id === 'affordability' && (
                <p className="text-xs text-gray-500 mt-4">
                  *Ideal Target DTI = 43% or less. Up to 55% DTI may be possible with strong credit.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}