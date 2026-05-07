import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap, LayoutDashboard, TableProperties, BarChart3,
  Trophy, FileText, Download, Printer, TrendingUp,
  Users, Star, BookOpen, AlertTriangle, Clock, CheckCircle
} from "lucide-react"
import { teachersData, recentActivities } from "../layouts/TeacherPerformance/teacherData"
import TeacherStatsCards from "../layouts/TeacherPerformance/TeacherStatsCards"
import TeacherFiltersBar from "../layouts/TeacherPerformance/TeacherFiltersBar"
import TeacherTable from "../layouts/TeacherPerformance/TeacherTable"
import TeacherCharts from "../layouts/TeacherPerformance/TeacherCharts"
import TeacherRankingPanel from "../layouts/TeacherPerformance/TeacherRankingPanel"

/* ── Tab config ──────────────────────────────────────────── */
const TABS = [
  { id: "overview",   label: "Overview",        icon: LayoutDashboard },
  { id: "table",      label: "Performance Table", icon: TableProperties },
  { id: "analytics",  label: "Analytics",        icon: BarChart3 },
  { id: "rankings",   label: "Rankings & Alerts", icon: Trophy },
  { id: "reports",    label: "Reports",          icon: FileText },
]

/* ── Helpers ─────────────────────────────────────────────── */
const statusColor = s => ({
  Excellent: { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "#10b981" },
  Good:      { badge: "bg-blue-100    text-blue-700    border-blue-200",    bar: "#3b82f6" },
  Average:   { badge: "bg-amber-100   text-amber-700   border-amber-200",   bar: "#f59e0b" },
  Poor:      { badge: "bg-rose-100    text-rose-700    border-rose-200",    bar: "#ef4444" },
}[s] || { badge: "bg-slate-100 text-slate-600 border-slate-200", bar: "#94a3b8" })

/* ══════════════════════════════════════════════════════════
   OVERVIEW TAB
══════════════════════════════════════════════════════════ */
const OverviewTab = () => {
  const total    = teachersData.length
  const excellent = teachersData.filter(t => t.status === "Excellent").length
  const avgAtt   = Math.round(teachersData.reduce((a, b) => a + b.attendance, 0) / total)
  const avgRating = (teachersData.reduce((a, b) => a + b.rating, 0) / total).toFixed(1)
  const pending  = teachersData.reduce((a, b) => a + b.pendingReports, 0)

  const quickStats = [
    { label: "Excellent Teachers",  value: excellent,   icon: Star,       color: "amber",   suffix: "" },
    { label: "School Avg Attendance", value: `${avgAtt}%`, icon: TrendingUp, color: "indigo",  suffix: "" },
    { label: "Avg Student Rating",  value: avgRating,   icon: Star,       color: "rose",    suffix: "/ 5" },
    { label: "Pending Reports",     value: pending,     icon: AlertTriangle, color: "orange", suffix: "" },
  ]

  return (
    <div className="space-y-6">
      <TeacherStatsCards />

      {/* Quick stat boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={`rounded-2xl bg-${s.color}-50 border border-${s.color}-100 p-5`}>
              <div className={`h-9 w-9 rounded-xl bg-${s.color}-100 flex items-center justify-center mb-3`}>
                <Icon className={`h-4 w-4 text-${s.color}-600`} />
              </div>
              <p className={`text-2xl font-bold text-${s.color}-700`}>{s.value} <span className="text-sm font-normal">{s.suffix}</span></p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Performance Status Breakdown</h3>
          <div className="space-y-3">
            {["Excellent","Good","Average","Poor"].map(s => {
              const count = teachersData.filter(t => t.status === s).length
              const pct   = Math.round((count / total) * 100)
              const { bar } = statusColor(s)
              return (
                <div key={s}>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-600">{s}</span>
                    <span className="text-slate-500">{count} teachers ({pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: bar }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top 5 quick list */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Top 5 Teachers at a Glance</h3>
          <div className="space-y-2">
            {[...teachersData].sort((a,b) => b.resultPct - a.resultPct).slice(0,5).map((t, i) => {
              const { badge } = statusColor(t.status)
              return (
                <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition">
                  <span className="text-xs font-bold text-slate-400 w-4">#{i+1}</span>
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.subject}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>{t.status}</span>
                  <span className="text-xs font-bold text-indigo-700">{t.resultPct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent activities preview */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-500" /> Recent Activities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentActivities.map((a, i) => (
            <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xl mt-0.5">{a.emoji}</span>
              <div>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">{a.text}</p>
                <p className="text-[10px] text-slate-400 mt-1">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   PERFORMANCE TABLE TAB
══════════════════════════════════════════════════════════ */
const TableTab = () => {
  const [search, setSearch]   = useState("")
  const [subject, setSubject] = useState("All Subjects")
  const [cls, setCls]         = useState("All Classes")
  const [level, setLevel]     = useState("All Levels")

  const filtered = useMemo(() => teachersData.filter(t => {
    const ms = t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())
    const mj = subject === "All Subjects" || t.subject === subject
    const mc = cls    === "All Classes"   || t.classAssigned === cls
    const ml = level  === "All Levels"    || t.status === level
    return ms && mj && mc && ml
  }), [search, subject, cls, level])

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <TableProperties className="h-5 w-5 opacity-80" />
          <h2 className="text-lg font-bold">Teacher Performance Table</h2>
        </div>
        <p className="text-indigo-200 text-sm">Full list of all {teachersData.length} teachers — search, filter, and view detailed profiles</p>
      </div>
      <TeacherFiltersBar
        search={search} setSearch={setSearch}
        subject={subject} setSubject={setSubject}
        cls={cls} setCls={setCls}
        level={level} setLevel={setLevel}
      />
      <TeacherTable filtered={filtered} />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   ANALYTICS TAB
══════════════════════════════════════════════════════════ */
const AnalyticsTab = () => (
  <div className="space-y-4">
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-5 text-white">
      <div className="flex items-center gap-3 mb-1">
        <BarChart3 className="h-5 w-5 opacity-80" />
        <h2 className="text-lg font-bold">Performance Analytics</h2>
      </div>
      <p className="text-blue-200 text-sm">Charts for attendance trends, result performance, and student feedback ratings</p>
    </div>
    <TeacherCharts />

    {/* Subject-wise avg */}
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Subject-wise Average Result %</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...new Set(teachersData.map(t => t.subject))].map(subj => {
          const group = teachersData.filter(t => t.subject === subj)
          const avg   = Math.round(group.reduce((a, b) => a + b.resultPct, 0) / group.length)
          const color = avg >= 85 ? "#10b981" : avg >= 75 ? "#6366f1" : avg >= 65 ? "#f59e0b" : "#ef4444"
          return (
            <div key={subj} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{subj}</p>
                <div className="mt-1.5 h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${avg}%` }}
                    transition={{ duration: 0.9 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold shrink-0" style={{ color }}>{avg}%</span>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   RANKINGS & ALERTS TAB
══════════════════════════════════════════════════════════ */
const RankingsTab = () => (
  <div className="space-y-4">
    <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-white">
      <div className="flex items-center gap-3 mb-1">
        <Trophy className="h-5 w-5 opacity-80" />
        <h2 className="text-lg font-bold">Rankings, Alerts & Activity</h2>
      </div>
      <p className="text-amber-100 text-sm">Top performers, system alerts for at-risk teachers, and recent activity feed</p>
    </div>
    <TeacherRankingPanel />

    {/* Attendance leaderboard */}
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Users className="h-4 w-4 text-slate-400" /> Attendance Leaderboard
      </h3>
      <div className="space-y-2">
        {[...teachersData].sort((a,b) => b.attendance - a.attendance).map((t, i) => {
          const color = t.attendance >= 95 ? "#10b981" : t.attendance >= 85 ? "#6366f1" : t.attendance >= 75 ? "#f59e0b" : "#ef4444"
          return (
            <div key={t.id} className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 w-5 shrink-0">#{i+1}</span>
              <div className="h-7 w-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-bold shrink-0">
                {t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
              </div>
              <span className="text-xs font-medium text-slate-700 w-32 shrink-0 truncate">{t.name}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.attendance}%` }}
                  transition={{ duration: 0.8, delay: i * 0.04 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
              <span className="text-xs font-bold w-10 text-right shrink-0" style={{ color }}>{t.attendance}%</span>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   REPORTS TAB
══════════════════════════════════════════════════════════ */
const reportItems = [
  { title: "Monthly Attendance Report", desc: "Teacher-wise attendance for this month", icon: "📅", badge: "Ready", badgeColor: "emerald" },
  { title: "Student Result Summary",    desc: "Class-wise result % by teacher",         icon: "📊", badge: "Ready", badgeColor: "emerald" },
  { title: "Student Feedback Report",   desc: "All teacher ratings from students",       icon: "⭐", badge: "Ready", badgeColor: "emerald" },
  { title: "Pending Reports List",      desc: "Teachers with overdue submissions",       icon: "⚠️", badge: "Urgent", badgeColor: "rose" },
  { title: "Leave Records Export",      desc: "Full leave history for all staff",        icon: "📋", badge: "Ready", badgeColor: "emerald" },
  { title: "Annual Appraisal Summary",  desc: "Combined score for performance review",   icon: "🏅", badge: "Draft", badgeColor: "amber" },
]

const ReportsTab = () => (
  <div className="space-y-4">
    <div className="rounded-2xl bg-gradient-to-r from-slate-700 to-slate-900 p-5 text-white">
      <div className="flex items-center gap-3 mb-1">
        <FileText className="h-5 w-5 opacity-80" />
        <h2 className="text-lg font-bold">Export & Reports</h2>
      </div>
      <p className="text-slate-300 text-sm">Download, print, or generate PDF reports for teacher performance data</p>
    </div>

    {/* Export buttons row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Export All CSV", icon: Download, color: "emerald", desc: "Full data spreadsheet" },
        { label: "Download PDF",   icon: FileText, color: "rose",    desc: "Formatted PDF report" },
        { label: "Print Report",   icon: Printer,  color: "slate",   desc: "Print-optimized layout" },
      ].map(({ label, icon: Icon, color, desc }) => (
        <button key={label} className={`flex items-center gap-4 p-5 rounded-2xl bg-${color}-50 border border-${color}-200 hover:bg-${color}-100 transition-all group text-left`}>
          <div className={`h-12 w-12 rounded-xl bg-${color}-100 group-hover:bg-${color}-200 flex items-center justify-center shrink-0 transition`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
          <div>
            <p className={`font-bold text-${color}-800`}>{label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
          </div>
        </button>
      ))}
    </div>

    {/* Report cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reportItems.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{r.icon}</span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-${r.badgeColor}-100 text-${r.badgeColor}-700 border border-${r.badgeColor}-200`}>
              {r.badge}
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">{r.title}</h4>
          <p className="text-xs text-slate-500 mb-4">{r.desc}</p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
            <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition">
              Preview
            </button>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Teacher-wise completion status */}
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Teacher Report Submission Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {teachersData.map(t => (
          <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition">
            <div className="h-8 w-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-bold shrink-0">
              {t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{t.name}</p>
              <p className="text-[10px] text-slate-400">{t.subject}</p>
            </div>
            {t.pendingReports === 0
              ? <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200"><CheckCircle className="h-3 w-3" />Up to date</span>
              : <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-1 rounded-full border border-rose-200">{t.pendingReports} pending</span>
            }
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
const TAB_CONTENT = {
  overview:  <OverviewTab />,
  table:     <TableTab />,
  analytics: <AnalyticsTab />,
  rankings:  <RankingsTab />,
  reports:   <ReportsTab />,
}

const TeacherPerformancePage = () => {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-5 pb-10">

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white/70 backdrop-blur-xl p-5 border border-white/20 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Teacher Performance
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Analytics, ratings &amp; reports for all {teachersData.length} teachers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Academic Year 2025–26
          </span>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-1.5">
        <div className="flex flex-wrap gap-1">
          {TABS.map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.id === "rankings" && (
                  <span className={`ml-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-rose-100 text-rose-600"}`}>
                    {teachersData.filter(t => t.attendance < 80 || t.pendingReports > 2).length}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {TAB_CONTENT[activeTab]}
        </motion.div>
      </AnimatePresence>

    </div>
  )
}

export default TeacherPerformancePage
