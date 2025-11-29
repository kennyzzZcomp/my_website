import { useState } from 'react';

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skills = {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Vite', level: 80 },
      { name: 'Electron', level: 75 }
    ],
    backend: [
      { name: 'C/C++', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'RESTful API', level: 85 },
      { name: 'Java', level: 60 }
    ],
    ml: [
      { name: 'PyTorch', level: 85 },
      { name: 'YOLOv8/v11', level: 80 },
      { name: '3D Point Cloud', level: 70 },
      { name: 'Computer Vision', level: 85 },
      { name: 'Data Processing', level: 80 }
    ],
    tools: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Raspberry Pi', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'Linux/GCP', level: 70 },
      { name: 'STM32', level: 70 },
      { name: 'Keil', level: 70 }
    ]
  };

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: '🎨', desc: 'Building modern UIs' },
    { id: 'backend', label: 'Backend', icon: '⚙️', desc: 'Server & APIs' },
    { id: 'ml', label: 'ML/CV', icon: '🤖', desc: 'AI & Computer Vision' },
    { id: 'tools', label: 'Tools', icon: '🛠️', desc: 'Dev Environment' }
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg hover:border-cyan-500 transition-colors">
      <h2 className="text-xl font-bold text-slate-100 mb-2">Technical Skills</h2>
      <p className="text-sm text-slate-400 mb-6">My tech stack and proficiency levels</p>
      
      {/* Category Tabs */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`p-4 rounded-lg text-left transition-all ${
              activeCategory === cat.id
                ? 'bg-cyan-500/20 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-700/30 border-2 border-slate-600/30 hover:bg-slate-700/50 hover:border-slate-600/50'
            }`}
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <div className={`font-semibold text-sm mb-1 ${
              activeCategory === cat.id ? 'text-cyan-400' : 'text-slate-300'
            }`}>
              {cat.label}
            </div>
            <div className="text-xs text-slate-500">{cat.desc}</div>
          </button>
        ))}
      </div>

      {/* Skills Grid - 2 columns for better use of space */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {skills[activeCategory].map((skill, index) => (
          <div 
            key={skill.name}
            className="group"
            style={{ 
              animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                {skill.name}
              </span>
              <span className="text-xs text-slate-500 font-mono bg-slate-700/50 px-2 py-0.5 rounded">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-2 rounded-full transition-all duration-700 group-hover:from-cyan-400 group-hover:to-cyan-300"
                style={{ 
                  width: `${skill.level}%`,
                  animation: `growWidth 0.8s ease-out ${index * 0.05}s both`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes growWidth {
          from {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
}
