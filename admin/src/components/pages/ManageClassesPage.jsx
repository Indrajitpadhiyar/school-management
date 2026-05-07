import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  GraduationCap,
  LayoutGrid,
  Search,
} from "lucide-react"

const DIVISION_OPTIONS = ["A", "B", "C", "D", "E", "F"]

const initialClasses = [
  { id: 1, className: "Class 1", divisions: ["A", "B", "C"] },
  { id: 2, className: "Class 2", divisions: ["A", "B"] },
  { id: 3, className: "Class 3", divisions: ["A", "B", "C", "D"] },
]

const ManageClassesPage = () => {
  const [classes, setClasses] = useState(initialClasses)
  const [newClassName, setNewClassName] = useState("")
  const [newDivisions, setNewDivisions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editClassName, setEditClassName] = useState("")
  const [editDivisions, setEditDivisions] = useState([])
  const [formError, setFormError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(""), 2500)
  }

  const toggleDivision = (div, list, setList) => {
    setList(list.includes(div) ? list.filter((d) => d !== div) : [...list, div].sort())
  }

  const handleAddClass = () => {
    if (!newClassName.trim()) {
      setFormError("Class name is required.")
      return
    }
    if (newDivisions.length === 0) {
      setFormError("Select at least one division.")
      return
    }
    const duplicate = classes.find(
      (c) => c.className.toLowerCase() === newClassName.trim().toLowerCase()
    )
    if (duplicate) {
      setFormError("This class already exists.")
      return
    }
    const newEntry = {
      id: Date.now(),
      className: newClassName.trim(),
      divisions: newDivisions,
    }
    setClasses([...classes, newEntry])
    setNewClassName("")
    setNewDivisions([])
    setFormError("")
    showSuccess(`"${newEntry.className}" added successfully!`)
  }

  const handleDelete = (id, name) => {
    setClasses(classes.filter((c) => c.id !== id))
    showSuccess(`"${name}" deleted.`)
  }

  const startEdit = (cls) => {
    setEditingId(cls.id)
    setEditClassName(cls.className)
    setEditDivisions([...cls.divisions])
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditClassName("")
    setEditDivisions([])
  }

  const saveEdit = (id) => {
    if (!editClassName.trim()) return
    if (editDivisions.length === 0) return
    setClasses(
      classes.map((c) =>
        c.id === id
          ? { ...c, className: editClassName.trim(), divisions: editDivisions }
          : c
      )
    )
    showSuccess("Class updated successfully!")
    cancelEdit()
  }

  const filtered = classes.filter((c) =>
    c.className.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add &amp; Manage Classes</h1>
            <p className="text-sm text-slate-500">Create class names and assign divisions</p>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm"
          >
            <Check size={16} />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Class Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Plus size={18} className="text-indigo-600" />
          <h2 className="text-base font-semibold text-slate-800">Add New Class</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Class Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <GraduationCap size={13} />
              Class Name
            </label>
            <input
              type="text"
              value={newClassName}
              onChange={(e) => { setNewClassName(e.target.value); setFormError("") }}
              onKeyDown={(e) => e.key === "Enter" && handleAddClass()}
              placeholder="e.g. Class 4, Grade 5..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Division Picker */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <LayoutGrid size={13} />
              Divisions
            </label>
            <div className="flex flex-wrap gap-2">
              {DIVISION_OPTIONS.map((div) => (
                <button
                  key={div}
                  onClick={() => { toggleDivision(div, newDivisions, setNewDivisions); setFormError("") }}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                    newDivisions.includes(div)
                      ? "border-indigo-500 bg-indigo-600 text-white shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {formError && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-xs font-medium text-rose-500"
            >
              ⚠ {formError}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={handleAddClass}
          className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
        >
          <Plus size={16} />
          Add Class
        </button>
      </div>

      {/* Classes List Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-600" />
            <h2 className="text-base font-semibold text-slate-800">
              All Classes
              <span className="ml-2 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">
                {classes.length}
              </span>
            </h2>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search classes..."
              className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-14 text-center">
            <BookOpen size={36} className="mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-400">No classes found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((cls) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  {editingId === cls.id ? (
                    /* ── Edit Mode ── */
                    <div className="flex w-full flex-col gap-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                          type="text"
                          value={editClassName}
                          onChange={(e) => setEditClassName(e.target.value)}
                          className="rounded-lg border border-indigo-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100"
                        />
                        <div className="flex flex-wrap gap-2">
                          {DIVISION_OPTIONS.map((div) => (
                            <button
                              key={div}
                              onClick={() => toggleDivision(div, editDivisions, setEditDivisions)}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                                editDivisions.includes(div)
                                  ? "border-indigo-500 bg-indigo-600 text-white"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
                              }`}
                            >
                              {div}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(cls.id)}
                          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                        >
                          <Check size={13} /> Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                          <X size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── View Mode ── */
                    <>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-800">{cls.className}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {cls.divisions.map((div) => (
                            <span
                              key={div}
                              className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700"
                            >
                              Division {div}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => startEdit(cls)}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cls.id, cls.className)}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-500 transition hover:border-rose-200 hover:bg-rose-50"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageClassesPage
