import React from 'react';
import { TOP_RECOMMENDED_MODELS } from '../data/mockData';
import { Sparkles, Bot, Code, Cpu } from 'lucide-react';

interface RecommendedModelsCardProps {
  onSelectModel?: (modelId: string) => void;
}

export const RecommendedModelsCard: React.FC<RecommendedModelsCardProps> = ({ onSelectModel }) => {
  const getModelIcon = (id: string) => {
    switch (id) {
      case 'chatgpt':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
            <Bot className="w-5 h-5 text-emerald-600" />
          </div>
        );
      case 'gemini':
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
        );
      case 'claude':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
            <Cpu className="w-5 h-5 text-amber-600" />
          </div>
        );
      case 'copilot':
        return (
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
            <Code className="w-5 h-5 text-indigo-600" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
            <Bot className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Top Recommended Models
        </h2>
      </div>

      <div className="space-y-3.5">
        {TOP_RECOMMENDED_MODELS.map((model) => (
          <div
            key={model.id}
            onClick={() => onSelectModel && onSelectModel(model.id)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {getModelIcon(model.id)}
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {model.name}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {model.requests} requests <span className="text-slate-300">·</span> {model.share}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                {model.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
