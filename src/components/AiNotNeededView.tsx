import React, { useState } from 'react';
import { Leaf, Calculator, CheckCircle2, ArrowDown, Sparkles, RefreshCw } from 'lucide-react';
import { checkAiNotNeeded } from '../utils/aiRouter';

interface AiNotNeededViewProps {
  initialTask?: string;
  initialAnswer?: string;
  onBackToNewTask?: () => void;
  isStandalone?: boolean;
}

export const AiNotNeededView: React.FC<AiNotNeededViewProps> = ({
  initialTask = '25 x 40',
  initialAnswer = '1000',
  onBackToNewTask,
  isStandalone = true
}) => {
  const [testExpression, setTestExpression] = useState(initialTask);
  const [currentAnswer, setCurrentAnswer] = useState(initialAnswer);
  const [toolName, setToolName] = useState('Calculator');
  const [toolDesc, setToolDesc] = useState('Fast • Free • Accurate');

  const handleTestCalc = (expr: string) => {
    setTestExpression(expr);
    const res = checkAiNotNeeded(expr);
    if (res.isNotNeeded && res.directAnswer) {
      setCurrentAnswer(res.directAnswer);
      if (res.toolName) setToolName(res.toolName);
      if (res.toolDesc) setToolDesc(res.toolDesc);
    } else {
      setCurrentAnswer('Requires LLM reasoning');
    }
  };

  const quickExamples = ['25 x 40', '150 + 45', '500 / 25', '100 km to miles', '99 * 3'];

  return (
    <div className={`space-y-6 ${isStandalone ? 'max-w-4xl mx-auto' : ''}`}>
      {/* 5. "AI Not Needed" Example Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800 tracking-tight">5. "AI Not Needed" Example</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            Smart Router Protection
          </span>
        </div>

        {/* Green Notification Card */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-900 tracking-tight">AI Not Required</h3>
            <p className="text-xs text-emerald-700 mt-0.5">
              This is a simple calculation. You can use a calculator instead.
            </p>
          </div>
        </div>

        {/* Task & Answer Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Task Box */}
          <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/70">
            <span className="text-xs font-medium text-slate-400 block mb-2">Task</span>
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 font-mono">
              <ArrowDown className="w-4 h-4 text-slate-400" />
              <span>{testExpression}</span>
            </div>
          </div>

          {/* Answer Box */}
          <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/60">
            <span className="text-xs font-medium text-emerald-600 block mb-2">Answer</span>
            <div className="flex items-center gap-2 text-lg font-black text-slate-900 font-mono">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="tabular-nums">{currentAnswer}</span>
            </div>
          </div>
        </div>

        {/* Recommended Tool & Token Saving Tip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* Recommended Tool */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Recommended Tool
            </h4>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{toolName}</p>
                <p className="text-xs text-slate-500">{toolDesc}</p>
              </div>
            </div>
          </div>

          {/* Green Callout Tip */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900">
            <p className="font-bold mb-1">Using AI for this task is unnecessary.</p>
            <p className="text-emerald-700">
              You can save tokens, time and cost! Zero API latency, zero risk of hallucination.
            </p>
          </div>
        </div>

        {/* Interactive Math Workbench */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 block mb-2">
            Try other instantaneous calculations:
          </span>
          <div className="flex flex-wrap gap-2 mb-3">
            {quickExamples.map((ex) => (
              <button
                key={ex}
                onClick={() => handleTestCalc(ex)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-mono transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={testExpression}
              onChange={(e) => handleTestCalc(e.target.value)}
              placeholder="e.g. 500 * 12 or 100 km to miles"
              className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono text-slate-800"
            />
            {onBackToNewTask && (
              <button
                onClick={onBackToNewTask}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                New Task Form →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
