import { useState } from "react"
import InterviewCard from "../components/InterviewCard"

const tabs = ["All", "Applied", "Shortlisted", "Scheduled", "Completed", "Selected", "Rejected"]

const CandidatePipeline = ({ candidates, onSchedule, onStartInterview }) => {
  const [activeTab, setActiveTab] = useState("All")

  const filteredCandidates = candidates.filter((c) => {
    if (activeTab === "All") return true
    return c.status === activeTab
  })

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 pb-px hide-scrollbar">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <InterviewCard
              key={candidate.id}
              candidate={candidate}
              onSchedule={onSchedule}
              onStartInterview={onStartInterview}
            />
          ))
        ) : (
          <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm font-medium text-slate-500">No candidates found for this status.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidatePipeline
