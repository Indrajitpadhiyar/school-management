import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Award, AlertCircle } from "lucide-react"

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Overall Average", value: "78.5%", trend: "+2.4%", isPositive: true, grade: "B+" },
          { title: "Highest Avg", value: "95.2%", trend: "Class 5-A", isPositive: true, grade: "A+" },
          { title: "Lowest Avg", value: "54.1%", trend: "Class 8-C", isPositive: false, grade: "C" },
          { title: "Total Students Evaluated", value: "1,240", trend: "100%", isPositive: true, grade: null },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Glassmorphism accent */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity ${stat.isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              {stat.grade && (
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${stat.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {stat.grade}
                </span>
              )}
            </div>
            <div className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stat.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise marks */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Subject-wise Average</h3>
          <div className="space-y-4">
            {[
              { name: "Mathematics", score: 62, status: "weak" },
              { name: "Science", score: 78, status: "good" },
              { name: "English", score: 85, status: "excellent" },
              { name: "History", score: 71, status: "average" }
            ].map((sub, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700 flex items-center gap-2">
                    {sub.name}
                    {sub.status === 'weak' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                  </span>
                  <span className={`font-bold ${
                    sub.status === 'weak' ? 'text-rose-600' :
                    sub.status === 'excellent' ? 'text-emerald-600' :
                    sub.status === 'good' ? 'text-blue-600' : 'text-amber-600'
                  }`}>{sub.score}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sub.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      sub.status === 'weak' ? 'from-rose-400 to-rose-500' :
                      sub.status === 'excellent' ? 'from-emerald-400 to-emerald-500' :
                      sub.status === 'good' ? 'from-blue-400 to-blue-500' : 'from-amber-400 to-amber-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top & Low Performers */}
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-emerald-500" />
              Top Performers
            </h3>
            <div className="space-y-3">
              {['Aarav Kumar (98%)', 'Diya Patel (97.5%)', 'Rohan Singh (96%)'].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">{i+1}</div>
                  <span className="text-sm font-medium text-slate-700">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              Attention Required
            </h3>
            <div className="space-y-3">
              {['Vikram Das (45%)', 'Neha Sharma (48%)'].map((name, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-rose-50/50 border border-rose-100">
                   <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">!</div>
                   <span className="text-sm font-medium text-slate-700">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
