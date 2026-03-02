import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <nav className="w-full bg-slate-100 border-b border-slate-300 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo or Name */}
          <Link to="/" className="text-lg sm:text-xl font-mono font-bold text-slate-900 hover:text-cyan-400 transition-colors">
            Kenny Huang
          </Link>

          {/* Navigation Items */}
          <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-mono">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                  : "text-slate-400 hover:text-cyan-400 transition-colors pb-1"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                  : "text-slate-400 hover:text-cyan-400 transition-colors pb-1"
              }
            >
              Projects
            </NavLink>

            <NavLink
                to="/posts"
                className={({ isActive }) =>
                    isActive
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                    : "text-slate-400 hover:text-cyan-400 transition-colors pb-1"
                }
                >
                Posts
            </NavLink>

          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-white">
        <Outlet />
      </main>

      <div className="w-full py-6 text-center text-slate-500 text-sm border-t border-slate-200 font-mono">
        © 2025 Zijian Huang
      </div>
    </>
  )
}