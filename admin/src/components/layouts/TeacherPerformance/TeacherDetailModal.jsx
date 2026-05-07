import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Phone, Calendar, BookOpen, Star, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import { monthLabels } from "./teacherData"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const statusColor = s => ({ Excellent: "emerald", Good: "blue", Average: "amber", Poor: "rose" }[s] || "slate")

const TeacherDetailModal = ({ teacher, onClose }) => {
  if (!teacher) return null

  const attData = teacher.monthlyAttendance.map((v, i) => ({ month: monthLabels[i], Attendance: v }))
  const resData = teacher.monthlyResults.map((v, i) => ({ month: monthLabels[i], "Result %": v }))
  const fbData = teacher.feedbackHistory.map((v, i) => ({ month: monthLabels[i], Rating: v }))
  const col = statusColor(teacher.status)

  const leaveRows = [
    { month: "November", days: teacher.leaves > 2 ? 2 : 0, reason: "Medical" },
    { month: "December", days: teacher.leaves > 4 ? 2 : teacher.leaves > 2 ? 1 : 0, reason: "Personal" },
    { month: "January", days: Math.max(0, teacher.leaves - 4), reason: "Emergency" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header Banner */}
          <div className={`relative bg-gradient-to-r from-${col}-500 to-${col === "emerald" ? "teal" : col === "blue" ? "cyan" : col === "amber" ? "orange" : "pink"}-500 p-6 rounded-t-3xl`}>
            <button onClick={onClose} className="absolute top-4 right-4 h-8 w-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition">
              <X className="h-4 w-4 text-white" />
            </button>
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {teacher.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{teacher.name}</h2>
                <p className="opacity-80 text-sm mt-1">{teacher.subject} · Class {teacher.classAssigned}</p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Since {teacher.joinYear}</span>
                  <span className={`text-xs bg-white/20 px-3 py-1 rounded-full`}>{teacher.status}</span>
                  {teacher.pendingReports > 0 && <span className="text-xs bg-red-500/70 px-3 py-1 rounded-full">{teacher.pendingReports} Pending Reports</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Mail, label: "Email", val: teacher.email },
                { icon: Phone, label: "Phone", val: teacher.phone },
                { icon: Calendar, label: "Leaves Taken", val: `${teacher.leaves} days` },
                { icon: BookOpen, label: "Classes/Month", val: teacher.classesMonth },
              ].map(({ icon: Icon, label, val }, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-slate-500">{label}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 truncate">{val}</p>
                </div>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Attendance", value: teacher.attendance, suffix: "%", color: teacher.attendance >= 90 ? "emerald" : teacher.attendance >= 80 ? "amber" : "rose" },
                { label: "Student Rating", value: teacher.rating, suffix: "/ 5", color: "indigo" },
                { label: "Result %", value: teacher.resultPct, suffix: "%", color: teacher.resultPct >= 85 ? "emerald" : teacher.resultPct >= 70 ? "amber" : "rose" },
                { label: "HW Completion", value: teacher.hwCompletion, suffix: "%", color: teacher.hwCompletion >= 90 ? "emerald" : "amber" },
              ].map(({ label, value, suffix, color }, i) => (
                <div key={i} className={`bg-${color}-50 rounded-xl p-4 border border-${color}-100 text-center`}>
                  <p className={`text-3xl font-bold text-${color}-700`}>{value}<span className="text-base font-normal ml-1">{suffix}</span></p>
                  <p className="text-xs text-slate-500 mt-1">{label}</p>
                  <div className="mt-2 bg-white rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${Math.min(value * (suffix === "/ 5" ? 20 : 1), 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Monthly Attendance", data: attData, key: "Attendance", color: "#6366f1" },
                { title: "Result Performance", data: resData, key: "Result %", color: "#10b981" },
                { title: "Student Feedback", data: fbData, key: "Rating", color: "#f59e0b" },
              ].map(({ title, data, key, color }, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">{title}</h4>
                  <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
                        <Line type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {/* Leave Records */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" /> Leave Records
              </h4>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {["Month", "Days", "Reason", "Status"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {leaveRows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-700">{row.month}</td>
                        <td className="px-4 py-3 text-slate-600">{row.days}</td>
                        <td className="px-4 py-3 text-slate-600">{row.reason}</td>
                        <td className="px-4 py-3">
                          {row.days === 0
                            ? <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full"><CheckCircle className="h-3 w-3" />Full Present</span>
                            : <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full"><AlertCircle className="h-3 w-3" />Approved</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TeacherDetailModal
