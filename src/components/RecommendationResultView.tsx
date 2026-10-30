import React, { useState } from 'react';
import { TaskAnalysisResult, ModelScore } from '../types';
import { Bot, Sparkles, Star, Zap, Shield, CheckCircle2, ArrowRight, ExternalLink, Copy, Check, Info } from 'lucide-react';

interface RecommendationResultViewProps {
  analysis: TaskAnalysisResult;
  onUseModel: (model: ModelScore) => void;
  onSwitchToLearningMode?: () => void;
  onNewTask?: () => void;
  isStandalone?: boolean;
}

export const RecommendationResultView: React.FC<RecommendationResultViewProps> = ({
  analysis,
  onUseModel,
  onSwitchToLearningMode,
  onNewTask,
  isStandalone = true
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullComparison, setShowFullComparison] = useState(false);
  const [modelRunning, setModelRunning] = useState<string | null>(null);
  const [modelResponse, setModelResponse] = useState<{ model: string; output: string } | null>(null);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(analysis.task);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateExecution = (model: ModelScore) => {
    setModelRunning(model.name);
    setTimeout(() => {
      setModelRunning(null);
      let outputText = '';
      if (analysis.category === 'Coding') {
        outputText = `[${model.name} Generated Solution]\nHere is the bug analysis for your Python code:\n1. Checked syntax & variable scopes.\n2. Identified edge case on empty array.\n3. Recommendation: Add a defensive guard clause:\n\nif not items:\n    return None\n\nEstimated Execution: 120ms | Cost: ${model.costLabel}`;
      } else if (analysis.category === 'Research') {
        outputText = `[${model.name} Research Synthesis]\nKey findings for "${analysis.task}":\n• 14 peer-reviewed sources analyzed\n• Consensus indicates 28% efficiency gain with modern storage.\n• Primary cited paper: MIT Clean Energy 2025.`;
      } else {
        outputText = `[${model.name} Output]\nStructured response generated tailored to ${analysis.userType} profile with zero hallucination.`;
      }
      setModelResponse({ model: model.name, output: outputText });
      onUseModel(model);
    }, 800);
  };

  return (
    <div className={`space-y-6 ${isStandalone ? 'max-w-3xl mx-auto' : ''}`}>
      {/* 2. Task Analysis Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Info className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Task Analysis</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">2. AI Recommendation Result</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Task:</span>
            <span className="font-semibold text-slate-800 truncate block mt-0.5" title={analysis.task}>
              {analysis.task}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Category:</span>
            <span className="font-semibold text-slate-800 block mt-0.5">{analysis.category}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">User:</span>
            <span className="font-semibold text-slate-800 block mt-0.5">{analysis.userType}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">AI Required:</span>
            <span className="inline-flex items-center font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
              Yes
            </span>
          </div>
        </div>

        {/* Learning mode banner suggestion if task is coding/DSA */}
        {analysis.category === 'Coding' && onSwitchToLearningMode && (
          <div className="mt-4 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Want step-by-step guidance instead of direct answers?</span>
            </div>
            <button
              onClick={onSwitchToLearningMode}
              className="text-blue-700 font-bold hover:underline shrink-0 ml-2"
            >
              Try Learning Mode →
            </button>
          </div>
        )}
      </div>

      {/* Recommended AI Models */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recommended AI Models
          </h2>
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1 rounded-lg border border-slate-200 bg-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Prompt Copied!' : 'Copy Prompt'}</span>
          </button>
        </div>

        {analysis.recommendedModels.slice(0, 2).map((model, idx) => {
          const isTop = idx === 0;
          return (
            <div
              key={model.id}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                isTop
                  ? 'border-blue-400 shadow-md ring-2 ring-blue-500/10'
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  {/* Number Badge */}
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{model.name}</h3>
                      {model.isBestChoice && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {model.badge || 'Best Overall Choice'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{model.description}</p>
                  </div>
                </div>

                {isTop && (
                  <button
                    className="text-red-400 hover:text-red-600 p-1 self-start cursor-pointer"
                    aria-label="Dismiss recommendation"
                    title="Dismiss recommendation"
                  >
                    <span className="text-xs font-bold font-mono">✕</span>
                  </button>
                )}
              </div>

              {/* Quality, Speed, Cost, Privacy Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 p-3 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Quality</span>
                  <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{model.qualityRating}/5</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Speed</span>
                  <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{model.speedRating}/5</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Cost</span>
                  <div className="flex items-center gap-1 font-bold text-emerald-700 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>{model.costLabel}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Privacy</span>
                  <div className="flex items-center gap-1 font-bold text-blue-700 mt-0.5">
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                    <span>{model.privacyRating}/5</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isTop ? (
                <button
                  onClick={() => handleSimulateExecution(model)}
                  disabled={modelRunning !== null}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {modelRunning === model.name ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Running with {model.name}...</span>
                    </>
                  ) : (
                    <>
                      <span>Use This Model</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleSimulateExecution(model)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Select {model.name}</span>
                </button>
              )}
            </div>
          );
        })}

        {/* View All Models & Comparison button */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowFullComparison(!showFullComparison)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>{showFullComparison ? 'Hide Comparison Table' : 'View All Models & Comparison'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Simulated Model Response Output Box */}
        {modelResponse && (
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-lg border border-slate-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400 font-sans font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Ready from {modelResponse.model}
              </span>
              <span>Tokens logged to Usage & Cost</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-200">
              {modelResponse.output}
            </pre>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModelResponse(null)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Dismiss Output
              </button>
            </div>
          </div>
        )}

        {/* Full Comparison Table Drawer */}
        {showFullComparison && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md text-xs overflow-x-auto">
            <h4 className="font-bold text-slate-900 text-sm mb-3">All Models Comparison Matrix</h4>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-medium">
                  <th className="py-2 pr-3">Model</th>
                  <th className="py-2 px-3">Provider</th>
                  <th className="py-2 px-3">Quality</th>
                  <th className="py-2 px-3">Speed</th>
                  <th className="py-2 px-3">Cost / req</th>
                  <th className="py-2 px-3">Privacy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {analysis.recommendedModels.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-2 pr-3 font-semibold text-slate-900">{m.name}</td>
                    <td className="py-2 px-3 text-slate-500">{m.provider}</td>
                    <td className="py-2 px-3 tabular-nums">{m.qualityRating}/5 ⭐</td>
                    <td className="py-2 px-3 tabular-nums">{m.speedRating}/5 ⚡</td>
                    <td className="py-2 px-3 font-semibold text-emerald-700">{m.costLabel}</td>
                    <td className="py-2 px-3 tabular-nums">{m.privacyRating}/5 🛡️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
