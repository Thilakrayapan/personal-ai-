import React from 'react';
import {
  Brain,
  LayoutDashboard,
  PlusCircle,
  Lightbulb,
  TrendingUp,
  GraduationCap,
  User,
  Settings,
  X
} from 'lucide-react';

export type NavItemKey =
  | 'dashboard'
  | 'newTask'
  | 'recommendations'
  | 'usageCost'
  | 'learningMode'
  | 'profile'
  | 'settings'
  | 'allScreens';

interface SidebarProps {
  activeTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenOnMobile = false,
  onCloseMobile
}) => {
  const navItems: { key: NavItemKey; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'newTask', label: 'New Task', icon: <PlusCircle className="w-4 h-4" /> },
    { key: 'recommendations', label: 'Recommendations', icon: <Lightbulb className="w-4 h-4" /> },
    { key: 'usageCost', label: 'Usage & Cost', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'learningMode', label: 'Learning Mode', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#0a1128] text-slate-300 w-64 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              CM AI
            </span>
          </div>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                onSelectTab(item.key);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* All Screens Mockup Quick Toggle */}
      <div className="px-4 py-3 border-t border-slate-800/60">
        <button
          onClick={() => {
            onSelectTab('allScreens');
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
            activeTab === 'allScreens'
              ? 'bg-blue-950/70 border-blue-500/60 text-blue-300'
              : 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>Reference View (All 5 Screens)</span>
          <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-300">Composite</span>
        </button>
      </div>

      {/* Footer Tagline */}
      <div className="p-6 border-t border-slate-800/60 text-[11px] leading-relaxed text-slate-400">
        <p className="font-medium text-slate-300">Right AI. Right Task.</p>
        <p className="text-slate-400">Less Cost. More Learning.</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-0 h-screen z-20">
        {content}
      </aside>

      {/* Mobile drawer */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-64 h-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
