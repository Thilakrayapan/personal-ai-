import React, { useState } from 'react';
import { DEFAULT_LEARNING_SESSION } from '../data/mockData';
import { GraduationCap, Sparkles, Send, Lightbulb, ChevronRight, Eye, CheckCircle2, RotateCcw } from 'lucide-react';

interface LearningModeViewProps {
  isStandalone?: boolean;
}

export const LearningModeView: React.FC<LearningModeViewProps> = ({ isStandalone = true }) => {
  const [learningModeEnabled, setLearningModeEnabled] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [userReply, setUserReply] = useState('');
  const [chatMessages, setChatMessages] = useState(DEFAULT_LEARNING_SESSION.userResponses);

  const handleNextStep = () => {
    if (currentStepIndex < DEFAULT_LEARNING_SESSION.steps.length) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      const step = DEFAULT_LEARNING_SESSION.steps[nextIdx - 1];

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Step ${step.stepNumber}: ${step.title}\n${step.guidance}`,
          timestamp: 'Just now'
        }
      ]);
      setActiveHint(null);
    }
  };

  const handleShowHint = () => {
    const step = DEFAULT_LEARNING_SESSION.steps[currentStepIndex - 1];
    if (step && step.hint) {
      setActiveHint(step.hint);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(1);
    setActiveHint(null);
    setShowSolution(false);
    setChatMessages(DEFAULT_LEARNING_SESSION.userResponses);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReply.trim()) return;

    const reply = userReply;
    setUserReply('');

    // Add user response
    setChatMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: reply,
        timestamp: 'Just now'
      }
    ]);

    // Tutor encouraging feedback
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Great thought! You noticed that sorting allows us to eliminate impossible pairs. Ready for the next pointer calculation?`,
          timestamp: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <div className={`space-y-6 ${isStandalone ? 'max-w-4xl mx-auto' : ''}`}>
      {/* 4. Learning Mode Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        {/* Header with Toggle Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Learning Mode</h2>
                <span className="text-[10px] font-semibold text-slate-400">4. Example</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Get <span className="text-emerald-600 font-semibold underline decoration-emerald-300">step-by-step</span> guidance instead of direct answers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 font-semibold"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Toggle Switch */}
            <div
              onClick={() => setLearningModeEnabled(!learningModeEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                learningModeEnabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
              role="switch"
              aria-checked={learningModeEnabled}
              aria-label="Toggle Learning Mode"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  learningModeEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        {learningModeEnabled ? (
          <div className="space-y-4">
            {/* Conversation Flow */}
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 mr-2 mt-1">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-50 text-blue-900 border border-blue-200/60 font-medium'
                        : 'bg-slate-50 text-slate-800 border border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Hint Callout */}
            {activeHint && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">Hint for Step {currentStepIndex}:</span>
                  <p>{activeHint}</p>
                </div>
              </div>
            )}

            {/* Solution Drawer */}
            {showSolution && (
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Complete Solution (Python)
                  </span>
                  <span>Time: O(n) | Space: O(1)</span>
                </div>
                <pre className="font-mono text-emerald-400 text-[11px] overflow-x-auto p-2 bg-slate-950 rounded-lg">
                  {DEFAULT_LEARNING_SESSION.solutionCode}
                </pre>
                <p className="text-slate-300 text-[11px]">
                  {DEFAULT_LEARNING_SESSION.solutionExplanation}
                </p>
              </div>
            )}

            {/* Action Buttons Row matching Mockup: Show Hint, Next Step, Show Solution */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleShowHint}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Show Hint</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={currentStepIndex >= DEFAULT_LEARNING_SESSION.steps.length}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
              </button>
            </div>

            {/* Interactive User Reply Input */}
            <form onSubmit={handleSendMessage} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
                placeholder="Type your answer, observation, or question to the tutor..."
                className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
                aria-label="Send message to tutor"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 space-y-2">
            <p className="font-semibold text-sm">Learning Mode is toggled off</p>
            <p className="text-xs">
              When toggled off, AI models return direct final answers immediately.
            </p>
            <button
              onClick={() => setLearningModeEnabled(true)}
              className="text-xs font-bold text-blue-600 hover:underline pt-2 inline-block"
            >
              Turn Learning Mode back on →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
