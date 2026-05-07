import { motion } from "framer-motion"
import { AlertTriangle, Clock, TrendingDown, FileWarning } from "lucide-react"
import { teachersData, recentActivities } from "./teacherData"

const medals = ["🥇", "🥈", "🥉"]
const medalBg = ["from-amber-400 to-yellow-300", "from-slate-400 to-slate-300", "from-amber-700 to-amber-500"]

const TeacherRankingPanel = () => {
  const ranked = [...teachersData].sort((a, b) => (b.resultPct + b.rating * 10 + b.attendance) - (a.resultPct + a.rating * 10 + a.attendance))
  const top3 = ranked.slice(0, 3)

  const alerts = [
    ...teachersData.filter(t => t.attendance < 80).map(t => ({ type: "attendance", icon: TrendingDown, msg: `${t.name} has low attendance (${t.attendance}%)`, color: "rose" })),
    ...teachersData.filter(t => t.pendingReports > 2).map(t => ({ type: "report", icon: FileWarning, msg: `${t.name} has ${t.pendingReports} pending reports`, color: "amber" })),
    ...teachersData.filter(t => t.rating < 3.8).map(t => ({ type: "feedback", icon: AlertTriangle, msg: `${t.name} has low student feedback (${t.rating}★)`, color: "orange" })),
  ].slice(0, 5)

  const actColor = { blue: "bg-blue-100 text-blue-700", emerald: "bg-emerald-100 text-emerald-700", amber: "bg-amber-100 text-amber-700", purple: "bg-purple-100 text-purple-700", indigo: "bg-indigo-100 text-indigo-700", teal: "bg-teal-100 text-teal-700" }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* 🏆 Top Rankings */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">🏆 Top Performing Teachers</h3>
        <div className="space-y-3">
          {top3.map((t, i) => {
            const score = Math.round((t.resultPct + t.rating * 10 + t.attendance) / 3)
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${medalBg[i]} flex items-center justify-center text-xl shadow-sm shrink-0`}>
                  {medals[i]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{t.name}</p>
                  <p className="text-xs text-slate-500 truncate">{t.subject} · {t.classAssigned}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-indigo-700">{score}%</p>
                  <p className="text-xs text-slate-400">score</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Full ranking list */}
        <div className="mt-4 space-y-1.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">All Rankings</p>
          {ranked.slice(3).map((t, i) => (
            <div key={t.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition">
              <span className="text-xs font-bold text-slate-400 w-5">#{i + 4}</span>
              <div className="h-6 w-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-bold">
                {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <span className="text-xs font-medium text-slate-700 flex-1 truncate">{t.name}</span>
              <span className="text-xs text-slate-500">{t.resultPct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ⚠️ Alerts */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" /> Alerts & Warnings
        </h3>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-slate-400 gap-2">
              <span className="text-3xl">✅</span>
              <p className="text-sm font-medium">No active alerts</p>
            </div>
          ) : (
            alerts.map((a, i) => {
              const Icon = a.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-start gap-3 p-3 rounded-xl bg-${a.color}-50 border border-${a.color}-100`}
                >
                  <div className={`mt-0.5 h-7 w-7 rounded-lg bg-${a.color}-100 flex items-center justify-center shrink-0`}>
                    <Icon className={`h-3.5 w-3.5 text-${a.color}-600`} />
                  </div>
                  <p className={`text-xs font-medium text-${a.color}-800 leading-relaxed`}>{a.msg}</p>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Pending syllabus note */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
          <div className="h-7 w-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <FileWarning className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-800">Syllabus Completion</p>
            <p className="text-xs text-blue-700 mt-0.5">3 teachers yet to submit monthly syllabus update</p>
          </div>
        </div>
      </div>

      {/* 🕐 Recent Activities */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-500" /> Recent Activities
        </h3>
        <div className="space-y-3">
          {recentActivities.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 group"
            >
              <div className={`mt-0.5 h-8 w-8 rounded-xl ${actColor[a.color] || "bg-slate-100 text-slate-600"} flex items-center justify-center text-sm shrink-0`}>
                {a.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 leading-relaxed">{a.text}</p>
                <p className="text-[10px] text-slate-400 mt-1">{a.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeacherRankingPanel
