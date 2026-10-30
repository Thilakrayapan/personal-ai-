import React, { useState } from 'react';
import { TaskCategory, UserType, BudgetPreference } from '../types';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface NewTaskViewProps {
  initialPrompt?: string;
  initialCategory?: TaskCategory;
  initialUserType?: UserType;
  initialBudgetPreference?: BudgetPreference;
  onSubmit: (prompt: string, category: TaskCategory, userType: UserType, budget: BudgetPreference) => void;
  isStandalone?: boolean;
}

export const NewTaskView: React.FC<NewTaskViewProps> = ({
  initialPrompt = 'Help me debug this Python code',
  initialCategory = 'Coding',
  initialUserType = 'Student',
  initialBudgetPreference = 'Low (prefer free tools)',
  onSubmit,
  isStandalone = true
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [taskType, setTaskType] = useState<TaskCategory>(initialCategory);
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [budgetPreference, setBudgetPreference] = useState<BudgetPreference>(initialBudgetPreference);

  const maxChars = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt, taskType, userType, budgetPreference);
  };

  const samplePrompts = [
    { label: 'Debug Python code', text: 'Help me debug this Python code', cat: 'Coding' as TaskCategory },
    { label: 'Simple Calculation (25 × 40)', text: '25 x 40', cat: 'Math/Calculation' as TaskCategory },
    { label: 'DSA Two-Sum (Learning Mode)', text: 'Help me solve this DSA problem: Find the sum of two numbers in a sorted array.', cat: 'Coding' as TaskCategory },
    { label: 'Research Renewable Energy', text: 'Research on renewable energy and battery storage advancements', cat: 'Research' as TaskCategory }
  ];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs ${isStandalone ? 'p-6 md:p-8 max-w-2xl mx-auto' : 'p-6'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          What do you want to do?
        </h2>
        <span className="text-xs text-slate-400 font-medium">1. Task Input</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Prompt Input */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, maxChars))}
            placeholder="Type your task, code question, or prompt here..."
            rows={4}
            className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none font-medium leading-relaxed"
            required
          />
          <div className="text-right text-xs text-slate-400 mt-1 tabular-nums font-mono">
            {prompt.length}/{maxChars}
          </div>
        </div>

        {/* Quick presets */}
        <div>
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Try instant examples:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setPrompt(s.text);
                  setTaskType(s.cat);
                }}
                className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional details */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-slate-600">
            <span>Optional details</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Task type */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Task type
              </label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as TaskCategory)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="Coding">Coding</option>
                <option value="Research">Research</option>
                <option value="Writing">Writing</option>
                <option value="Image Generation">Image Generation</option>
                <option value="Math/Calculation">Math / Calculation</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* User type */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                User type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Developer">Developer</option>
                <option value="Researcher">Researcher</option>
                <option value="Creative">Creative</option>
              </select>
            </div>
          </div>

          {/* Budget preference */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Budget preference
            </label>
            <select
              value={budgetPreference}
              onChange={(e) => setBudgetPreference(e.target.value as BudgetPreference)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="Low (prefer free tools)">Low (prefer free tools)</option>
              <option value="Medium">Medium</option>
              <option value="High (best capability)">High (best capability)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[0.99] transition-all shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Get Recommendation</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </form>
    </div>
  );
};
