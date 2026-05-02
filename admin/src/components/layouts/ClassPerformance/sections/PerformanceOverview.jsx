import { Users, TrendingUp, BookOpen, AlertCircle } from "lucide-react"

const StatCard = ({ title, value, trend, icon: Icon, colorClass, loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-3 w-full">
            <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200"></div>
            <div className="h-8 w-16 animate-pulse rounded-md bg-slate-200"></div>
          </div>
          <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200 shrink-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
          {trend && (
            <p className={`mt-2 flex items-center text-sm font-medium ${trend > 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {trend > 0 ? "+" : ""}{trend}%
              <span className="ml-1 text-slate-400 font-normal">from last month</span>
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${colorClass}`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  )
}

const PerformanceOverview = ({ data, loading }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value={data?.totalStudents || "0"}
        trend={2.4}
        icon={Users}
        colorClass="bg-indigo-500"
        loading={loading}
      />
      <StatCard
        title="Average Attendance"
        value={`${data?.avgAttendance || 0}%`}
        trend={-1.2}
        icon={TrendingUp}
        colorClass="bg-emerald-500"
        loading={loading}
      />
      <StatCard
        title="Avg. Test Score"
        value={`${data?.avgScore || 0}%`}
        trend={4.5}
        icon={BookOpen}
        colorClass="bg-blue-500"
        loading={loading}
      />
      <StatCard
        title="At-Risk Students"
        value={data?.atRisk || "0"}
        trend={-5.0}
        icon={AlertCircle}
        colorClass="bg-rose-500"
        loading={loading}
      />
    </div>
  )
}

export default PerformanceOverview
