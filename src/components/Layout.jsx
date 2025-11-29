import { Link, NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <nav className="w-full bg-slate-900 border-b border-slate-800 fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo or Name */}
          <Link to="/" className="text-xl font-mono font-bold text-slate-100 hover:text-cyan-400 transition-colors">
            Kenny Huang
          </Link>

          {/* Navigation Items */}
          <div className="flex gap-8 text-sm font-mono">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                  : "text-slate-400 hover:text-slate-100 transition-colors pb-1"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                  : "text-slate-400 hover:text-slate-100 transition-colors pb-1"
              }
            >
              Projects
            </NavLink>

            <NavLink
                to="/posts"
                className={({ isActive }) =>
                    isActive
                    ? "text-cyan-400 border-b-2 border-cyan-400 pb-1"
                    : "text-slate-400 hover:text-slate-100 transition-colors pb-1"
                }
                >
                Posts
            </NavLink>

          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-slate-900">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-slate-500 text-sm bg-slate-900 border-t border-slate-800 font-mono">
        © 2025 Zijian Huang
      </footer>
    </>
  )
}