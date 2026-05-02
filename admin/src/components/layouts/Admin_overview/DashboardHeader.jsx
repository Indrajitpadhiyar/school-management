import { Menu, Bell, Search, Plus, Calendar } from 'lucide-react'

const DashboardHeader = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden text-slate-600"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-slate-900">Admin Overview</h1>
          <p className="text-xs font-medium text-slate-500">Welcome back, Principal</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600">2026-27 Academic Year</span>
        </div>

        <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus size={16} />
          <span className="hidden sm:inline">New Notice</span>
        </button>

        <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
