const TopStudents = ({ students, loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 h-6 w-32 animate-pulse rounded-md bg-slate-200"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex h-12 w-full animate-pulse items-center justify-between rounded-lg bg-slate-50 px-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-200"></div>
                <div className="h-4 w-20 rounded bg-slate-200"></div>
              </div>
              <div className="h-4 w-12 rounded bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Top Performers</h2>
      </div>

      <div className="space-y-4">
        {students?.length > 0 ? (
          students.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${
                  index === 0 ? "bg-amber-100 text-amber-600" :
                  index === 1 ? "bg-slate-100 text-slate-500" :
                  index === 2 ? "bg-orange-100 text-orange-600" :
                  "bg-indigo-50 text-indigo-600"
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{student.name}</h4>
                  <p className="text-xs text-slate-500">{student.class}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-indigo-600">{student.score}%</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm font-medium text-slate-500">No data available.</p>
          </div>
        )}
      </div>
      
      {students?.length > 0 && (
        <button className="mt-4 w-full rounded-xl py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600">
          View All Students
        </button>
      )}
    </div>
  )
}

export default TopStudents
