import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const lineData = [
  { month: "Jan", avg: 65, top: 85 },
  { month: "Feb", avg: 68, top: 88 },
  { month: "Mar", avg: 64, top: 82 },
  { month: "Apr", avg: 72, top: 91 },
  { month: "May", avg: 75, top: 94 },
  { month: "Jun", avg: 78, top: 96 },
]

const barData = [
  { subject: "Maths", ClassA: 62, ClassB: 75, ClassC: 58 },
  { subject: "Science", ClassA: 78, ClassB: 82, ClassC: 65 },
  { subject: "English", ClassA: 85, ClassB: 80, ClassC: 72 },
  { subject: "History", ClassA: 71, ClassB: 68, ClassC: 75 },
]

const pieData = [
  { name: "Grade A", value: 400 },
  { name: "Grade B", value: 300 },
  { name: "Grade C", value: 200 },
  { name: "Grade D/F", value: 100 },
]

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]

const PerformanceCharts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Progress (Avg vs Top)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="avg" name="Class Average" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="top" name="Top Performers" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Subject-wise Marks Comparison</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="ClassA" name="Class 5-A" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ClassB" name="Class 5-B" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart & Additional info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Grade Distribution</h3>
          <p className="text-sm text-slate-500 mb-4">Overall school performance breakdown</p>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* We can use the remaining 2 columns for something else or just have pie take 1 col */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Analytics Summary</h3>
          <p className="text-indigo-200 max-w-md text-sm leading-relaxed mb-6">
            Our data indicates a 12% improvement in overall science scores compared to last term. Consistent engagement with remedial classes has shown a positive correlation with grade improvements in lower percentiles.
          </p>
          <button className="self-start px-5 py-2.5 bg-white text-indigo-900 font-semibold rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20">
            Generate Full Analytics Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default PerformanceCharts