import { Megaphone, UserCheck, MessageSquare, CalendarPlus } from 'lucide-react'
import { cn } from '../../utils'

const actions = [
  { title: 'Create Circular', icon: Megaphone, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Assign Teacher', icon: UserCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'View Complaints', icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50' },
  { title: 'Schedule Meeting', icon: CalendarPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
]

const QuickActions = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-5">Quick Actions</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-md"
          >
            <div className={cn("rounded-xl p-3 transition-colors group-hover:scale-110", action.bg, action.color)}>
              <action.icon size={24} />
            </div>
            <span className="text-xs font-bold text-slate-700 transition-colors group-hover:text-indigo-600">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuickActions
