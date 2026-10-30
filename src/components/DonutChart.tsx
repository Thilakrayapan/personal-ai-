import React, { useState } from 'react';
import { CategoryShare } from '../types';

interface DonutChartProps {
  categories: CategoryShare[];
  totalRequests: number;
  onSelectCategory?: (category: string) => void;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  categories,
  totalRequests,
  onSelectCategory
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const size = 148;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between">
      <h2 className="text-base font-bold text-slate-900 tracking-tight mb-3">
        Usage by Category
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* SVG Donut */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {categories.map((cat) => {
              const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += cat.percentage;

              const isHovered = hoveredCategory === cat.name;

              return (
                <circle
                  key={cat.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredCategory(cat.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">
              {hoveredCategory
                ? categories.find((c) => c.name === hoveredCategory)?.requests || totalRequests
                : totalRequests}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {hoveredCategory ? hoveredCategory : 'Total Requests'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2 text-xs">
          {categories.map((cat) => {
            const isHovered = hoveredCategory === cat.name;
            return (
              <div
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                  isHovered ? 'bg-slate-50 font-semibold' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-700 font-medium truncate">{cat.name}</span>
                </div>
                <span className="text-slate-900 font-bold tabular-nums ml-2">
                  {cat.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
