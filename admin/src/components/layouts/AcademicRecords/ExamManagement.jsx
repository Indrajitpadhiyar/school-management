import { UploadCloud, FileText, CheckCircle, Clock } from "lucide-react"

const ExamManagement = () => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Exam Management</h3>
        <button className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <UploadCloud className="h-3.5 w-3.5" />
          Upload Marks
        </button>
      </div>

      <div className="space-y-6">
        {/* Upcoming Exams */}
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Upcoming Exams</h4>
          <div className="space-y-3">
            {[
              { name: "Mid-Term Mathematics", date: "Oct 15, 2026", class: "Class 5 to 8" },
              { name: "Science Practical", date: "Oct 18, 2026", class: "Class 9 & 10" },
            ].map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:border-indigo-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{exam.name}</p>
                    <p className="text-xs text-slate-500">{exam.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{exam.date}</p>
                  <p className="text-[10px] font-medium text-indigo-500 uppercase tracking-wider">Scheduled</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Exam Results */}
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Results Published</h4>
          <div className="space-y-3">
            {[
              { name: "Unit Test 1 - English", date: "Sep 28, 2026", status: "Published" },
              { name: "Monthly Assessment", date: "Sep 15, 2026", status: "Published" },
            ].map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{exam.name}</p>
                    <p className="text-xs text-slate-500">Result Date: {exam.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <FileText className="h-3.5 w-3.5" />
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamManagement
