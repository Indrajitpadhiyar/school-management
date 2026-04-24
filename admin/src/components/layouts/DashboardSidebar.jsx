import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Wallet, 
  Receipt, 
  UserPlus, 
  Settings, 
  LogOut,
  X,
  School,
  ChevronDown
} from 'lucide-react'
import { cn } from '../../utils'

const menuItems = [
  { id: 'overview', label: 'Admin Overview', icon: LayoutDashboard, active: true },
  { 
    id: 'performance', 
    label: 'Class Performance', 
    icon: Users, 
    active: false,
    subItems: [
      { label: 'Primary Section', active: false },
      { label: 'Middle Section', active: false },
      { label: 'Senior Section', active: false },
      { label: 'Academic Records', active: false },
    ]
  },
  { id: 'teachers', label: 'Teacher Performance', icon: GraduationCap, active: false },
  { id: 'fees', label: 'School Fees', icon: Wallet, active: false },
  { id: 'expenses', label: 'General Expenses', icon: Receipt, active: false },
  { id: 'hiring', label: 'Hiring & Interviews', icon: UserPlus, active: false },
]

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const [expandedItem, setExpandedItem] = useState(null)

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return (
    <>
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[300px] bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">EduMaster</h2>
                <p className="text-xs font-medium text-slate-500">Admin Panel</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 lg:hidden text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
            {menuItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => item.subItems ? toggleExpand(item.id) : null}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group",
                    item.active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    item.active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span>{item.label}</span>
                  
                  {item.subItems ? (
                    <ChevronDown className={cn(
                      "ml-auto h-4 w-4 transition-transform duration-200",
                      expandedItem === item.id ? "rotate-180" : ""
                    )} />
                  ) : (
                    item.active && (
                      <motion.div 
                        layoutId="activeTab"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600"
                      />
                    )
                  )}
                </button>

                {/* Sub-items with animation */}
                <AnimatePresence>
                  {item.subItems && expandedItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-11 space-y-1"
                    >
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.label}
                          className="flex w-full items-center py-2 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="mt-auto pt-6 border-t border-slate-100 shrink-0">
            <div className="space-y-1.5">
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors group">
                <Settings className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors group">
                <LogOut className="h-5 w-5 text-rose-400 group-hover:text-rose-600 transition-colors" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default DashboardSidebar
