import { motion } from "framer-motion"
import { Users, UserCheck, TrendingUp, Award, BookOpen, Star } from "lucide-react"
import { teachersData } from "./teacherData"

const TeacherStatsCards = () => {
  const total = teachersData.length
  const active = teachersData.filter(t => t.attendance >= 80).length
  const avgAtt = Math.round(teachersData.reduce((a, b) => a + b.attendance, 0) / total)
  const top = [...teachersData].sort((a, b) => b.resultPct - a.resultPct)[0]
  const totalClasses = teachersData.reduce((a, b) => a + b.classesMonth, 0)
  const avgRating = (teachersData.reduce((a, b) => a + b.rating, 0) / total).toFixed(1)

  const cards = [
    { label: "Total Teachers", value: total, sub: "+2 this term", icon: Users, grad: "from-indigo-500 to-blue-600", light: "bg-indigo-50", iconColor: "text-indigo-600", border: "border-indigo-100", positive: true },
    { label: "Active Teachers", value: active, sub: `${Math.round((active/total)*100)}% active rate`, icon: UserCheck, grad: "from-emerald-500 to-teal-600", light: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-emerald-100", positive: true },
    { label: "Avg Attendance", value: `${avgAtt}%`, sub: "+3% vs last month", icon: TrendingUp, grad: "from-blue-500 to-cyan-600", light: "bg-blue-50", iconColor: "text-blue-600", border: "border-blue-100", positive: true },
    { label: "Top Teacher", value: top.name.split(" ").map((w, i) => i === 1 ? w[0] + "." : w).join(" "), sub: `${top.resultPct}% result rate`, icon: Award, grad: "from-amber-500 to-orange-500", light: "bg-amber-50", iconColor: "text-amber-600", border: "border-amber-100", positive: true },
    { label: "Classes This Month", value: totalClasses, sub: "Avg 20 per teacher", icon: BookOpen, grad: "from-violet-500 to-purple-600", light: "bg-violet-50", iconColor: "text-violet-600", border: "border-violet-100", positive: true },
    { label: "Avg Student Rating", value: `${avgRating} ⭐`, sub: "Out of 5.0", icon: Star, grad: "from-rose-500 to-pink-500", light: "bg-rose-50", iconColor: "text-rose-600", border: "border-rose-100", positive: true },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className={`relative rounded-2xl bg-white border ${c.border} p-5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.grad} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.light} mb-3`}>
              <Icon className={`h-5 w-5 ${c.iconColor}`} />
            </div>
            <p className="text-xs font-medium text-slate-500 mb-1 truncate">{c.label}</p>
            <p className="text-xl font-bold text-slate-900 truncate">{c.value}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1 truncate">{c.sub}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TeacherStatsCards
