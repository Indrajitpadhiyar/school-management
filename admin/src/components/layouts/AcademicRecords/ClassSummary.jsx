

const ClassSummary = () => {
  const classes = [
    { name: "Class 5-A", students: 42, avg: 72, top: 95, weak: "Maths (60%)", pass: 90 },
    { name: "Class 6-B", students: 38, avg: 85, top: 98, weak: "History (71%)", pass: 98 },
    { name: "Class 8-C", students: 45, avg: 65, top: 88, weak: "Science (55%)", pass: 75 },
    { name: "Class 10-A", students: 40, avg: 81, top: 96, weak: "English (72%)", pass: 95 },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden h-full">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Class-wise Summary</h2>
        <p className="text-sm text-slate-500">Quick overview of class performance</p>
      </div>
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Avg %</th>
                <th className="px-4 py-3 font-medium">Pass Rate</th>
                <th className="px-4 py-3 font-medium">Weak Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.map((cls, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">{cls.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md font-medium text-xs ${
                      cls.avg >= 80 ? 'bg-emerald-100 text-emerald-700' :
                      cls.avg >= 70 ? 'bg-blue-100 text-blue-700' :
                      cls.avg >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {cls.avg}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{cls.pass}%</td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-rose-600 font-medium bg-rose-50 px-2 py-1 rounded-md">{cls.weak}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 w-full text-center">
          View All Classes
        </button>
      </div>
    </div>
  )
}

export default ClassSummary
