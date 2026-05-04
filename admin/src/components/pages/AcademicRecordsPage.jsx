
import { Download, Plus, FileSpreadsheet, FileText, BookOpen } from "lucide-react"

// Components
import AiInsights from "../layouts/AcademicRecords/AiInsights"
import FiltersBar from "../layouts/AcademicRecords/FiltersBar"
import PerformanceCharts from "../layouts/AcademicRecords/PerformanceCharts"
import ClassSummary from "../layouts/AcademicRecords/ClassSummary"
import StudentDashboard from "../layouts/AcademicRecords/StudentDashboard"
import AlertsAndFlags from "../layouts/AcademicRecords/AlertsAndFlags"
import ExamManagement from "../layouts/AcademicRecords/ExamManagement"

const AcademicRecordsPage = () => {

  return (
    <div className="space-y-8 pb-10">
      {/* 10. Quick Actions & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white/70 backdrop-blur-xl p-6 border border-white/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Academic Records & Performance
          </h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive analysis, reports, and exam management</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all">
            <FileSpreadsheet className="h-4 w-4" />
            Import Excel
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all">
            <Download className="h-4 w-4" />
            Export Data
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all active:scale-95">
            <Plus className="h-4 w-4" />
            Add Marks
          </button>
        </div>
      </div>

      {/* 9. Filters & Search */}
      <FiltersBar />

      {/* 4. AI Insights (Premium Feature) */}
      <AiInsights />

      {/* 8. Alerts & Flags */}
      <AlertsAndFlags />

      {/* 1. Student Academic Dashboard & 2. Class-wise Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <StudentDashboard />
        </div>
        <div>
          <ClassSummary />
        </div>
      </div>

      {/* 3. Performance Graphs */}
      <PerformanceCharts />

      {/* 5. Exam Management & 6. Report Card System & 7. Teacher Performance Link */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamManagement />
        {/* Placeholder for Report Card & Teacher Performance sections inside Exam Management or here */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-slate-800">Report Card System</h3>
               <button className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors">
                 <FileText className="h-3.5 w-3.5" />
                 Generate PDF
               </button>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:border-indigo-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Term 1 Results</p>
                      <p className="text-xs text-slate-500">Includes attendance + marks</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:border-indigo-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Individual Student Reports</p>
                      <p className="text-xs text-slate-500">Detailed subject-wise analysis</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-slate-400 group-hover:text-indigo-600" />
                </div>
             </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-slate-800">Teacher Performance Links</h3>
             </div>
             <div className="space-y-4">
               {[
                 { teacher: "Mrs. Sharma", subject: "Mathematics", rate: "92%", status: "excellent" },
                 { teacher: "Mr. Gupta", subject: "Science", rate: "85%", status: "good" },
                 { teacher: "Ms. Verma", subject: "English", rate: "78%", status: "average" },
               ].map((t, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100">
                   <div className="flex items-center gap-3">
                     <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                       {t.teacher.charAt(4)}
                     </div>
                     <div>
                       <p className="text-sm font-semibold text-slate-800">{t.teacher}</p>
                       <p className="text-xs text-slate-500">{t.subject}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-slate-700">{t.rate}</p>
                     <p className={`text-[10px] font-medium uppercase tracking-wider ${
                        t.status === 'excellent' ? 'text-emerald-500' :
                        t.status === 'good' ? 'text-blue-500' : 'text-amber-500'
                     }`}>Success Rate</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AcademicRecordsPage
