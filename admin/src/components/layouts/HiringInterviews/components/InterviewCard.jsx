import { Calendar, Clock, Video } from "lucide-react"
import StatusBadge from "./StatusBadge"

const InterviewCard = ({ candidate, onSchedule, onStartInterview }) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600">
            {candidate.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{candidate.name}</h3>
            <p className="text-sm text-slate-500">{candidate.subject} Teacher</p>
          </div>
        </div>
        <StatusBadge status={candidate.status} />
      </div>

      <div className="mb-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
          <span className="text-slate-500">Experience</span>
          <span className="font-semibold text-slate-700">{candidate.experience}</span>
        </div>
        
        {candidate.date && (
          <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <span className="font-medium text-slate-700">{candidate.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <span className="font-medium text-slate-700">{candidate.time}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {candidate.status === "Applied" || candidate.status === "Shortlisted" ? (
          <button
            onClick={() => onSchedule(candidate)}
            className="w-full rounded-xl border border-indigo-200 bg-indigo-50 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100"
          >
            Schedule
          </button>
        ) : candidate.status === "Scheduled" ? (
          <button
            onClick={() => onStartInterview(candidate)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            <Video size={16} />
            Start Interview
          </button>
        ) : (
          <button className="w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
            View Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default InterviewCard
