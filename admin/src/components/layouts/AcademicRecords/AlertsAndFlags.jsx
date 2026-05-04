import { motion } from "framer-motion"
import { AlertOctagon, TrendingDown, UserX } from "lucide-react"

const AlertsAndFlags = () => {
  const alerts = [
    {
      id: 1,
      type: "critical",
      icon: UserX,
      title: "Low Attendance + Low Marks",
      desc: "5 students in Class 8-C have < 60% attendance and failing grades.",
      action: "View Students"
    },
    {
      id: 2,
      type: "warning",
      icon: TrendingDown,
      title: "Continuous Performance Drop",
      desc: "Class 10-B Mathematics average has dropped for 3 consecutive months.",
      action: "Analyze Trend"
    },
    {
      id: 3,
      type: "error",
      icon: AlertOctagon,
      title: "Fail Students List Generated",
      desc: "Term 1 results show 12 students across sections need immediate attention.",
      action: "Download List"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {alerts.map((alert, idx) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm group hover:shadow-md transition-all ${
            alert.type === 'critical' ? 'bg-rose-50 border-rose-100' :
            alert.type === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'
          }`}
        >
          <div className="flex items-start gap-4 relative z-10">
            <div className={`mt-1 p-2 rounded-xl ${
              alert.type === 'critical' ? 'bg-rose-100 text-rose-600' :
              alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
            }`}>
              <alert.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-sm font-bold ${
                alert.type === 'critical' ? 'text-rose-900' :
                alert.type === 'warning' ? 'text-amber-900' : 'text-red-900'
              }`}>{alert.title}</h4>
              <p className={`text-xs mt-1 ${
                alert.type === 'critical' ? 'text-rose-700' :
                alert.type === 'warning' ? 'text-amber-700' : 'text-red-700'
              }`}>{alert.desc}</p>
              <button className={`mt-3 text-xs font-semibold hover:underline ${
                alert.type === 'critical' ? 'text-rose-600' :
                alert.type === 'warning' ? 'text-amber-600' : 'text-red-600'
              }`}>
                {alert.action} →
              </button>
            </div>
          </div>
          {/* subtle background pulse */}
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity ${
            alert.type === 'critical' ? 'bg-rose-400' :
            alert.type === 'warning' ? 'bg-amber-400' : 'bg-red-400'
          }`}></div>
        </motion.div>
      ))}
    </div>
  )
}

export default AlertsAndFlags
