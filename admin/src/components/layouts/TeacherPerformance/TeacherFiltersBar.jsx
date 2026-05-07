import { Search, SlidersHorizontal, Download, FileText, Printer } from "lucide-react"
import { subjects, classes, performanceLevels } from "./teacherData"

const TeacherFiltersBar = ({ search, setSearch, subject, setSubject, cls, setCls, level, setLevel }) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
            />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="pl-9 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none cursor-pointer transition"
            >
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Class Filter */}
          <select
            value={cls}
            onChange={e => setCls(e.target.value)}
            className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none cursor-pointer transition"
          >
            {classes.map(c => <option key={c}>{c}</option>)}
          </select>

          {/* Performance Filter */}
          <div className="flex gap-2 flex-wrap">
            {performanceLevels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  level === lvl
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {lvl === "All Levels" ? "All" : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition">
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition">
            <FileText className="h-3.5 w-3.5" /> PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition">
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeacherFiltersBar
