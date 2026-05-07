import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts"
import { teachersData, monthLabels } from "./teacherData"

// Monthly avg attendance across all teachers
const attendanceData = monthLabels.map((month, i) => ({
  month,
  "Avg Attendance": Math.round(teachersData.reduce((a, t) => a + t.monthlyAttendance[i], 0) / teachersData.length),
  "Top Teacher": Math.max(...teachersData.map(t => t.monthlyAttendance[i])),
}))

// Top 8 teachers by result %
const resultData = [...teachersData]
  .sort((a, b) => b.resultPct - a.resultPct)
  .slice(0, 8)
  .map(t => ({ name: t.name.split(" ")[0], "Result %": t.resultPct, subject: t.subject }))

// All teacher feedback ratings
const feedbackData = [...teachersData]
  .sort((a, b) => b.rating - a.rating)
  .map(t => ({ name: t.name.split(" ")[0], Rating: t.rating }))

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
      ))}
    </div>
  )
}

const TeacherCharts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Attendance Chart */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">Monthly Teacher Attendance</h3>
            <p className="text-xs text-slate-500 mt-0.5">Average vs top performer attendance trend</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Line type="monotone" dataKey="Avg Attendance" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Top Teacher" stroke="#10b981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Result Performance Bar */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">Student Result % by Teacher</h3>
            <p className="text-xs text-slate-500 mt-0.5">Top 8 teachers by exam result performance</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resultData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Result %" radius={[6, 6, 0, 0]} fill="url(#resultGrad)" />
                <defs>
                  <linearGradient id="resultGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Student Feedback Rating Comparison */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Student Feedback Ratings — All Teachers</h3>
            <p className="text-xs text-slate-500 mt-0.5">Rating out of 5.0 · Based on student surveys</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-400 inline-block" /> Rating</span>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feedbackData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} ticks={[1,2,3,4,5]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Rating" radius={[6, 6, 0, 0]} fill="url(#fbGrad)" />
              <defs>
                <linearGradient id="fbGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default TeacherCharts
