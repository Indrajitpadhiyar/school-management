import { Trophy, Star } from 'lucide-react'
// import { cn } from '../../../utils'

const performers = [
  { name: 'Sarah Johnson', subject: 'Mathematics', score: 98, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { name: 'Michael Chen', subject: 'Physics', score: 95, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { name: 'Emily Davis', subject: 'English', score: 92, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' }, 
]

const TopPerformers = () => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900">Top Faculty</h3>
        <Trophy className="h-5 w-5 text-amber-500" />
      </div>

      <div className="space-y-4">
        {performers.map((person, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                <img src={person.avatar} alt={person.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{person.name}</p>
                <p className="text-[10px] font-medium text-slate-500">{person.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-slate-900">{person.score}%</span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
        View All Faculty
      </button>
    </article>
  )
}

export default TopPerformers
