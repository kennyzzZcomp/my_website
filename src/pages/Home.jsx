import GitHubHeatmap from '../components/GitHubHeatmap';
import SkillsShowcase from '../components/SkillsShowcase';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-slate-900">
      {/* left sidebar - 移动端全宽，桌面端固定宽度 */}
      <div className="w-full lg:w-96 bg-white p-6 flex flex-col items-center border-r border-slate-200">
        {/* Avatar */}
        <div className="w-32 h-32 bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-700 text-4xl font-mono font-bold mb-4 mt-8">
          ZH
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Kenny Huang</h2>
        <p className="text-slate-500 mb-6 text-sm">Full Stack Developer</p>

        {/* Education in Sidebar */}
        <div className="w-full border-t border-slate-200 pt-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Education</h3>
          
          <div className="space-y-4 text-left">
            {/* Current */}
            <div className="border-l-2 border-cyan-600 pl-3">
              <p className="text-sm font-semibold text-slate-900">University of Sydney</p>
              <p className="text-xs text-slate-600">Bachelor of Advanced Computing</p>
              <p className="text-xs text-slate-500">2024 - Present</p>
            </div>

            {/* Previous - Replace with your info */}
            <div className="border-l-2 border-slate-200 pl-3">
              <p className="text-sm font-semibold text-slate-900">Beijing Normal-Hongkong Baptist University</p>
              <p className="text-xs text-slate-600">Bachelor of Computer Science/Environmental Science</p>
              <p className="text-xs text-slate-500">2021 - 2023</p>
            </div>
          </div>
        </div>

        {/* LeetCode Stats in Sidebar */}
        <div className="w-full lg:w-70 border-t border-slate-100 pt-6 mt-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">LeetCode</h3>
          <div className="overflow-hidden rounded cursor-pointer">
            <img 
              src="https://leetcard.jacoblin.cool/kennyzzz?theme=light&font=Ubuntu&site=cn" 
              alt="LeetCode Stats"
              className="w-full rounded transition-transform duration-300 hover:scale-110"
            />
          </div>
          <p className="text-xs text-slate-100 mt-2 text-center">
            <a 
              href="https://leetcode.cn/u/kennyzzz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-700 hover:underline"
            >
              View Profile
            </a>
          </p>
        </div>
        
      </div>
      {/* main content - 移动端全宽，桌面端弹性宽度 */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white">

        <div className="bg-white border border-slate-200 p-6 rounded-lg mb-4 hover:border-cyan-500 transition-colors">
          <h2 className="text-xl font-bold text-slate-900 mb-3">About Me</h2>
          <p className="text-slate-700">My name is Zijian Huang. An undergraduate student at the University of Sydney, majoring in Computer Science. I really love coding and exploring new hands-on skills in both software and hardware. 
            Looking to explore and record my journey in the tech world.
          </p>
        </div>

        {/* Skills Showcase */}
        <div className="mb-4">
          <SkillsShowcase />
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-cyan-600 transition-colors">
          <h2 className="text-xl font-bold text-slate-900 mb-4">GitHub Contributions</h2>
          <GitHubHeatmap username="kennyzzZcomp" />
          <p className="text-sm text-slate-600 mt-3">
            View full profile on{' '}
            <a 
              href="https://github.com/kennyzzZcomp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-700 hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
