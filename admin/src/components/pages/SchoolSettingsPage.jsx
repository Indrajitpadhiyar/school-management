import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Settings,
  Building,
  CreditCard,
  Bell,
  Sliders,
  Palette,
  CheckCircle,
  AlertTriangle,
  Upload,
  Globe,
  Mail,
  Phone,
  Calendar,
  Lock,
  Plus,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Shield,
  Activity,
  Layers,
  Database,
  Moon,
  Sun,
  Eye,
  Info
} from "lucide-react"

// Mock Pricing Tiers
const PRICING_TIERS = [
  {
    name: "Standard Starter",
    price: 4999,
    interval: "month",
    description: "Ideal for small academies and play-schools aiming to digitize operational workflows.",
    features: ["Up to 150 Students", "Standard Class Management", "Basic Fee Invoicing", "Email Notifications", "Standard CSV Data Imports"],
    badge: "Basic",
    color: "slate"
  },
  {
    name: "Professional Grow",
    price: 11999,
    interval: "month",
    description: "Perfect for mid-sized schools looking for deep academics tracking, financials, and automated alert logs.",
    features: ["Up to 600 Students", "Defaulters & Ledger Journals", "Recruitment Pipelines", "Class Performance Analytics", "Automated SMS & Email Alerts", "Academic Goal Tracking"],
    badge: "Popular / Current Plan",
    color: "indigo"
  },
  {
    name: "Enterprise Master",
    price: 24999,
    interval: "month",
    description: "The ultimate school ERP experience. Unlocks unlimited student capacity, AI-insights, payment integration, and branded apps.",
    features: ["Unlimited Students", "AI-Generated Academic Insights", "Razorpay Payment Gateway Integration", "Custom Mobile Apps (Android & iOS)", "Dedicated Support HOD", "Automated WhatsApp Alerts", "Role-Based Custom Permissions"],
    badge: "Highly Recommended",
    color: "violet"
  }
]

const SchoolSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile") // profile, subscription, academic, notifications, preferences
  const [toast, setToast] = useState(null)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [upgradeComplete, setUpgradeComplete] = useState(false)

  // School Profile State
  const [schoolInfo, setSchoolInfo] = useState({
    name: "EduMaster Public School",
    established: "2012",
    board: "CBSE Board",
    registrationId: "REG-2012-9840",
    schoolCode: "SCH-89021",
    email: "contact@edumasterschool.edu.in",
    phone: "+91 98765 43210",
    website: "https://www.edumasterschool.edu.in",
    address: "Sector 14, Educational Zone, New Delhi, India",
    principalName: "Dr. Indrajit Padhiyar"
  })

  // Edit Temp Profile Form State
  const [tempProfile, setTempProfile] = useState({ ...schoolInfo })

  // Active Subscription State
  const [subscription, setSubscription] = useState({
    planName: "Professional Grow",
    status: "Active",
    billed: "Annually (₹1,43,988/year)",
    seatsUsed: 485,
    seatsLimit: 600,
    renewsOn: "2027-05-15",
    paymentGateway: "Integrated",
    remindersSent: 45
  })

  // Academic Configuration State
  const [academicConfig, setAcademicConfig] = useState({
    activeSession: "2026-27",
    activeTerm: "Term 1 (Mid-Term Audits)",
    gradingScale: "Relative Grading (A+ to F Curve)",
    schoolStart: "08:00 AM",
    schoolEnd: "02:30 PM",
    workingDays: "Monday to Friday"
  })

  // Notification Toggles
  const [notificationSettings, setNotificationSettings] = useState({
    emailAttendance: true,
    emailFees: true,
    emailMarks: false,
    smsAttendance: true,
    smsFees: true,
    whatsappFees: true,
    whatsappMarks: true,
    pushHiring: false
  })

  // Theme Settings
  const [themeSettings, setThemeSettings] = useState({
    mode: "light", // light, dark, system
    accentColor: "indigo" // indigo, rose, emerald, amber
  })

  const triggerToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Handle Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault()
    setSchoolInfo(tempProfile)
    triggerToast("School profile configurations successfully saved!", "success")
  }

  // Handle Toggling Notification Preferences
  const handleToggleNotification = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    })
    triggerToast("Notification triggers updated.", "success")
  }

  // Handle Theme Setting Selection
  const handleSelectMode = (mode) => {
    setThemeSettings({ ...themeSettings, mode })
    triggerToast(`Theme preference updated to ${mode} mode!`, "success")
  }

  const handleSelectAccent = (accent) => {
    setThemeSettings({ ...themeSettings, accentColor: accent })
    triggerToast(`Brand accent updated to ${accent}!`, "success")
  }

  // Simulate Upgrade Payment Flow
  const handleUpgradeToEnterprise = () => {
    setIsUpgrading(true)

    // Simulate transaction delay
    setTimeout(() => {
      setIsUpgrading(false)
      setUpgradeComplete(true)

      // Update Subscription State
      setSubscription({
        ...subscription,
        planName: "Enterprise Master",
        billed: "Annually (₹2,99,988/year)",
        seatsLimit: "Unlimited Students",
        remindersSent: 45
      })

      triggerToast("Transaction complete! Welcome to Enterprise Master.", "success")
    }, 2800)
  }

  const formatCurrency = (val) => {
    return "₹" + val.toLocaleString("en-IN")
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed left-1/2 top-5 z-50 flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-xl backdrop-blur-md transition-all ${toast.type === "success"
                ? "border-emerald-200 bg-emerald-50/95 text-emerald-800"
                : "border-rose-200 bg-rose-50/95 text-rose-800"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-emerald-600 animate-bounce" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-600 animate-pulse" />
            )}
            <span className="text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Container */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white/70 backdrop-blur-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-100">
            <Settings className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Global Control Settings
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage licenses, edit school information, academic session rules, and themes</p>
          </div>
        </div>
        <div className="bg-indigo-50/60 border border-indigo-100/50 rounded-xl px-4 py-2 flex items-center gap-3">
          <Shield className="h-5 w-5 text-indigo-600" />
          <div className="text-xs">
            <span className="font-bold text-indigo-950 block">Licence Active</span>
            <span className="text-slate-400 font-semibold">{subscription.planName}</span>
          </div>
        </div>
      </div>

      {/* Main Settings Panel Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-start">
        {/* Left Side-Menu Tab Selectors */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-1.5 lg:col-span-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-3.5 pb-2">Modules Configuration</span>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${activeTab === "profile"
                ? "bg-indigo-50 text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            <Building className="h-4 w-4 shrink-0" />
            School Profile
          </button>

          <button
            onClick={() => setActiveTab("subscription")}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${activeTab === "subscription"
                ? "bg-indigo-50 text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            <span className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 shrink-0" />
              Subscription &amp; Plans
            </span>
            {subscription.planName === "Professional Grow" && (
              <span className="bg-indigo-600 text-white rounded-full text-[9px] px-2 py-0.5 font-bold">Pro</span>
            )}
            {subscription.planName === "Enterprise Master" && (
              <span className="bg-violet-600 text-white rounded-full text-[9px] px-2 py-0.5 font-bold flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5" /> Elite
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("academic")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${activeTab === "academic"
                ? "bg-indigo-50 text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            <Sliders className="h-4 w-4 shrink-0" />
            Academic Sessions
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${activeTab === "notifications"
                ? "bg-indigo-50 text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            <Bell className="h-4 w-4 shrink-0" />
            Alert Channels
          </button>

          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${activeTab === "preferences"
                ? "bg-indigo-50 text-indigo-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
          >
            <Palette className="h-4 w-4 shrink-0" />
            Theme &amp; Accents
          </button>
        </div>

        {/* Right Side Tab Contents Panel */}
        <div className="lg:col-span-3">
          {/* TAB 1: SCHOOL PROFILE */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">School Profile Editor</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Edit registration credentials, official contact channels, and branding metadata</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Building className="h-5 w-5" />
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                {/* Visual School Logo Setup Block */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center border-b border-slate-100 pb-5">
                  <div className="h-16 w-16 bg-slate-150 rounded-xl flex items-center justify-center text-slate-650 font-black text-lg border border-slate-200 shrink-0">
                    {tempProfile.name.split(" ").map(w => w.charAt(0)).join("")}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-1">Official School Seal/Logo</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => triggerToast("Mock Logo upload initiated.", "success")}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5" /> Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerToast("Branding seal cleared.", "alert")}
                        className="px-3 py-1.5 hover:bg-rose-50 text-rose-600 border border-slate-100 hover:border-rose-100 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">School Name</label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Principal Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Principal / Director</label>
                    <input
                      type="text"
                      value={tempProfile.principalName}
                      onChange={(e) => setTempProfile({ ...tempProfile, principalName: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* established Year */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Established Year</label>
                    <input
                      type="number"
                      value={tempProfile.established}
                      onChange={(e) => setTempProfile({ ...tempProfile, established: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Board Affiliation */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Board Affiliation</label>
                    <select
                      value={tempProfile.board}
                      onChange={(e) => setTempProfile({ ...tempProfile, board: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-750 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                    >
                      <option value="CBSE Board">CBSE Board (Delhi, India)</option>
                      <option value="ICSE Board">ICSE Board (CISCE Council)</option>
                      <option value="State Board">State Board Affiliated</option>
                      <option value="IB Board">IB Board (International Baccalaureate)</option>
                    </select>
                  </div>

                  {/* Registration ID */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Registration ID / License</label>
                    <input
                      type="text"
                      value={tempProfile.registrationId}
                      onChange={(e) => setTempProfile({ ...tempProfile, registrationId: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* School Code */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">System School Code</label>
                    <input
                      type="text"
                      value={tempProfile.schoolCode}
                      onChange={(e) => setTempProfile({ ...tempProfile, schoolCode: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Number</label>
                    <input
                      type="text"
                      value={tempProfile.phone}
                      onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Email</label>
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Website */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Website URL</label>
                    <input
                      type="url"
                      value={tempProfile.website}
                      onChange={(e) => setTempProfile({ ...tempProfile, website: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Physical Address */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Physical Address</label>
                    <textarea
                      value={tempProfile.address}
                      onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                      rows={2}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Footer Save Button */}
                <div className="border-t border-slate-100 pt-5 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-sm shadow-md shadow-indigo-100 transition active:scale-95 cursor-pointer"
                  >
                    Save Information
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* TAB 2: SUBSCRIPTION PLANS & LICENSING */}
          {activeTab === "subscription" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Active Plan Detail Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-slate-50 group-hover:scale-110 transition-all duration-300" />

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Licence &amp; Registration Active</span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{subscription.planName} Plan</h3>
                    {subscription.planName === "Enterprise Master" ? (
                      <span className="bg-violet-50 text-violet-700 text-[10px] px-2 py-0.5 rounded-full font-black border border-violet-100 animate-pulse">
                        ELITE ENTERPRISE
                      </span>
                    ) : (
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-black border border-indigo-100">
                        PRO LICENCE
                      </span>
                    )}
                  </div>

                  {/* Parameters */}
                  <div className="pt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">Seats Utilized</span>
                      <span className="font-extrabold text-slate-800">{subscription.seatsUsed} / {subscription.seatsLimit} Seats</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">Annual billing cycles</span>
                      <span className="font-extrabold text-slate-800">{subscription.billed}</span>
                    </div>
                    <div className="col-span-2 pt-1">
                      <span className="text-slate-400 block font-bold text-[10px] uppercase tracking-wider">Next Auto-Renewal Date</span>
                      <span className="font-extrabold text-indigo-700 flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                        {subscription.renewsOn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-4 sm:pt-0">
                  {subscription.planName !== "Enterprise Master" && (
                    <button
                      onClick={() => {
                        const target = document.getElementById("upgrade-pricing-anchor")
                        if (target) target.scrollIntoView({ behavior: "smooth" })
                        triggerToast("Scrolled to premium plans! Select Enterprise tier.", "info")
                      }}
                      className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-100 hover:shadow-lg hover:bg-indigo-700 transition active:scale-95 cursor-pointer"
                    >
                      Upgrade plan
                    </button>
                  )}
                </div>
              </div>

              {/* pricing table list */}
              <div id="upgrade-pricing-anchor" className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Available Licenses Plans</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Choose standard configurations or scale to Enterprise Master with integrated payment gates</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {PRICING_TIERS.map((tier, idx) => {
                    const isActivePlan = subscription.planName === tier.name
                    const isEnterpriseUpgrade = tier.name === "Enterprise Master"

                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border bg-white p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${isActivePlan
                            ? "border-indigo-650 bg-indigo-50/10 shadow-sm"
                            : isEnterpriseUpgrade && !upgradeComplete
                              ? "border-violet-300 shadow-md scale-102 ring-2 ring-violet-100"
                              : "border-slate-200"
                          }`}
                      >
                        {/* Glowing badge */}
                        {isEnterpriseUpgrade && !upgradeComplete && (
                          <div className="absolute right-0 top-0 bg-violet-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
                            <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} /> Recommended
                          </div>
                        )}

                        <div>
                          {/* name & pricing */}
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{tier.badge}</span>
                            <h4 className="text-base font-bold text-slate-900 leading-tight">{tier.name}</h4>
                            <div className="pt-2 flex items-baseline">
                              <span className="text-2xl font-black text-slate-900">{formatCurrency(tier.price)}</span>
                              <span className="text-xs text-slate-500 font-semibold ml-0.5">/{tier.interval}</span>
                            </div>
                          </div>

                          {/* description */}
                          <p className="text-xs text-slate-500 mt-3.5 leading-relaxed">{tier.description}</p>

                          {/* Features */}
                          <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                            {tier.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2 text-xs">
                                <CheckCircle className={`h-4 w-4 shrink-0 ${isActivePlan ? "text-indigo-600" : isEnterpriseUpgrade ? "text-violet-600" : "text-slate-400"
                                  }`} />
                                <span className="font-semibold text-slate-650">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-6">
                          {isActivePlan ? (
                            <button
                              type="button"
                              className="w-full py-2.5 text-center text-xs font-black text-indigo-750 bg-indigo-50 border border-indigo-150 rounded-xl cursor-default"
                            >
                              Current Active Plan
                            </button>
                          ) : isEnterpriseUpgrade ? (
                            <button
                              onClick={handleUpgradeToEnterprise}
                              disabled={isUpgrading}
                              className="w-full py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-xl shadow-md shadow-violet-100 hover:shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-50"
                            >
                              {isUpgrading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Verifying Gateway...
                                </span>
                              ) : (
                                "Upgrade to Elite"
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => triggerToast(`Downgrade/Switch to ${tier.name} requires administrator clearance.`, "alert")}
                              className="w-full py-2.5 text-center text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                            >
                              Switch Plan
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ACADEMIC SESSIONS */}
          {activeTab === "academic" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Academic Session Controls</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Control operational timelines, session sessions, working hours, and grading curbs</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Sliders className="h-5 w-5" />
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Academic Session */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Academic Session</label>
                    <select
                      value={academicConfig.activeSession}
                      onChange={(e) => {
                        setAcademicConfig({ ...academicConfig, activeSession: e.target.value })
                        triggerToast(`Global Session switched to ${e.target.value}`, "success")
                      }}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                    >
                      <option value="2026-27">2026-27 (Current Term)</option>
                      <option value="2027-28">2027-28 (Future Planning)</option>
                    </select>
                  </div>

                  {/* Active Term */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Curriculum Term</label>
                    <select
                      value={academicConfig.activeTerm}
                      onChange={(e) => {
                        setAcademicConfig({ ...academicConfig, activeTerm: e.target.value })
                        triggerToast(`Term switched to ${e.target.value}`, "success")
                      }}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                    >
                      <option value="Term 1 (Mid-Term Audits)">Term 1 (Mid-Term Audits)</option>
                      <option value="Term 2 (Final Evaluations)">Term 2 (Final Evaluations)</option>
                    </select>
                  </div>

                  {/* School Start Timing */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Daily Timing (Arrival)</label>
                    <input
                      type="text"
                      value={academicConfig.schoolStart}
                      onChange={(e) => setAcademicConfig({ ...academicConfig, schoolStart: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                    />
                  </div>

                  {/* School End Timing */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Daily Timing (Departure)</label>
                    <input
                      type="text"
                      value={academicConfig.schoolEnd}
                      onChange={(e) => setAcademicConfig({ ...academicConfig, schoolEnd: e.target.value })}
                      className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-800 font-bold outline-none transition focus:border-indigo-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Info alert block */}
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4 text-amber-800">
                  <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                  <div className="text-xs leading-relaxed space-y-1">
                    <p className="font-bold">Important Audit System Notice</p>
                    <p className="font-semibold text-amber-700">Changing active terms or sessions will immediately recompile class grids, at-risk indices, teacher performance records, and outstanding fee invoices across the system to preserve chronological school data mapping.</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 flex justify-end">
                  <button
                    onClick={() => triggerToast("Timelines successfully synced across grades.", "success")}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition cursor-pointer"
                  >
                    Sync Academic Schedules
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: ALERTS CHANNELS CONFIG */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Communication Alerts Toggles</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Toggle live alerts, SMS gateways, and automated parent messaging triggers</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Bell className="h-5 w-5" />
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  {/* Email Segment */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-1">Email Push triggers</span>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800 block">Student Daily Absenteeism Alert</span>
                          <span className="text-[10px] text-slate-400 font-semibold">Alert parents instantly if student absenteeism exceeds standard limit</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailAttendance}
                          onChange={() => handleToggleNotification("emailAttendance")}
                          className="h-4 w-4 accent-indigo-650 cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800 block">Pending School Fees warning</span>
                          <span className="text-[10px] text-slate-400 font-semibold">Deploy digital billing copies at the beginning of monthly fee slots</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailFees}
                          onChange={() => handleToggleNotification("emailFees")}
                          className="h-4 w-4 accent-indigo-650 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp/SMS segment */}
                  <div className="space-y-2 pt-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b border-slate-100 pb-1">WhatsApp &amp; SMS Gates</span>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800 block">WhatsApp automated Fee Reminders</span>
                          <span className="text-[10px] text-slate-400 font-semibold">Unlocks WhatsApp Business API logs to alert critical defaulters</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.whatsappFees}
                          disabled={subscription.planName !== "Enterprise Master"}
                          onChange={() => handleToggleNotification("whatsappFees")}
                          className="h-4 w-4 accent-violet-600 cursor-pointer disabled:opacity-50"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-800 block">Term 1 Results Dispatch (SMS)</span>
                          <span className="text-[10px] text-slate-400 font-semibold">Standard report grades dispatched via SMS bulk gateway</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.whatsappMarks}
                          onChange={() => handleToggleNotification("whatsappMarks")}
                          className="h-4 w-4 accent-indigo-650 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {subscription.planName !== "Enterprise Master" && (
                  <div className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50/50 p-4 text-violet-850">
                    <Sparkles className="h-5 w-5 text-violet-600 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '6s' }} />
                    <div className="text-xs space-y-1">
                      <p className="font-bold">Unlock WhatsApp Messaging Gates</p>
                      <p className="font-semibold text-violet-750">Automated WhatsApp payment verification notifications require an active **Enterprise Master** license API configuration.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 5: THEME & BRAND PREFERENCES */}
          {activeTab === "preferences" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="border-b border-slate-100 p-5 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Brand Preferences &amp; Themes</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Customize global UI colors and theme configurations for the active school panel</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <Palette className="h-5 w-5" />
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Theme Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sun className="h-3.5 w-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '10s' }} />
                    UI Visual Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", icon: Sun, label: "Light Theme" },
                      { id: "dark", icon: Moon, label: "Dark Shield" },
                      { id: "system", icon: Sliders, label: "Sync System" }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => handleSelectMode(mode.id)}
                        className={`flex flex-col py-3.5 items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${themeSettings.mode === mode.id
                            ? "border-indigo-600 bg-indigo-50/50 text-indigo-750"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/20"
                          }`}
                      >
                        <mode.icon className="h-5 w-5" />
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accents Selector */}
                <div className="space-y-2.5 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Palette className="h-3.5 w-3.5 text-indigo-600" />
                    Brand Primary Accent
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: "indigo", label: "Classic Indigo", color: "bg-indigo-600" },
                      { id: "rose", label: "Sunset Rose", color: "bg-rose-500" },
                      { id: "emerald", label: "Emerald Mint", color: "bg-emerald-600" },
                      { id: "amber", label: "Autumn Amber", color: "bg-amber-500" }
                    ].map((accent) => (
                      <button
                        key={accent.id}
                        type="button"
                        onClick={() => handleSelectAccent(accent.id)}
                        className={`flex py-3 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition cursor-pointer ${themeSettings.accentColor === accent.id
                            ? "border-indigo-600 bg-indigo-50/50 text-indigo-700"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/20"
                          }`}
                      >
                        <span className={`h-3 w-3 rounded-full shrink-0 ${accent.color}`} />
                        {accent.label.split(" ")[1]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SchoolSettingsPage
