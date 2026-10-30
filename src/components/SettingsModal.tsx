import React, { useState } from 'react';
import { X, Settings, IndianRupee, Check, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyBudgetINR: number;
  onSaveBudget: (newBudget: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  monthlyBudgetINR,
  onSaveBudget
}) => {
  const [budget, setBudget] = useState(monthlyBudgetINR);
  const [preferFreeTools, setPreferFreeTools] = useState(true);
  const [enableTokenAlerts, setEnableTokenAlerts] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBudget(budget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Budget & Cost Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">
              Monthly AI Budget Cap (INR)
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                min="50"
                step="50"
                className="w-full rounded-xl border border-slate-200 pl-9 p-2.5 font-bold font-mono text-slate-800"
                required
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Default student budget recommended: ₹500
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={preferFreeTools}
                onChange={(e) => setPreferFreeTools(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-slate-700 font-medium">
                Prioritize free models and open tiers (ChatGPT Free, Gemini, Copilot for Students)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableTokenAlerts}
                onChange={(e) => setEnableTokenAlerts(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-slate-700 font-medium">
                Alert me when reaching 80% of budget limit
              </span>
            </label>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Automatic token guard prevents wasteful spend on basic math or utilities.</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
