import { Bell, Info, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { cn } from '../../../utils'

const notifications = [
  {
    id: 1,
    text: 'New teacher application submitted by Amit Verma.',
    time: '2h ago',
    type: 'info',
    icon: Info,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 2,
    text: 'Fee report for Class 9 generated successfully.',
    time: '4h ago',
    type: 'success',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    id: 3,
    text: 'Urgent: Server maintenance scheduled for midnight.',
    time: '6h ago',
    type: 'warning',
    icon: AlertCircle,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }
]

const NotificationsPanel = () => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900">Recent Notifications</h3>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-all duration-200 hover:border-slate-100 hover:bg-slate-50/50"
          >
            <div className={cn("mt-0.5 rounded-xl p-2", notif.bg, notif.color)}>
              <notif.icon size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 leading-snug">{notif.text}</p>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock size={12} />
                <span>{notif.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
        View All Notifications
      </button>
    </article>
  )
}

export default NotificationsPanel
