import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Users } from 'lucide-react'
import { cn } from '../../../utils'

const attendanceData = [
  { day: 'Mon', present: 548, absent: 52 },
  { day: 'Tue', present: 572, absent: 48 },
  { day: 'Wed', present: 566, absent: 54 },
  { day: 'Thu', present: 584, absent: 46 },
  { day: 'Fri', present: 592, absent: 38 },
  { day: 'Sat', present: 561, absent: 69 },
]

const chartWidth = 720
const chartHeight = 300
const paddingX = 40
const paddingY = 40

const AttendanceTrendCard = () => {
  const [activeIndex, setActiveIndex] = useState(4)
  const { points, pathD, areaD, itemWidth } = useMemo(() => {
    const values = attendanceData.map((item) => item.present)
    const minValue = Math.min(...values) - 10
    const maxValue = Math.max(...values) + 10
    const innerWidth = chartWidth - paddingX * 2
    const innerHeight = chartHeight - paddingY * 2
    const itemWidth = innerWidth / (attendanceData.length - 1)

    const mappedPoints = attendanceData.map((item, index) => {
      const x = paddingX + (index * innerWidth) / (attendanceData.length - 1)
      const y =
        chartHeight -
        paddingY -
        ((item.present - minValue) * innerHeight) / (maxValue - minValue)

      return { x, y }
    })

    let linePath = `M ${mappedPoints[0].x} ${mappedPoints[0].y}`

    for (let i = 0; i < mappedPoints.length - 1; i++) {
      const p0 = mappedPoints[i]
      const p1 = mappedPoints[i + 1]
      const cp1x = p0.x + (p1.x - p0.x) / 2
      const cp1y = p0.y
      const cp2x = p0.x + (p1.x - p0.x) / 2
      const cp2y = p1.y

      linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
    }

    const areaPath = `${linePath} L ${mappedPoints[mappedPoints.length - 1].x
      } ${chartHeight - paddingY} L ${mappedPoints[0].x} ${chartHeight - paddingY
      } Z`

    return {
      points: mappedPoints,
      pathD: linePath,
      areaD: areaPath,
      itemWidth,
    }
  }, [])

  const activePoint = points[activeIndex]
  const activeData = attendanceData[activeIndex]
  const total = activeData.present + activeData.absent
  const attendancePercent = Math.round((activeData.present / total) * 100)

  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Weekly Attendance</h3>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500">Track daily student presence</p>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {attendancePercent}% Avg
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="relative h-[300px] w-full">
          <svg
            className="h-full w-full overflow-visible"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={paddingX}
                y1={paddingY + (i * (chartHeight - paddingY * 2)) / 3}
                x2={chartWidth - paddingX}
                y2={paddingY + (i * (chartHeight - paddingY * 2)) / 3}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}

            <path d={areaD} fill="url(#chartGradient)" />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              d={pathD}
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hover Vertical Line */}
            <line
              x1={activePoint.x}
              y1={paddingY}
              x2={activePoint.x}
              y2={chartHeight - paddingY}
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {points.map((point, index) => (
              <g
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                className="cursor-pointer"
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="white"
                  stroke="#6366f1"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                {index === activeIndex && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="12"
                    fill="#6366f1"
                    fillOpacity="0.1"
                  />
                )}
                {/* Continuous hover area */}
                <rect
                  x={point.x - itemWidth / 2}
                  y={0}
                  width={itemWidth}
                  height={chartHeight}
                  fill="transparent"
                />
              </g>
            ))}
          </svg>

          {/* Tooltip */}
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-200 bg-white p-3 shadow-xl transition-all duration-200"
            style={{
              left: `${(activePoint.x / chartWidth) * 100}%`,
              top: `${(activePoint.y / chartHeight) * 100}%`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5 border-b border-slate-100 pb-1.5">
              <span className="text-xs font-bold text-slate-900">{activeData.day}</span>
              <span className="text-[10px] font-medium text-slate-500">May 24, 2026</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-500">Present</span>
                <span className="text-[10px] font-bold text-indigo-600">{activeData.present}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-500">Absent</span>
                <span className="text-[10px] font-bold text-rose-500">{activeData.absent}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between px-8">
          {attendanceData.map((item, index) => (
            <span
              key={index}
              className={cn(
                "text-[10px] font-bold transition-colors",
                index === activeIndex ? "text-indigo-600" : "text-slate-400"
              )}
            >
              {item.day}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default AttendanceTrendCard
