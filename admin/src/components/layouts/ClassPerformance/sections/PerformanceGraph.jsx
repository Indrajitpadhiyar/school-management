import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockGraphData = [
  { name: "Week 1", score: 75, attendance: 92 },
  { name: "Week 2", score: 78, attendance: 95 },
  { name: "Week 3", score: 82, attendance: 91 },
  { name: "Week 4", score: 85, attendance: 94 },
  { name: "Week 5", score: 88, attendance: 96 },
  { name: "Week 6", score: 86, attendance: 93 },
  { name: "Week 7", score: 90, attendance: 95 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
        <p className="mb-2 font-semibold text-slate-900">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-900">{entry.value}%</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const PerformanceGraph = ({ loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-48 animate-pulse rounded-md bg-slate-200"></div>
          <div className="flex gap-2">
            <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200"></div>
            <div className="h-4 w-20 animate-pulse rounded-md bg-slate-200"></div>
          </div>
        </div>
        <div className="h-[300px] w-full animate-pulse rounded-xl bg-slate-100"></div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Performance Trends</h2>
          <p className="text-sm text-slate-500">Weekly average score vs attendance</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
            <span className="text-slate-600">Avg Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600">Attendance</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#64748b", fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#64748b", fontSize: 12 }} 
              domain={[60, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "3 3" }} />
            <Area
              type="monotone"
              dataKey="score"
              name="Avg Score"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorScore)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="attendance"
              name="Attendance"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAttendance)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PerformanceGraph
