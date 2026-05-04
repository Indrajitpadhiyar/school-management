import { useState, useRef, useEffect } from "react"
import { Search, Filter, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ModernSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full min-w-[140px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full min-w-[160px] overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-xl shadow-slate-200/50"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    value === option
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {value === option && <Check className="h-4 w-4 text-indigo-600" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FiltersBar = () => {
  const [classFilter, setClassFilter] = useState("All Classes")
  const [sectionFilter, setSectionFilter] = useState("All Sections")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [examFilter, setExamFilter] = useState("Midterm Exam")

  const handleReset = () => {
    setClassFilter("All Classes")
    setSectionFilter("All Sections")
    setSubjectFilter("All Subjects")
    setExamFilter("Midterm Exam")
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col xl:flex-row gap-4 items-center z-20 relative">
      {/* Search */}
      <div className="relative w-full xl:w-72 shrink-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50 hover:bg-slate-100/50 transition-colors"
          placeholder="Search student or class..."
        />
      </div>

      <div className="h-8 w-px bg-slate-200 hidden xl:block shrink-0"></div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto flex-1">
        <ModernSelect
          options={["All Classes", "Class 5", "Class 8", "Class 10"]}
          value={classFilter}
          onChange={setClassFilter}
        />
        <ModernSelect
          options={["All Sections", "Section A", "Section B", "Section C"]}
          value={sectionFilter}
          onChange={setSectionFilter}
        />
        <ModernSelect
          options={["All Subjects", "Mathematics", "Science", "English", "History"]}
          value={subjectFilter}
          onChange={setSubjectFilter}
        />
        <ModernSelect
          options={["Midterm Exam", "Final Exam", "Unit Test 1", "Unit Test 2"]}
          value={examFilter}
          onChange={setExamFilter}
        />
      </div>
      
      <button 
        onClick={handleReset}
        className="flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors w-full xl:w-auto justify-center shrink-0"
      >
        <Filter className="h-4 w-4" />
        Reset
      </button>
    </div>
  )
}

export default FiltersBar
