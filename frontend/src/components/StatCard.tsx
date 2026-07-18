import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, subtitle, trend, icon }: StatCardProps) => {
  return (
    <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-6 transition-all hover:border-zinc-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
        <div className="p-2 bg-zinc-800/50 rounded-lg text-blue-400">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-zinc-50">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
              {trend}
            </span>
          )}
          <span className="text-xs text-zinc-500">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
