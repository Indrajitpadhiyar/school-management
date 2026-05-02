import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { cn } from '../../../utils'

const enrollmentData = [
  { label: 'Primary', value: 470, color: '#6366f1' },
  { label: 'Middle', value: 300, color: '#f59e0b' },
  { label: 'Senior', value: 470, color: '#3b82f6' },
]

const EnrollmentCard = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const { totalStudents, segments } = useMemo(() => {
    const total = enrollmentData.reduce((sum, item) => sum + item.value, 0)
    const radius = 58
    const circumference = 2 * Math.PI * radius
    const gap = 4

    let offsetAccumulator = 0
    const mappedSegments = enrollmentData.map((item, index) => {
      const rawLength = (item.value / total) * circumference
      const length = Math.max(rawLength - gap, 8)
      const segment = {
        ...item,
        percentage: Math.round((item.value / total) * 100),
        radius,
        circumference,
        length,
        strokeDashoffset: -offsetAccumulator,
      }
      offsetAccumulator += rawLength
      return { ...segment, index }
    })

    return { totalStudents: total, segments: mappedSegments }
  }, [])

  const activeSegment = segments[activeIndex]

  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 p-5 flex items-center gap-3">
        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
          <GraduationCap size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Student Enrollment</h3>
          <p className="text-xs text-slate-500">Distribution by section</p>
        </div>
      </div>

      <div className="p-5 flex flex-col items-center">
        <div className="relative h-48 w-48 sm:h-56 sm:w-56">
          <svg className="h-full w-full" viewBox="0 0 140 140">
            <g transform="rotate(-90 70 70)">
              {segments.map((segment) => (
                <motion.circle
                  initial={{ strokeDashoffset: segment.circumference }}
                  animate={{ strokeDashoffset: segment.strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  key={segment.label}
                  cx="70"
                  cy="70"
                  r={segment.radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={segment.index === activeIndex ? 22 : 18}
                  strokeDasharray={`${segment.length} ${segment.circumference}`}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActiveIndex(segment.index)}
                />
              ))}
            </g>
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
            <p className="text-3xl font-black text-slate-900 leading-none">{totalStudents}</p>
          </div>
        </div>

        <div className="mt-6 w-full space-y-3">
          {segments.map((segment) => (
            <div 
              key={segment.label}
              onMouseEnter={() => setActiveIndex(segment.index)}
              className={cn(
                "flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-pointer",
                segment.index === activeIndex 
                  ? "border-slate-200 bg-slate-50 shadow-sm" 
                  : "border-transparent hover:bg-slate-50/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-xs font-bold text-slate-700">{segment.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500">{segment.value} Students</span>
                <span className="text-xs font-black text-slate-900">{segment.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default EnrollmentCard
