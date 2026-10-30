/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar, NavItemKey } from './components/Sidebar';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { DonutChart } from './components/DonutChart';
import { RecommendedModelsCard } from './components/RecommendedModelsCard';
import { RecentActivityList } from './components/RecentActivityList';
import { NewTaskView } from './components/NewTaskView';
import { RecommendationResultView } from './components/RecommendationResultView';
import { CostTrackingView } from './components/CostTrackingView';
import { LearningModeView } from './components/LearningModeView';
import { AiNotNeededView } from './components/AiNotNeededView';
import { CompositeMockupView } from './components/CompositeMockupView';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import {
  INITIAL_USER_PROFILE,
  INITIAL_METRICS,
  USAGE_BY_CATEGORY,
  RECENT_ACTIVITIES
} from './data/mockData';
import { analyzeTask } from './utils/aiRouter';
import { TaskCategory, UserType, BudgetPreference, ModelScore, RecentActivityItem } from './types';
import { Sparkles, PlusCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItemKey>('dashboard');
  const [viewMode, setViewMode] = useState<'interactive' | 'composite'>('composite');
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [activities, setActivities] = useState<RecentActivityItem[]>(RECENT_ACTIVITIES);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Analysis result state
  const [currentAnalysis, setCurrentAnalysis] = useState(() =>
    analyzeTask('Help me debug this Python code', 'Student', 'Coding', 'Low (prefer free tools)')
  );

  const handleRoleChange = (newRole: UserType) => {
    setUserProfile((prev) => ({ ...prev, role: newRole }));
    // Re-evaluate current task analysis with new role
    setCurrentAnalysis(
      analyzeTask(
        currentAnalysis.task,
        newRole,
        currentAnalysis.category,
        'Low (prefer free tools)'
      )
    );
  };

  const handleNewTaskSubmit = (
    prompt: string,
    category: TaskCategory,
    userType: UserType,
    budget: BudgetPreference
  ) => {
    const analysis = analyzeTask(prompt, userType, category, budget);
    setCurrentAnalysis(analysis);

    // If in interactive mode, route to recommendations screen
    if (viewMode === 'interactive') {
      setActiveTab('recommendations');
    }
  };

  const handleUseModel = (model: ModelScore) => {
    // Add to recent activity
    const newActivity: RecentActivityItem = {
      id: `act-${Date.now()}`,
      title: currentAnalysis.task,
      model: model.name,
      timeAgo: 'Just now',
      category: currentAnalysis.category,
      status: 'Recommended',
      costINR: model.estimatedCostInINR
    };

    setActivities((prev) => [newActivity, ...prev.slice(0, 5)]);

    // Update metrics
    setMetrics((prev) => ({
      ...prev,
      aiRequests: prev.aiRequests + 1,
      totalCostINR: prev.totalCostINR + Math.round(model.estimatedCostInINR)
    }));
  };

  const handleUpdateBudget = (newBudget: number) => {
    setUserProfile((prev) => ({ ...prev, monthlyBudgetINR: newBudget }));
    setMetrics((prev) => ({ ...prev, budgetINR: newBudget }));
  };

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'interactive' ? 'composite' : 'interactive'));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex flex-col md:flex-row antialiased font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'allScreens') {
            setViewMode('composite');
          } else {
            setViewMode('interactive');
          }
        }}
        isOpenOnMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-12">
        {/* Header Bar */}
        <Header
          userName={userProfile.name}
          userRole={userProfile.role}
          onRoleChange={handleRoleChange}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
        />

        {/* View Mode Banner Info */}
        <div className="px-4 md:px-8 mb-4">
          <div className="flex items-center justify-between text-xs py-2 px-3.5 bg-blue-50/80 border border-blue-200/60 rounded-xl text-blue-900">
            <div className="flex items-center gap-2">
              <span className="font-bold">CM AI Engine:</span>
              <span className="text-blue-700">
                {viewMode === 'composite'
                  ? 'Showing master dashboard + all 5 architectural sub-views (Task Input, Recommendation, Cost Tracking, Learning Mode, AI Not Needed).'
                  : `Active screen: ${activeTab.toUpperCase()}. Use sidebar to navigate or toggle "Reference Layout" anytime.`}
              </span>
            </div>
            <button
              onClick={handleToggleViewMode}
              className="font-bold text-blue-700 hover:text-blue-900 underline shrink-0 cursor-pointer ml-2"
            >
              {viewMode === 'composite' ? 'Switch to Single Tab Flow' : 'View All 5 Screens Together'}
            </button>
          </div>
        </div>

        {/* Always render Top Dashboard Overview first (matching the top of the reference mockup) */}
        <div className="space-y-6">
          {/* 4 Metric Cards */}
          <MetricCards
            aiRequests={metrics.aiRequests}
            aiRequestsTrend={metrics.aiRequestsTrend}
            totalCostINR={metrics.totalCostINR}
            budgetINR={metrics.budgetINR}
            potentialSavingsINR={metrics.potentialSavingsINR}
            mostUsedCategory={metrics.mostUsedCategory}
            mostUsedCount={metrics.mostUsedCount}
            onCardClick={(type) => {
              if (type === 'cost' || type === 'savings') {
                setActiveTab('usageCost');
                setViewMode('interactive');
              } else if (type === 'requests') {
                setActiveTab('newTask');
                setViewMode('interactive');
              }
            }}
          />

          {/* Lower 3 Cards Grid: Usage Donut, Top Models, Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
            <DonutChart
              categories={USAGE_BY_CATEGORY}
              totalRequests={metrics.aiRequests}
              onSelectCategory={(cat) => {
                setActiveTab('newTask');
                setViewMode('interactive');
              }}
            />

            <RecommendedModelsCard
              onSelectModel={(modelId) => {
                setActiveTab('recommendations');
                setViewMode('interactive');
              }}
            />

            <RecentActivityList
              activities={activities}
              onViewAll={() => {
                setActiveTab('usageCost');
                setViewMode('interactive');
              }}
              onActivityClick={(item) => {
                setActiveTab('recommendations');
                setViewMode('interactive');
              }}
            />
          </div>
        </div>

        {/* Conditional View Body based on viewMode and activeTab */}
        <div className="mt-8">
          {viewMode === 'composite' ? (
            /* COMPOSITE VIEW: Displays Screens 1, 2, 3, 4, 5 simultaneously */
            <CompositeMockupView
              analysis={currentAnalysis}
              onUseModel={handleUseModel}
              onSubmitNewTask={handleNewTaskSubmit}
              onSwitchToLearningMode={() => {
                setActiveTab('learningMode');
                setViewMode('interactive');
              }}
            />
          ) : (
            /* INTERACTIVE TAB VIEW: Focused view on the chosen screen */
            <div className="px-4 md:px-8">
              {activeTab === 'dashboard' && (
                <div className="mt-6 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Ready to route a task?</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter any programming question, research prompt, or math equation to find the optimal AI model or free tool.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('newTask')}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Start New Task</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('learningMode')}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Open Learning Mode</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'newTask' && (
                <NewTaskView
                  initialPrompt={currentAnalysis.task}
                  initialCategory={currentAnalysis.category}
                  initialUserType={userProfile.role}
                  onSubmit={handleNewTaskSubmit}
                  isStandalone={true}
                />
              )}

              {activeTab === 'recommendations' &&
                (currentAnalysis.aiRequired ? (
                  <RecommendationResultView
                    analysis={currentAnalysis}
                    onUseModel={handleUseModel}
                    onSwitchToLearningMode={() => setActiveTab('learningMode')}
                    onNewTask={() => setActiveTab('newTask')}
                    isStandalone={true}
                  />
                ) : (
                  <AiNotNeededView
                    initialTask={currentAnalysis.task}
                    initialAnswer={currentAnalysis.directAnswer || '1000'}
                    onBackToNewTask={() => setActiveTab('newTask')}
                    isStandalone={true}
                  />
                ))}

              {activeTab === 'usageCost' && (
                <CostTrackingView
                  totalSpentINR={metrics.totalCostINR}
                  budgetINR={metrics.budgetINR}
                  onUpdateBudget={handleUpdateBudget}
                  isStandalone={true}
                />
              )}

              {activeTab === 'learningMode' && <LearningModeView isStandalone={true} />}

              {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">Student Profile</h2>
                  <p className="text-xs text-slate-500 mb-6">
                    Manage your academic tier, role, and free resource allowances.
                  </p>
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                  >
                    Edit Profile Details
                  </button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <h2 className="text-lg font-bold text-slate-900 mb-2">Cost & Model Settings</h2>
                  <p className="text-xs text-slate-500 mb-6">
                    Configure your monthly budget cap and token safety filters.
                  </p>
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                  >
                    Adjust Budget Cap
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        name={userProfile.name}
        role={userProfile.role}
        email={userProfile.email}
        onSave={(name, role, email) => {
          setUserProfile((prev) => ({ ...prev, name, role, email }));
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        monthlyBudgetINR={metrics.budgetINR}
        onSaveBudget={handleUpdateBudget}
      />
    </div>
  );
}
