import React from 'react';
import { NewTaskView } from './NewTaskView';
import { RecommendationResultView } from './RecommendationResultView';
import { CostTrackingView } from './CostTrackingView';
import { LearningModeView } from './LearningModeView';
import { AiNotNeededView } from './AiNotNeededView';
import { TaskAnalysisResult, ModelScore, TaskCategory, UserType, BudgetPreference } from '../types';

interface CompositeMockupViewProps {
  analysis: TaskAnalysisResult;
  onUseModel: (model: ModelScore) => void;
  onSubmitNewTask: (prompt: string, category: TaskCategory, userType: UserType, budget: BudgetPreference) => void;
  onSwitchToLearningMode: () => void;
}

export const CompositeMockupView: React.FC<CompositeMockupViewProps> = ({
  analysis,
  onUseModel,
  onSubmitNewTask,
  onSwitchToLearningMode
}) => {
  return (
    <div className="space-y-10 px-4 md:px-8 pb-16">
      {/* Visual Section Divider */}
      <div className="border-t-2 border-slate-200/80 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Interactive Component Gallery (All 5 Architecture Views)
            </h2>
            <p className="text-xs text-slate-500">
              Direct interactive implementation of the 5 dedicated sub-screens shown in the design specification.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg">
            Complete Flow
          </span>
        </div>
      </div>

      {/* Row 1: Screens 1, 2, 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* 1. Task Input */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Task Input</span>
          </div>
          <NewTaskView
            initialPrompt="Help me debug this Python code"
            initialCategory="Coding"
            initialUserType="Student"
            initialBudgetPreference="Low (prefer free tools)"
            onSubmit={onSubmitNewTask}
            isStandalone={false}
          />
        </div>

        {/* 2. AI Recommendation Result */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
            <span>AI Recommendation Result</span>
          </div>
          <RecommendationResultView
            analysis={analysis}
            onUseModel={onUseModel}
            onSwitchToLearningMode={onSwitchToLearningMode}
            isStandalone={false}
          />
        </div>

        {/* 3. Cost Tracking Dashboard */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">3</span>
            <span>Cost Tracking Dashboard</span>
          </div>
          <CostTrackingView isStandalone={false} />
        </div>
      </div>

      {/* Row 2: Screens 4, 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 4. Learning Mode Example */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">4</span>
            <span>Learning Mode Example</span>
          </div>
          <LearningModeView isStandalone={false} />
        </div>

        {/* 5. "AI Not Needed" Example */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">5</span>
            <span>"AI Not Needed" Example</span>
          </div>
          <AiNotNeededView
            initialTask="25 x 40"
            initialAnswer="1000"
            isStandalone={false}
          />
        </div>
      </div>
    </div>
  );
};
