import { ChevronRight } from "lucide-react"

const ClassBreakdown = ({ classesData, loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 h-6 w-48 animate-pulse rounded-md bg-slate-200"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex h-16 w-full animate-pulse items-center justify-between rounded-xl bg-slate-100 px-4">
              <div className="h-4 w-24 rounded bg-slate-200"></div>
              <div className="flex gap-4">
                <div className="h-4 w-16 rounded bg-slate-200"></div>
                <div className="h-4 w-16 rounded bg-slate-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Class-wise Overview</h2>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View Detailed Report
        </button>
      </div>

      <div className="space-y-3">
        {classesData?.length > 0 ? (
          classesData.map((cls, index) => (
            <button
              key={index}
              className="group flex w-full items-center justify-between rounded-xl border border-slate-100 p-4 transition-all hover:border-indigo-100 hover:bg-indigo-50/50 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600">
                  {cls.name.split(" ")[1] || cls.name}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">{cls.name}</h3>
                  <p className="text-xs text-slate-500">{cls.teacher}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="hidden flex-col items-end sm:flex">
                  <span className="text-xs text-slate-500">Students</span>
                  <span className="font-semibold text-slate-700">{cls.students}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-500">Attendance</span>
                  <span className={`font-bold ${cls.attendance >= 90 ? "text-emerald-600" : "text-amber-600"}`}>
                    {cls.attendance}%
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-500">Avg Score</span>
                  <span className={`font-bold ${cls.score >= 80 ? "text-indigo-600" : "text-slate-700"}`}>
                    {cls.score}%
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600" />
              </div>
            </button>
          ))
        ) : (
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm font-medium text-slate-500">No class data available.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassBreakdown
