import React, { useState } from 'react';
import { Menu, GraduationCap, ChevronDown, Check, UserCircle, Sliders, LayoutGrid } from 'lucide-react';
import { UserType } from '../types';

interface HeaderProps {
  userName: string;
  userRole: UserType;
  onRoleChange: (role: UserType) => void;
  onOpenMobileMenu?: () => void;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
  viewMode: 'interactive' | 'composite';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  userRole,
  onRoleChange,
  onOpenMobileMenu,
  onOpenProfile,
  onOpenSettings,
  viewMode,
  onToggleViewMode
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const roles: UserType[] = ['Student', 'Professional', 'Developer', 'Researcher', 'Creative'];

  return (
    <header className="bg-transparent px-4 md:px-8 pt-6 pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Welcome Area */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>Hello, {userName}!</span>
              <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform">👋</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Here's your AI usage and insights for this month.
            </p>
          </div>
        </div>

        {/* Right Controls: Role pill & Avatar pill */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Download Standalone Single HTML File */}
          <a
            href="./cm-ai.html"
            download="cm-ai.html"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all shadow-xs"
            title="Download 100% self-contained single HTML file with embedded CSS and JS"
          >
            <span>Single HTML</span>
            <span className="text-[10px] bg-emerald-200/60 px-1.5 py-0.2 rounded font-mono">.html</span>
          </a>

          {/* View mode toggle */}
          <button
            onClick={onToggleViewMode}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              viewMode === 'composite'
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle between single app flow and composite reference layout"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{viewMode === 'composite' ? 'Reference Layout' : 'Full Flow'}</span>
          </button>

          {/* Role selector dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleMenuOpen(!roleMenuOpen);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-700 hover:border-slate-300 shadow-xs transition-colors"
              aria-label="Select user role"
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>{userRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 text-xs">
                <div className="px-3 py-1.5 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Switch Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      userRole === r ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{r}</span>
                    {userRole === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile avatar & dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setRoleMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs transition-colors"
              aria-label="User account menu"
            >
              <div className="w-7 h-7 rounded-full bg-[#0a1128] text-white flex items-center justify-center font-bold text-xs">
                S
              </div>
              <span className="text-xs font-semibold text-slate-800">{userName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-30 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900">{userName}</p>
                  <p className="text-[11px] text-slate-500">Student Plan • ₹500/mo</p>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    if (onOpenProfile) onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <UserCircle className="w-4 h-4 text-slate-400" />
                  <span>Profile & Academic Info</span>
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    if (onOpenSettings) onOpenSettings();
                  }}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <Sliders className="w-4 h-4 text-slate-400" />
                  <span>Budget & Preferences</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
