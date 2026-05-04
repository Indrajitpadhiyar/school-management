import { CalendarDays } from 'lucide-react'
import { cn } from '../../../utils'

const events = [
  { time: '09:30 AM', task: 'Morning Assembly Inspection', active: true },
  { time: '11:00 AM', task: 'Teacher Performance Review', active: false },
  { time: '01:30 PM', task: 'PTA Planning Meeting', active: false },
  { time: '03:00 PM', task: 'Finance Team Check-in', active: false },
]

const TodaySchedule = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900">Today&apos;s Schedule</h3>
        <CalendarDays className="h-5 w-5 text-slate-400" />
      </div>

      <div className="space-y-6 relative before:absolute before:left-[35px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
        {events.map((event, idx) => (
          <div key={idx} className="relative flex items-center gap-6">
            <div className={cn(
              "z-10 flex h-[70px] w-[70px] shrink-0 flex-col items-center justify-center rounded-2xl border transition-all duration-200",
              event.active ? "border-indigo-200 bg-indigo-50 shadow-sm" : "border-slate-100 bg-white"
            )}>
              <span className={cn("text-[10px] font-bold uppercase", event.active ? "text-indigo-600" : "text-slate-400")}>
                {event.time.split(' ')[1]}
              </span>
              <span className={cn("text-sm font-black", event.active ? "text-indigo-700" : "text-slate-700")}>
                {event.time.split(' ')[0]}
              </span>
            </div>
            
            <div className="flex-1">
              <p className={cn(
                "text-sm font-bold leading-tight",
                event.active ? "text-slate-900" : "text-slate-600"
              )}>
                {event.task}
              </p>
              {event.active && (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  <span className="h-1 w-1 rounded-full bg-emerald-600 animate-pulse" />
                  Happening Now
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TodaySchedule
