import React, { useState } from 'react';
import { SPENDING_BY_MODEL } from '../data/mockData';
import { TrendingUp, Calendar, Download, AlertCircle, Edit2, Check } from 'lucide-react';

interface CostTrackingViewProps {
  totalSpentINR?: number;
  budgetINR?: number;
  onUpdateBudget?: (newBudget: number) => void;
  isStandalone?: boolean;
}

export const CostTrackingView: React.FC<CostTrackingViewProps> = ({
  totalSpentINR = 145,
  budgetINR = 500,
  onUpdateBudget,
  isStandalone = true
}) => {
  const [timeRange, setTimeRange] = useState('This Month');
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState(budgetINR);
  const [currentBudget, setCurrentBudget] = useState(budgetINR);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const spent = totalSpentINR;
  const percentage = Math.min(100, Math.round((spent / currentBudget) * 100));
  const maxModelSpent = Math.max(...SPENDING_BY_MODEL.map((m) => m.spentINR));

  const handleSaveBudget = () => {
    setCurrentBudget(budgetValue);
    setEditingBudget(false);
    if (onUpdateBudget) onUpdateBudget(budgetValue);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Model,Spent(INR),Requests\n' +
      SPENDING_BY_MODEL.map((m) => `${m.model},${m.spentINR},${m.requests}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CM_AI_Cost_Report_${timeRange.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className={`space-y-6 ${isStandalone ? 'max-w-4xl mx-auto' : ''}`}>
      {/* 3. Cost Tracking Dashboard Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Usage & Cost</h2>
              <p className="text-xs text-slate-400">3. Cost Tracking Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Export CSV'}</span>
            </button>

            {/* Date Range Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent focus:outline-hidden cursor-pointer"
                >
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="Year to Date">Year to Date</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Total Spent */}
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500">Total Spent</span>
              <button
                onClick={() => setEditingBudget(!editingBudget)}
                className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit2 className="w-3 h-3" />
                <span>{editingBudget ? 'Cancel' : 'Set Budget'}</span>
              </button>
            </div>

            <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
              ₹{spent}
            </div>

            {editingBudget ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  value={budgetValue}
                  onChange={(e) => setBudgetValue(Number(e.target.value))}
                  className="w-24 px-2 py-1 text-xs border rounded bg-white font-mono"
                  min="50"
                  step="50"
                />
                <button
                  onClick={handleSaveBudget}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Save
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-medium mt-0.5">of ₹{currentBudget} budget</p>
            )}

            <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-semibold text-slate-500">
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="shrink-0 tabular-nums">{percentage}%</span>
            </div>
          </div>

          {/* Total Requests */}
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Total Requests</span>
            <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">42</div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">+8% from last month</p>
            <div className="mt-3 flex items-center text-[11px] font-semibold text-emerald-600">
              <span>Optimal routing active</span>
            </div>
          </div>

          {/* Potential Saving */}
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
            <span className="text-xs font-semibold text-slate-500 block mb-1">Potential Saving</span>
            <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">₹92</div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">(approx.)</p>
            <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>

        {/* Lower Grid: Spending by Model & Usage by Category */}
        <div className={`grid ${isStandalone ? 'grid-cols-1 lg:grid-cols-2 gap-8' : 'grid-cols-1 gap-6'} pt-2`}>
          {/* Spending by Model Horizontal Bars */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-tight">Spending by Model</h3>
            <div className="space-y-3 text-xs">
              {SPENDING_BY_MODEL.map((m) => {
                const widthPercent = Math.max(12, Math.round((m.spentINR / maxModelSpent) * 100));
                return (
                  <div key={m.model} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-600 font-medium">
                      <span className="text-slate-700 font-semibold">{m.model}</span>
                      <span className="font-bold text-slate-900 tabular-nums">₹{m.spentINR}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-lg h-5 p-0.5 flex items-center">
                      <div
                        className="h-full rounded-md flex items-center justify-end px-2 text-[10px] font-bold text-white transition-all duration-500"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: m.color
                        }}
                      >
                        {m.spentINR >= 20 ? `₹${m.spentINR}` : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Usage by Category Mini Donut & Legend */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight">Usage by Category</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Mini SVG Donut */}
              <div className="relative shrink-0">
                <svg width="130" height="130" className="transform -rotate-90">
                  <circle
                    cx="65"
                    cy="65"
                    r="45"
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="18"
                    strokeDasharray="90 282"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r="45"
                    fill="transparent"
                    stroke="#06b6d4"
                    strokeWidth="18"
                    strokeDasharray="59 282"
                    strokeDashoffset="-90"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r="45"
                    fill="transparent"
                    stroke="#f97316"
                    strokeWidth="18"
                    strokeDasharray="48 282"
                    strokeDashoffset="-149"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r="45"
                    fill="transparent"
                    stroke="#d946ef"
                    strokeWidth="18"
                    strokeDasharray="34 282"
                    strokeDashoffset="-197"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r="45"
                    fill="transparent"
                    stroke="#f43f5e"
                    strokeWidth="18"
                    strokeDasharray="51 282"
                    strokeDashoffset="-231"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-slate-900 tabular-nums">42</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Requests</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-1.5 text-xs w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                    <span className="text-slate-600 font-medium">Coding</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">32%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
                    <span className="text-slate-600 font-medium">Research</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">21%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" />
                    <span className="text-slate-600 font-medium">Writing</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">17%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d946ef]" />
                    <span className="text-slate-600 font-medium">Image Gen</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">12%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
                    <span className="text-slate-600 font-medium">Others</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Insight Banner */}
        <div className="mt-8 p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              By prioritizing free tiers and specialized tools, you saved <strong>₹92</strong> this month.
            </span>
          </div>
          <span className="font-bold text-blue-700 shrink-0">On Track</span>
        </div>
      </div>
    </div>
  );
};
