import { useState } from 'react'
import DashboardHeader from '../layouts/Admin_overview/DashboardHeader'
import DashboardOverview from '../layouts/Admin_overview/DashboardOverview'
import DashboardSidebar from '../layouts/DashboardSidebar'
import ClassPerformancePage from './ClassPerformancePage'
import HiringInterviewPage from './HiringInterviewPage'
import AcademicRecordsPage from './AcademicRecordsPage'
import TeacherPerformancePage from './TeacherPerformancePage'
import { motion, AnimatePresence } from 'framer-motion'

const PlaceholderPage = ({ title }) => (
  <div className="p-6">
    <div className="flex h-[60vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="mt-2 text-slate-500">This section is currently under development.</p>
    </div>
  </div>
)

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "primary":
      case "middle":
      case "senior":
        return <ClassPerformancePage sectionType={activeSection} />
      case "records":
        return <AcademicRecordsPage />
      case "teachers":
        return <TeacherPerformancePage />
      case "fees":
        return <PlaceholderPage title="School Fees" />
      case "expenses":
        return <PlaceholderPage title="General Expenses" />
      case "hiring":
        return <HiringInterviewPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* Sidebar - Fixed/Flex on Desktop */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <section className="flex flex-1 flex-col min-w-0 overflow-y-auto">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 2xl:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection === "primary" || activeSection === "middle" || activeSection === "senior" ? "class-performance" : activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default AdminDashboard
