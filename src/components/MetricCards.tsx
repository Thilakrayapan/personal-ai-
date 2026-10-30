import React from 'react';
import { Sparkles, IndianRupee, Leaf, Zap, Code2 } from 'lucide-react';

interface MetricCardsProps {
  aiRequests: number;
  aiRequestsTrend: string;
  totalCostINR: number;
  budgetINR: number;
  potentialSavingsINR: number;
  mostUsedCategory: string;
  mostUsedCount: number;
  onCardClick?: (cardType: string) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  aiRequests,
  aiRequestsTrend,
  totalCostINR,
  budgetINR,
  potentialSavingsINR,
  mostUsedCategory,
  mostUsedCount,
  onCardClick
}) => {
  const costPercentage = Math.min(100, Math.round((totalCostINR / budgetINR) * 100));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-8">
      {/* 1. AI Requests */}
      <div
        onClick={() => onCardClick && onCardClick('requests')}
        className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500">AI Requests</span>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            {aiRequests}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">{aiRequestsTrend}</p>
        </div>

        {/* Sparkline curve */}
        <div className="mt-4 pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
            <path
              d="M 0,20 Q 15,18 25,12 T 50,15 T 75,6 T 100,10"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* 2. Total Cost */}
      <div
        onClick={() => onCardClick && onCardClick('cost')}
        className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm">
              <IndianRupee className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Total Cost</span>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums flex items-baseline gap-1">
            <span>₹{totalCostINR}</span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">of ₹{budgetINR} budget</p>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mr-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${costPercentage}%` }}
              />
            </div>
            <span className="shrink-0 tabular-nums">{costPercentage}% used</span>
          </div>
        </div>
      </div>

      {/* 3. Potential Savings */}
      <div
        onClick={() => onCardClick && onCardClick('savings')}
        className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-xs font-semibold text-slate-500">Potential Savings</span>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
            ₹{potentialSavingsINR}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">(approx.)</p>
        </div>

        {/* Savings Green Bar */}
        <div className="mt-4 pt-2">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: '65%' }}
            />
          </div>
        </div>
      </div>

      {/* 4. Most Used */}
      <div
        onClick={() => onCardClick && onCardClick('mostUsed')}
        className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-500" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Most Used</span>
            </div>

            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
          </div>

          <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight truncate">
            {mostUsedCategory}
          </div>
          <p className="text-xs font-medium text-slate-500 mt-0.5">({mostUsedCount} requests)</p>
        </div>

        <div className="mt-4 pt-2 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:underline">
          <span>Explore coding tools</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};
