import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import PerformanceOverview from "../layouts/ClassPerformance/sections/PerformanceOverview"
import ClassBreakdown from "../layouts/ClassPerformance/sections/ClassBreakdown"
import TopStudents from "../layouts/ClassPerformance/sections/TopStudents"
import PerformanceGraph from "../layouts/ClassPerformance/sections/PerformanceGraph"

// Mock Data Generators
const getMockData = (section) => {
  const isPrimary = section === "primary"
  const isMiddle = section === "middle"

  const baseStudents = isPrimary ? 420 : isMiddle ? 360 : 510
  const baseAttendance = isPrimary ? 94 : isMiddle ? 91 : 89
  const baseScore = isPrimary ? 85 : isMiddle ? 82 : 78

  return {
    overview: {
      totalStudents: baseStudents,
      avgAttendance: baseAttendance,
      avgScore: baseScore,
      atRisk: isPrimary ? 12 : isMiddle ? 18 : 25,
    },
    classes: [
      { name: `Class ${isPrimary ? '1' : isMiddle ? '6' : '9'}`, teacher: isPrimary ? "Mrs. Patel" : "Mr. Gupta", students: Math.floor(baseStudents / 3), attendance: baseAttendance + 1, score: baseScore + 2 },
      { name: `Class ${isPrimary ? '2' : isMiddle ? '7' : '10'}`, teacher: isPrimary ? "Mr. Sharma" : "Mrs. Iyer", students: Math.floor(baseStudents / 3), attendance: baseAttendance - 1, score: baseScore - 1 },
      { name: `Class ${isPrimary ? '3' : isMiddle ? '8' : '11'}`, teacher: isPrimary ? "Ms. Shah" : "Ms. Verma", students: Math.floor(baseStudents / 3), attendance: baseAttendance, score: baseScore + 1 },
    ],
    topStudents: [
      { name: isPrimary ? "Aarav Kumar" : isMiddle ? "Rohan Singh" : "Vikram Das", class: `Class ${isPrimary ? '1' : isMiddle ? '6' : '9'}`, score: baseScore + 12 },
      { name: isPrimary ? "Diya Patel" : isMiddle ? "Sanya Gupta" : "Neha Sharma", class: `Class ${isPrimary ? '2' : isMiddle ? '7' : '10'}`, score: baseScore + 10 },
      { name: isPrimary ? "Krish Shah" : isMiddle ? "Karan Iyer" : "Rahul Verma", class: `Class ${isPrimary ? '3' : isMiddle ? '8' : '11'}`, score: baseScore + 8 },
      { name: isPrimary ? "Ananya Reddy" : isMiddle ? "Priya Desai" : "Kavita Rao", class: `Class ${isPrimary ? '1' : isMiddle ? '6' : '9'}`, score: baseScore + 7 },
    ]
  }
}

const ClassPerformancePage = ({ sectionType }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Title formatter
  const title = sectionType.charAt(0).toUpperCase() + sectionType.slice(1) + " Section"
  const subtitle = sectionType === "primary" ? "Class 1 to 5 performance overview"
    : sectionType === "middle" ? "Class 6 to 8 performance overview"
      : "Class 9 to 12 performance overview"

  useEffect(() => {
    setLoading(true)
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setData(getMockData(sectionType))
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [sectionType])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 bg-white px-6 py-5 sm:px-8 sm:rounded-2xl sm:border sm:shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <motion.div
        key={sectionType} // Retriggers animation on section change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <PerformanceOverview data={data?.overview} loading={loading} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <PerformanceGraph loading={loading} />
          </div>
          <div>
            <TopStudents students={data?.topStudents} loading={loading} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ClassBreakdown classesData={data?.classes} loading={loading} />
          {/* We can add another section here like "Teacher Performance" for this section, or just span ClassBreakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                <span className="text-2xl font-bold">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Improvement Goals</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[200px] mx-auto">Set specific targets for underperforming classes.</p>
              <button className="mt-4 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100">
                Set New Goal
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ClassPerformancePage
