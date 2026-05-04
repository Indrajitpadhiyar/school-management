import { motion } from "framer-motion"
import { Sparkles, TrendingUp, AlertTriangle, Award } from "lucide-react"

const AiInsights = () => {
  const insights = [
    {
      type: "alert",
      icon: AlertTriangle,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "Most students in Class 8 are weak in Mathematics (Avg 62%).",
    },
    {
      type: "trend",
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "Class 5 performance improved by 12% this month.",
    },
    {
      type: "success",
      icon: Award,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "Mr. Gupta's Science classes have the highest success rate (94%).",
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-6 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles className="w-24 h-24 text-indigo-600" />
      </div>

      {/* <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-indigo-900">AI Performance Insights</h2>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-start gap-3 p-4 rounded-xl border ${insight.bg} ${insight.border}`}
          >
            <div className={`mt-0.5 p-1.5 rounded-full bg-white shadow-sm ${insight.color}`}>
              <insight.icon className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">
              {insight.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default AiInsights
