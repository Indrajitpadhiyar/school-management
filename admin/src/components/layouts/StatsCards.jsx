import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '../../utils'

const cards = [
  { 
    title: 'Total Students', 
    value: '1,240', 
    change: '+4.2%', 
    trend: 'up',
    icon: Users,
    color: 'indigo' 
  },
  { 
    title: 'Avg. Performance', 
    value: '88%', 
    change: '+1.1%', 
    trend: 'up',
    icon: TrendingUp,
    color: 'emerald' 
  },
  { 
    title: 'Fees Collected', 
    value: '$42,150', 
    change: '+6.4%', 
    trend: 'up',
    icon: DollarSign,
    color: 'blue' 
  },
  { 
    title: 'Expenses', 
    value: '$12,200', 
    change: '-2.1%', 
    trend: 'down',
    icon: Wallet,
    color: 'rose' 
  },
]

const colorStyles = {
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
  rose: 'bg-rose-50 text-rose-600',
}

const StatsCards = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all hover:shadow-xl hover:border-indigo-100"
          key={card.title}
        >
          <div className="flex items-start justify-between">
            <div className={cn("rounded-2xl p-4 shadow-inner", colorStyles[card.color])}>
              <card.icon size={28} />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-[11px] font-black px-3 py-1.5 rounded-full shadow-sm",
              card.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
              {card.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {card.change}
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{card.title}</p>
            <h3 className="mt-2 text-4xl font-black text-slate-900 tracking-tight">{card.value}</h3>
          </div>

          <div className="absolute -right-6 -bottom-6 opacity-[0.03] rotate-12">
            <card.icon size={120} />
          </div>
        </motion.article>
      ))}
    </section>
  )
}

export default StatsCards
