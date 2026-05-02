import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"

import InterviewOverview from "../layouts/HiringInterviews/sections/InterviewOverview"
import CandidatePipeline from "../layouts/HiringInterviews/sections/CandidatePipeline"
import ScheduleModal from "../layouts/HiringInterviews/components/ScheduleModal"
import VideoCallPanel from "../layouts/HiringInterviews/components/VideoCallPanel"

// Dummy data
const initialCandidates = [
  { id: 1, name: "Sarah Jenkins", subject: "Mathematics", experience: "5 Years", status: "Applied" },
  { id: 2, name: "Michael Chang", subject: "Physics", experience: "8 Years", status: "Shortlisted" },
  { id: 3, name: "Emily Watson", subject: "English", experience: "3 Years", status: "Scheduled", date: "2026-05-10", time: "10:00 AM", interviewer: "Principal (Self)" },
  { id: 4, name: "David Miller", subject: "History", experience: "12 Years", status: "Completed", date: "2026-05-01", time: "14:30 PM", interviewer: "HOD Humanities" },
  { id: 5, name: "Jessica Alba", subject: "Biology", experience: "6 Years", status: "Selected" },
  { id: 6, name: "Robert Fox", subject: "Chemistry", experience: "2 Years", status: "Rejected" },
  { id: 7, name: "Anita Desai", subject: "Computer Science", experience: "7 Years", status: "Applied" },
  { id: 8, name: "John Smith", subject: "Physical Education", experience: "4 Years", status: "Scheduled", date: "2026-05-12", time: "11:00 AM", interviewer: "Principal (Self)" },
]

const HiringInterviewPage = () => {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [activeCallCandidate, setActiveCallCandidate] = useState(null)

  // Computed stats
  const stats = useMemo(() => {
    return {
      total: candidates.length,
      scheduled: candidates.filter((c) => c.status === "Scheduled").length,
      pending: candidates.filter((c) => c.status === "Applied" || c.status === "Shortlisted").length,
      completed: candidates.filter((c) => c.status === "Completed" || c.status === "Selected" || c.status === "Rejected").length,
    }
  }, [candidates])

  const handleOpenScheduleModal = (candidate) => {
    setSelectedCandidate(candidate)
    setIsScheduleModalOpen(true)
  }

  const handleConfirmSchedule = (updatedCandidate) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
    )
    setIsScheduleModalOpen(false)
    setSelectedCandidate(null)
  }

  const handleStartInterview = (candidate) => {
    setActiveCallCandidate(candidate)
  }

  const handleEndCall = (candidate) => {
    // Optionally move status to Completed
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidate.id ? { ...c, status: "Completed" } : c))
    )
    setActiveCallCandidate(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:rounded-2xl sm:border sm:shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hiring Interviews</h1>
          <p className="text-sm text-slate-500">Manage and conduct teacher interviews</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700">
          <Plus size={18} />
          New Application
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <InterviewOverview stats={stats} />

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <CandidatePipeline
            candidates={candidates}
            onSchedule={handleOpenScheduleModal}
            onStartInterview={handleStartInterview}
          />
        </div>
      </motion.div>

      {/* Modals & Overlays */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        candidate={selectedCandidate}
        onConfirm={handleConfirmSchedule}
      />

      {activeCallCandidate && (
        <VideoCallPanel
          candidate={activeCallCandidate}
          onEndCall={handleEndCall}
        />
      )}
    </div>
  )
}

export default HiringInterviewPage
