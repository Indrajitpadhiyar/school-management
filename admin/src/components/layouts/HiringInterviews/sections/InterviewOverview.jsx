import { Users, CalendarCheck, CheckCircle2, Clock } from "lucide-react"

const OverviewCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  )
}

const InterviewOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        title="Total Applicants"
        value={stats.total}
        icon={Users}
        colorClass="bg-indigo-500"
      />
      <OverviewCard
        title="Interviews Scheduled"
        value={stats.scheduled}
        icon={CalendarCheck}
        colorClass="bg-amber-500"
      />
      <OverviewCard
        title="Pending Candidates"
        value={stats.pending}
        icon={Clock}
        colorClass="bg-blue-500"
      />
      <OverviewCard
        title="Interviews Completed"
        value={stats.completed}
        icon={CheckCircle2}
        colorClass="bg-emerald-500"
      />
    </div>
  )
}

export default InterviewOverview
