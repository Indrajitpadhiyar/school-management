import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const DashboardWelcome = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-8 sm:p-10 lg:p-12 text-white shadow-2xl shadow-indigo-200"
    >
      {/* Decorative Circles */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
            <Sparkles size={14} className="text-yellow-300" />
            <span>Academic Management System v2.0</span>
          </div>
          <h2 className="mt-4 text-3xl font-black md:text-4xl lg:text-5xl leading-tight">
            Welcome back, <br className="sm:hidden" />
            <span className="text-indigo-200">Principal!</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base font-medium text-indigo-100 max-w-xl leading-relaxed opacity-90">
            Everything is running smoothly today. You have <span className="text-white font-bold underline decoration-indigo-300 decoration-2 underline-offset-4">5 approvals</span> pending and a staff meeting in 2 hours.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="h-16 w-px bg-white/10 hidden lg:block" />
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">System Status</p>
            <p className="mt-1 text-xl font-black text-white">All Systems Go</p>
            <div className="mt-2 flex justify-end gap-1">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-1 w-4 rounded-full bg-emerald-400" />)}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default DashboardWelcome
