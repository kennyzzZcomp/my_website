import { useState, useEffect } from 'react';

export default function GitHubHeatmap({ username }) {
  const [contributions, setContributions] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 使用 GitHub API 获取贡献数据
    const fetchContributions = async () => {
      try {
        // 注意：这需要 GitHub Personal Access Token 才能获取私有仓库数据
        // 这里使用公开的 API，只能获取公开数据
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const data = await response.json();
        
        if (data.contributions) {
          setContributions(data.contributions);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error);
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-700';
    if (count < 3) return 'bg-green-900';
    if (count < 6) return 'bg-green-700';
    if (count < 9) return 'bg-green-600';
    return 'bg-green-500';
  };

  // 将数据组织成周的格式
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Heatmap */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className={`w-3 h-3 ${getColor(day.count)} rounded-sm hover:ring-2 hover:ring-cyan-400 transition-all cursor-pointer relative`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded shadow-lg z-10 whitespace-nowrap">
          <p className="text-xs text-slate-100 font-semibold">
            {hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}
          </p>
          <p className="text-xs text-slate-400">{hoveredDay.date}</p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
        <span>Less</span>
        <div className="w-3 h-3 bg-slate-700 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-900 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
        <span>More</span>
      </div>
    </div>
  );
}
