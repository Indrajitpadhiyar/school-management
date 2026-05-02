import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MessageSquare, Maximize } from "lucide-react"

const VideoCallPanel = ({ candidate, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 p-4 sm:p-6"
    >
      <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-slate-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-900/50 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">Interview: {candidate.name}</h2>
            <p className="text-sm text-slate-400">{candidate.subject} Teacher Position</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-red-500">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
              <span className="font-mono text-sm font-medium">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-6 relative">
          <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* Main Video (Candidate) */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-700 text-3xl font-bold text-white">
                    {candidate.name.charAt(0)}
                  </div>
                  <p className="text-slate-400">Connecting to video stream...</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-slate-900/80 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                {candidate.name} (Candidate)
              </div>
            </div>

            {/* PIP Video (Interviewer) */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-800">
              <div className="absolute inset-0 flex items-center justify-center">
                {isVideoOff ? (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-700">
                    <VideoOff className="text-slate-400" size={32} />
                  </div>
                ) : (
                  <div className="text-slate-500">Camera Active</div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-slate-900/80 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                You (Principal)
              </div>
              {isMuted && (
                <div className="absolute right-4 top-4 rounded-full bg-red-500 p-1.5 text-white">
                  <MicOff size={14} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 bg-slate-900/80 px-6 py-6 pb-8 backdrop-blur-md">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              isMuted ? "bg-red-500 text-white hover:bg-red-600" : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
              isVideoOff ? "bg-red-500 text-white hover:bg-red-600" : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>
          
          <button
            onClick={() => onEndCall(candidate)}
            className="flex h-14 w-24 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700"
          >
            <PhoneOff size={24} />
          </button>

          <div className="mx-4 h-8 w-px bg-slate-700"></div>
          
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <MessageSquare size={20} />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <Settings size={20} />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white">
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoCallPanel
