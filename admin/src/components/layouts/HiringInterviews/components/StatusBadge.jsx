const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case "applied":
        return "bg-slate-100 text-slate-600 border-slate-200"
      case "shortlisted":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "scheduled":
        return "bg-amber-50 text-amber-600 border-amber-200"
      case "completed":
        return "bg-indigo-50 text-indigo-600 border-indigo-200"
      case "selected":
        return "bg-emerald-50 text-emerald-600 border-emerald-200"
      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStyles()}`}>
      {status}
    </span>
  )
}

export default StatusBadge
