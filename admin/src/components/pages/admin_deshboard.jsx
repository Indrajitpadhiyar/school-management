import { useState } from 'react'
import DashboardHeader from '../layouts/DashboardHeader'
import DashboardOverview from '../layouts/DashboardOverview'
import DashboardSidebar from '../layouts/DashboardSidebar'
import { motion, AnimatePresence } from 'framer-motion'

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <main className="min-h-screen w-full bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Sidebar - Sticky on Desktop */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:shrink-0">
          <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        
        <section className="flex-1 flex flex-col min-w-0 min-h-screen">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
          
          <div className="flex-1 p-4 sm:p-6 lg:p-8 2xl:p-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <DashboardOverview />
            </motion.div>
          </div>
        </section>
      </div>
      
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
