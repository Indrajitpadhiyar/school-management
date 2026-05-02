import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Wallet,
  Receipt,
  UserPlus,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"

const menuItems = [
  { id: "overview", label: "Admin Overview", icon: LayoutDashboard },
  {
    id: "performance",
    label: "Class Performance",
    icon: Users,
    subItems: [
      { id: "primary", label: "Primary Section" },
      { id: "middle", label: "Middle Section" },
      { id: "senior", label: "Senior Section" },
      { id: "records", label: "Academic Records" },
    ],
  },
  { id: "teachers", label: "Teacher Performance", icon: GraduationCap },
  { id: "fees", label: "School Fees", icon: Wallet },
  { id: "expenses", label: "General Expenses", icon: Receipt },
  { id: "hiring", label: "Hiring & Interviews", icon: UserPlus },
]

const DashboardSidebar = ({ isOpen, setIsOpen, activeSection, setActiveSection }) => {
  const [openMenu, setOpenMenu] = useState("performance")

  const handleMainClick = (item) => {
    setActiveSection(item.id)
    if (item.subItems) {
      setOpenMenu(openMenu === item.id ? "" : item.id)
    }
  }

  const handleSubClick = (subId) => {
    setActiveSection(subId)
    if (window.innerWidth < 1024 && setIsOpen) {
      setIsOpen(false)
    }
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[260px] shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="mb-8 flex items-center gap-3 px-6 py-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <LayoutDashboard size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">EduMaster</h1>
          <p className="text-sm text-slate-500">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 pb-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const hasActiveSubItem = item.subItems?.some(
            (sub) => sub.id === activeSection
          )
          const isMenuOpen = openMenu === item.id

          return (
            <div key={item.id}>
              <button
                onClick={() => handleMainClick(item)}
                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium transition-colors ${
                  isActive || hasActiveSubItem
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={20} className={isActive || hasActiveSubItem ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"} />
                  {item.label}
                </span>

                {item.subItems && (
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                )}
              </button>

              <AnimatePresence>
                {item.subItems && isMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 flex flex-col space-y-1 pl-11 pr-3">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubClick(sub.id)}
                          className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                            activeSection === sub.id
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      <div className="shrink-0 border-t border-slate-100 p-4">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
            <Settings size={20} className="text-slate-400" />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700">
            <LogOut size={20} className="text-rose-400" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar