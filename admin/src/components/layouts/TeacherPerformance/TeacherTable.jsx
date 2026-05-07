import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, ChevronLeft, ChevronRight } from "lucide-react"
import TeacherDetailModal from "./TeacherDetailModal"

const PAGE_SIZE = 6

const statusBadge = s => {
  const map = {
    Excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Good: "bg-blue-100 text-blue-700 border-blue-200",
    Average: "bg-amber-100 text-amber-700 border-amber-200",
    Poor: "bg-rose-100 text-rose-700 border-rose-200",
  }
  return map[s] || "bg-slate-100 text-slate-700"
}

const AttBar = ({ value }) => {
  const color = value >= 90 ? "#10b981" : value >= 80 ? "#f59e0b" : "#ef4444"
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold w-8 text-right" style={{ color }}>{value}%</span>
    </div>
  )
}

const Stars = ({ rating }) => {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <span key={i} className={`text-sm ${i <= full ? "text-amber-400" : "text-slate-200"}`}>★</span>
        ))}
      </div>
      <span className="text-xs font-bold text-slate-700">{rating}</span>
    </div>
  )
}

const TeacherTable = ({ filtered }) => {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState(null)

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const cols = ["Teacher", "Subject", "Class", "Attendance", "Rating", "Result %", "Status", "Action"]

  return (
    <>
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Teacher Performance List</h3>
          <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">{filtered.length} teachers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {cols.map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {visible.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-indigo-50/30 transition-colors group"
                >
                  {/* Teacher Name */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
                        {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 whitespace-nowrap">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.joinYear} onwards</p>
                      </div>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-3.5">
                    <span className="text-slate-600 whitespace-nowrap">{t.subject}</span>
                  </td>

                  {/* Class */}
                  <td className="px-4 py-3.5">
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-100">{t.classAssigned}</span>
                  </td>

                  {/* Attendance Progress */}
                  <td className="px-4 py-3.5 w-36">
                    <AttBar value={t.attendance} />
                  </td>

                  {/* Stars */}
                  <td className="px-4 py-3.5">
                    <Stars rating={t.rating} />
                  </td>

                  {/* Result % */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">{t.resultPct}%</span>
                      <div className="w-14 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${t.resultPct}%` }} />
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3.5">
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBadge(t.status)}`}>
                      {t.status}
                    </span>
                  </td>

                  {/* View Button */}
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setSelected(t)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all active:scale-95 shadow-sm shadow-indigo-200"
                    >
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                  </td>
                </motion.tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🔍</span>
                      <p className="font-medium">No teachers match your filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)} className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${i === page ? "bg-indigo-600 text-white" : "border border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <TeacherDetailModal teacher={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default TeacherTable
