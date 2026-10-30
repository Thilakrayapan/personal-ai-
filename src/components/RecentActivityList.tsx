import React from 'react';
import { RecentActivityItem } from '../types';
import { ArrowRight, Code, Search, PenTool, Image as ImageIcon } from 'lucide-react';

interface RecentActivityListProps {
  activities: RecentActivityItem[];
  onViewAll?: () => void;
  onActivityClick?: (item: RecentActivityItem) => void;
}

export const RecentActivityList: React.FC<RecentActivityListProps> = ({
  activities,
  onViewAll,
  onActivityClick
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Coding':
        return (
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Code className="w-4 h-4" />
          </div>
        );
      case 'Research':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
        );
      case 'Writing':
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <PenTool className="w-4 h-4" />
          </div>
        );
      case 'Image Generation':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Code className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Activity</h2>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((item) => (
          <div
            key={item.id}
            onClick={() => onActivityClick && onActivityClick(item)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              {getCategoryIcon(item.category)}
              <div>
                <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors truncate max-w-[180px] sm:max-w-xs">
                  {item.title}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {item.model}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs text-slate-400 font-medium mb-1">{item.timeAgo}</p>
              <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
