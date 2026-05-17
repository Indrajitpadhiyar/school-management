import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wallet,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Mail,
  Phone,
  Send,
  Plus,
  CreditCard,
  ChevronRight,
  X,
  ArrowUpRight,
  Download,
  Filter,
  DollarSign,
  UserCheck,
  Building,
  Activity,
  Printer,
  ChevronDown
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts"

// Mock Data
const INITIAL_CLASSES_FEES = [
  { id: 1, name: "Class 1", section: "Primary", students: 45, expected: 900000, collected: 810000, pending: 90000, pendingCount: 3, annualFee: 20000 },
  { id: 2, name: "Class 2", section: "Primary", students: 50, expected: 1000000, collected: 850000, pending: 150000, pendingCount: 5, annualFee: 20000 },
  { id: 3, name: "Class 3", section: "Primary", students: 48, expected: 1200000, collected: 1020000, pending: 180000, pendingCount: 6, annualFee: 25000 },
  { id: 4, name: "Class 4", section: "Primary", students: 52, expected: 1300000, collected: 1150000, pending: 150000, pendingCount: 4, annualFee: 25000 },
  { id: 5, name: "Class 5", section: "Primary", students: 45, expected: 1350000, collected: 1080000, pending: 270000, pendingCount: 7, annualFee: 30000 },
  { id: 6, name: "Class 6", section: "Middle", students: 40, expected: 1400000, collected: 1260000, pending: 140000, pendingCount: 3, annualFee: 35000 },
  { id: 7, name: "Class 7", section: "Middle", students: 42, expected: 1470000, collected: 1190000, pending: 280000, pendingCount: 8, annualFee: 35000 },
  { id: 8, name: "Class 8", section: "Middle", students: 46, expected: 1840000, collected: 1560000, pending: 280000, pendingCount: 6, annualFee: 40000 },
  { id: 9, name: "Class 9", section: "Senior", students: 55, expected: 2750000, collected: 2400000, pending: 350000, pendingCount: 5, annualFee: 50000 },
  { id: 10, name: "Class 10", section: "Senior", students: 58, expected: 2900000, collected: 2650000, pending: 250000, pendingCount: 4, annualFee: 50000 },
  { id: 11, name: "Class 11", section: "Senior", students: 60, expected: 3600000, collected: 3100000, pending: 500000, pendingCount: 9, annualFee: 60000 },
  { id: 12, name: "Class 12", section: "Senior", students: 62, expected: 3720000, collected: 3420000, pending: 300000, pendingCount: 5, annualFee: 60000 }
]

const INITIAL_DEFAULTERS = [
  { id: "STU-0891", name: "Aarav K. Patel", rollNo: "08", class: "Class 10", division: "A", parentName: "Kishor Patel", parentPhone: "+91 98765 43210", totalFees: 50000, amountPaid: 35000, amountPending: 15000, dueDate: "2026-04-10", overdueDays: 37, lastReminded: null, severity: "Critical" },
  { id: "STU-1042", name: "Diya R. Sharma", rollNo: "15", class: "Class 12", division: "B", parentName: "Rakesh Sharma", parentPhone: "+91 99234 56789", totalFees: 60000, amountPaid: 40000, amountPending: 20000, dueDate: "2026-04-15", overdueDays: 32, lastReminded: "2026-05-02", severity: "Critical" },
  { id: "STU-1123", name: "Karan S. Gupta", rollNo: "21", class: "Class 11", division: "A", parentName: "Subhash Gupta", parentPhone: "+91 98123 45678", totalFees: 60000, amountPaid: 25000, amountPending: 35000, dueDate: "2026-05-01", overdueDays: 16, lastReminded: null, severity: "Moderate" },
  { id: "STU-0654", name: "Nisha J. Iyer", rollNo: "33", class: "Class 7", division: "C", parentName: "Jayaraman Iyer", parentPhone: "+91 97654 32109", totalFees: 35000, amountPaid: 15000, amountPending: 20000, dueDate: "2026-05-05", overdueDays: 12, lastReminded: "2026-05-12", severity: "Moderate" },
  { id: "STU-0501", name: "Rohan M. Singh", rollNo: "12", class: "Class 5", division: "A", parentName: "Manpreet Singh", parentPhone: "+91 90123 45678", totalFees: 30000, amountPaid: 25000, amountPending: 5000, dueDate: "2026-05-12", overdueDays: 5, lastReminded: null, severity: "Mild" },
  { id: "STU-0789", name: "Ananya H. Shah", rollNo: "02", class: "Class 8", division: "B", parentName: "Harish Shah", parentPhone: "+91 91234 56789", totalFees: 40000, amountPaid: 20000, amountPending: 20000, dueDate: "2026-04-20", overdueDays: 27, lastReminded: "2026-05-05", severity: "Moderate" },
  { id: "STU-0912", name: "Vikram A. Das", rollNo: "44", class: "Class 9", division: "A", parentName: "Anil Das", parentPhone: "+91 92345 67890", totalFees: 50000, amountPaid: 45000, amountPending: 5000, dueDate: "2026-05-14", overdueDays: 3, lastReminded: null, severity: "Mild" },
  { id: "STU-1190", name: "Neha R. Verma", rollNo: "28", class: "Class 11", division: "C", parentName: "Rajesh Verma", parentPhone: "+91 93456 78901", totalFees: 60000, amountPaid: 30000, amountPending: 30000, dueDate: "2026-04-05", overdueDays: 42, lastReminded: "2026-04-25", severity: "Critical" },
  { id: "STU-0311", name: "Priya V. Desai", rollNo: "09", class: "Class 3", division: "D", parentName: "Vijay Desai", parentPhone: "+91 94567 89012", totalFees: 25000, amountPaid: 15000, amountPending: 10000, dueDate: "2026-05-10", overdueDays: 7, lastReminded: null, severity: "Mild" }
]

const INITIAL_TRANSACTIONS = [
  { id: "TXN-98421", studentName: "Rishabh Malhotra", rollNo: "18", class: "Class 10", amount: 25000, paymentMethod: "UPI", date: "2026-05-17", time: "10:14 AM", status: "Successful" },
  { id: "TXN-98420", studentName: "Sanya Roy", rollNo: "41", class: "Class 12", amount: 30000, paymentMethod: "Net Banking", date: "2026-05-17", time: "09:45 AM", status: "Successful" },
  { id: "TXN-98419", studentName: "Aarav K. Patel", rollNo: "08", class: "Class 10", amount: 15000, paymentMethod: "Cash", date: "2026-05-16", time: "04:20 PM", status: "Successful" },
  { id: "TXN-98418", studentName: "Prisha Nair", rollNo: "25", class: "Class 6", amount: 35000, paymentMethod: "Card", date: "2026-05-16", time: "02:10 PM", status: "Successful" },
  { id: "TXN-98417", studentName: "Kabir Mehta", rollNo: "11", class: "Class 8", amount: 20000, paymentMethod: "UPI", date: "2026-05-15", time: "11:30 AM", status: "Successful" },
  { id: "TXN-98416", studentName: "Sneha Rao", rollNo: "30", class: "Class 11", amount: 60000, paymentMethod: "Net Banking", date: "2026-05-15", time: "09:05 AM", status: "Successful" },
  { id: "TXN-98415", studentName: "Rahul Varma", rollNo: "14", class: "Class 9", amount: 25000, paymentMethod: "UPI", date: "2026-05-14", time: "03:40 PM", status: "Failed" }
]

const CATEGORY_BREAKDOWN = [
  { name: "Tuition Fee", value: 16800000, color: "#4f46e5" },
  { name: "Transport Fee", value: 2400000, color: "#06b6d4" },
  { name: "Laboratory Fee", value: 1800000, color: "#10b981" },
  { name: "Sports & Activities", value: 1200000, color: "#f59e0b" },
  { name: "Hostel Fee", value: 2700000, color: "#ec4899" }
]

const MONTHLY_COLLECTIONS = [
  { month: "Jan", expected: 2200000, collected: 2100000 },
  { month: "Feb", expected: 2400000, collected: 2320000 },
  { month: "Mar", expected: 2800000, collected: 2650000 },
  { month: "Apr", expected: 3500000, collected: 3100000 },
  { month: "May", expected: 4000000, collected: 3600000 }
]

const FEE_STRUCTURE_TEMPLATES = [
  { id: 1, type: "Annual Tuition Fee", primary: 20000, middle: 35000, senior: 50000, interval: "Yearly" },
  { id: 2, type: "Computer & Lab Fee", primary: 3000, middle: 5000, senior: 8000, interval: "Yearly" },
  { id: 3, type: "Sports & Club Charges", primary: 2000, middle: 3000, senior: 4000, interval: "Yearly" },
  { id: 4, type: "Standard Transport Fee", primary: 1500, middle: 1500, senior: 1500, interval: "Monthly" },
  { id: 5, type: "Hostel Accommodation", primary: 6000, middle: 6000, senior: 8000, interval: "Monthly" }
]

const SchoolFeesPage = () => {
  const [activeTab, setActiveTab] = useState("overview") // overview, classes, pending, structure
  const [classesData, setClassesData] = useState(INITIAL_CLASSES_FEES)
  const [defaulters, setDefaulters] = useState(INITIAL_DEFAULTERS)
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS)
  const [feeStructures, setFeeStructures] = useState(FEE_STRUCTURE_TEMPLATES)
  
  // Search & Filters State
  const [searchDefaulter, setSearchDefaulter] = useState("")
  const [selectedClassFilter, setSelectedClassFilter] = useState("All")
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState("All")
  
  // Action Modals State
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false)
  const [activeStudent, setActiveStudent] = useState(null)
  const [collectAmount, setCollectAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("UPI")
  
  // Custom Toast State for Framer Motion
  const [toastMessage, setToastMessage] = useState(null)
  const [toastType, setToastType] = useState("success") // success, alert, info

  const triggerToast = (msg, type = "success") => {
    setToastMessage(msg)
    setToastType(type)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Calculate Aggregated Metrics
  const totalExpected = classesData.reduce((acc, c) => acc + c.expected, 0)
  const totalCollected = classesData.reduce((acc, c) => acc + c.collected, 0)
  const totalPending = classesData.reduce((acc, c) => acc + c.pending, 0)
  const collectionRate = ((totalCollected / totalExpected) * 100).toFixed(1)
  const totalPendingStudents = defaulters.length

  // Filtered Defaulters
  const filteredDefaulters = defaulters.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(searchDefaulter.toLowerCase()) ||
      stu.rollNo.includes(searchDefaulter) ||
      stu.id.toLowerCase().includes(searchDefaulter.toLowerCase())
    const matchesClass = selectedClassFilter === "All" || stu.class === selectedClassFilter
    const matchesSeverity = selectedSeverityFilter === "All" || stu.severity === selectedSeverityFilter

    return matchesSearch && matchesClass && matchesSeverity
  })

  // Action Handlers
  const handleSendReminder = (student) => {
    // Simulate sending reminder
    const updated = defaulters.map((s) => {
      if (s.id === student.id) {
        const today = new Date().toISOString().split("T")[0]
        return { ...s, lastReminded: today }
      }
      return s
    })
    setDefaulters(updated)
    triggerToast(`Reminder sent successfully to ${student.name}'s parent (${student.parentPhone})!`, "success")
  }

  const handleOpenCollectModal = (student) => {
    setActiveStudent(student)
    setCollectAmount(student.amountPending)
    setIsCollectModalOpen(true)
  }

  const handleCollectFeesSubmit = () => {
    if (!collectAmount || parseFloat(collectAmount) <= 0) {
      triggerToast("Please enter a valid amount.", "alert")
      return
    }

    const amount = parseFloat(collectAmount)
    if (amount > activeStudent.amountPending) {
      triggerToast(`Amount exceeds outstanding balance of ₹${activeStudent.amountPending.toLocaleString()}`, "alert")
      return
    }

    // Update Defaulters List
    const updatedDefaulters = defaulters.map((s) => {
      if (s.id === activeStudent.id) {
        const remaining = s.amountPending - amount
        return {
          ...s,
          amountPaid: s.amountPaid + amount,
          amountPending: remaining,
          severity: remaining === 0 ? "Paid" : remaining <= 10000 ? "Mild" : remaining <= 30000 ? "Moderate" : "Critical"
        }
      }
      return s
    }).filter((s) => s.amountPending > 0) // Remove if fully paid

    setDefaulters(updatedDefaulters)

    // Update Classes Summary Metrics
    const updatedClasses = classesData.map((c) => {
      if (c.name === activeStudent.class) {
        return {
          ...c,
          collected: c.collected + amount,
          pending: c.pending - amount,
          pendingCount: updatedDefaulters.filter((s) => s.class === c.name).length
        }
      }
      return c
    })
    setClassesData(updatedClasses)

    // Add New Transaction Record
    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: activeStudent.name,
      rollNo: activeStudent.rollNo,
      class: activeStudent.class,
      amount: amount,
      paymentMethod: paymentMethod,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Successful"
    }
    setTransactions([newTxn, ...transactions])

    triggerToast(`Payment of ₹${amount.toLocaleString()} received for ${activeStudent.name}!`, "success")
    setIsCollectModalOpen(false)
    setActiveStudent(null)
  }

  const handleDownloadReport = () => {
    triggerToast("Generating fees report spreadsheet. Download will start automatically.", "info")
  }

  const formatCurrency = (val) => {
    return "₹" + val.toLocaleString("en-IN")
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Dynamic Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed left-1/2 top-5 z-50 flex items-center gap-3 rounded-2xl border px-6 py-4 shadow-xl backdrop-blur-md transition-all ${
              toastType === "success"
                ? "border-emerald-200 bg-emerald-50/95 text-emerald-800"
                : toastType === "alert"
                ? "border-rose-200 bg-rose-50/95 text-rose-800"
                : "border-indigo-200 bg-indigo-50/95 text-indigo-800"
            }`}
          >
            {toastType === "success" && <CheckCircle className="h-5 w-5 text-emerald-600 animate-bounce" />}
            {toastType === "alert" && <AlertTriangle className="h-5 w-5 text-rose-600 animate-pulse" />}
            {toastType === "info" && <Wallet className="h-5 w-5 text-indigo-600 animate-spin" />}
            <span className="text-sm font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white/70 backdrop-blur-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-100">
            <Wallet className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              School Fees & Financials
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage collections, defaulters, classes fee structure, and invoices</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download Summary
          </button>
          <button
            onClick={() => {
              setActiveTab("pending")
              triggerToast("Filters activated. Select a student to log manual payments.", "info")
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Collect Fees
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Expected Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-slate-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Expected Annual Revenue</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalExpected)}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="flex items-center gap-0.5 font-semibold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                +8.4%
              </span>
              <span>vs academic year prior</span>
            </div>
          </div>
        </motion.div>

        {/* Collected Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-indigo-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Fees Collected</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-indigo-900">{formatCurrency(totalCollected)}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-600">
              <span className="font-bold bg-indigo-100 px-2 py-0.5 rounded-full">
                {collectionRate}% Realized
              </span>
              <span>active progress</span>
            </div>
          </div>
        </motion.div>

        {/* Outstanding Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-rose-100 bg-rose-50/30 p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-rose-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Outstanding Balances</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-rose-700">{formatCurrency(totalPending)}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-700">
              <span className="font-semibold">{totalPendingStudents} Students Pending</span>
              <span>across sections</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Widget Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-amber-100 bg-amber-50/20 p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-amber-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Defaulters Ratio</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-slate-900">
              {((totalPendingStudents / classesData.reduce((acc, c) => acc + c.students, 0)) * 100).toFixed(1)}%
            </h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="flex items-center gap-0.5 font-semibold text-rose-500">
                <TrendingDown className="h-3 w-3" />
                -1.2%
              </span>
              <span>overdue risk drop vs April</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Controller */}
      <div className="flex border-b border-slate-200 bg-white p-1.5 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Overview &amp; Analytics
        </button>
        <button
          onClick={() => setActiveTab("classes")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "classes"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Class-wise Fees Status
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "pending"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Defaulters Directory
        </button>
        <button
          onClick={() => setActiveTab("structure")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "structure"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          Fee Structures
        </button>
      </div>

      {/* TAB CONTENT: 1. OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Collection Trend */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Collections Trend (2026)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Monthly breakdown of expected vs collected payments</p>
                </div>
                <div className="flex gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                    <span className="text-slate-600">Expected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-indigo-600" />
                    <span className="text-indigo-600">Collected</span>
                  </div>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_COLLECTIONS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `₹${val/100000}L`} tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), ""]}
                      contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="collected" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
                    <Area type="monotone" dataKey="expected" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Fee Type Distribution</h3>
              <p className="text-xs text-slate-500 mb-6">Allocation of expected annual revenue categories</p>
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_BREAKDOWN}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {CATEGORY_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">₹2.49Cr</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total Allocation</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {CATEGORY_BREAKDOWN.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-800">
                      {((item.value / 24980000) * 100).toFixed(0)}% ({formatCurrency(item.value / 100000)}L)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Transactions */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Quick Actions Panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <h3 className="text-base font-bold text-slate-900 mb-5">Quick Collections Desk</h3>
              <div className="space-y-3">
                <div
                  onClick={() => {
                    setActiveTab("pending")
                    triggerToast("Filter applied: Showing critical defaulters", "info")
                    setSelectedSeverityFilter("Critical")
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-rose-100 bg-rose-50/20 hover:bg-rose-50/50 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-rose-950">Critical Defaulters</h4>
                      <p className="text-xs text-rose-700">Students with &gt;30 days overdue</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  onClick={() => {
                    setActiveTab("classes")
                    triggerToast("Primary section fees details selected", "info")
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-indigo-50 bg-indigo-50/20 hover:bg-indigo-50/50 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-indigo-950">Class-Wise Audits</h4>
                      <p className="text-xs text-indigo-700">Review collected ratio per grade</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  onClick={() => {
                    setActiveTab("structure")
                    triggerToast("Configure structures of primary, middle & senior sections", "info")
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Fee Structures Templates</h4>
                      <p className="text-xs text-slate-500">Configure annual fees schemas</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Recent Payments Feed */}
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Collections Journal</h3>
                  <p className="text-xs text-slate-500">Real-time journal log of standard collections</p>
                </div>
                <button
                  onClick={() => triggerToast("Full ledger export started.", "success")}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export Ledger
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 pl-2">Receipt ID</th>
                      <th className="pb-3">Student / Class</th>
                      <th className="pb-3">Payment Method</th>
                      <th className="pb-3">Time &amp; Date</th>
                      <th className="pb-3 text-right">Amount</th>
                      <th className="pb-3 pr-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {transactions.map((txn, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="py-3.5 pl-2 text-xs font-mono text-slate-500">{txn.id}</td>
                        <td className="py-3.5">
                          <div>
                            <span className="font-bold text-slate-800 block leading-tight">{txn.studentName}</span>
                            <span className="text-[11px] text-slate-400 font-semibold">{txn.class} • Roll {txn.rollNo}</span>
                          </div>
                        </td>
                        <td className="py-3.5 text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                            <CreditCard className="h-3 w-3" />
                            {txn.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 text-xs text-slate-500">
                          <span className="block font-semibold">{txn.date}</span>
                          <span className="text-[10px] text-slate-400">{txn.time}</span>
                        </td>
                        <td className="py-3.5 text-right font-bold text-slate-800">{formatCurrency(txn.amount)}</td>
                        <td className="py-3.5 pr-2 text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                            txn.status === "Successful"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. CLASS-WISE FEES STATUS */}
      {activeTab === "classes" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900">Class Fees Collection Performance</h3>
              <p className="text-xs text-slate-500 mt-0.5">Aggregated metrics detailing target realization rate across classes</p>
            </div>
            <div className="flex flex-wrap gap-3 font-semibold text-xs text-slate-600">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">
                Primary Expected: {formatCurrency(classesData.filter(c => c.section === "Primary").reduce((a,c) => a + c.expected, 0))}
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">
                Middle Expected: {formatCurrency(classesData.filter(c => c.section === "Middle").reduce((a,c) => a + c.expected, 0))}
              </span>
              <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full font-bold">
                Senior Expected: {formatCurrency(classesData.filter(c => c.section === "Senior").reduce((a,c) => a + c.expected, 0))}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {classesData.map((cls) => {
              const collectedPct = ((cls.collected / cls.expected) * 100).toFixed(0)
              
              return (
                <motion.div
                  key={cls.id}
                  whileHover={{ y: -3 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-800">{cls.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cls.section === "Primary"
                            ? "bg-indigo-50 text-indigo-700"
                            : cls.section === "Middle"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-violet-50 text-violet-700"
                        }`}>
                          {cls.section}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">{cls.students} Students</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-semibold mb-1 text-slate-500">
                        <span>Paid Ratio</span>
                        <span className="text-indigo-600 font-bold">{collectedPct}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${collectedPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Monetary Breakdown */}
                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Expected</span>
                        <span className="text-xs font-bold text-slate-800">{formatCurrency(cls.expected / 1000)}K</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-500 font-bold block uppercase tracking-wider">Collected</span>
                        <span className="text-xs font-bold text-slate-800">{formatCurrency(cls.collected / 1000)}K</span>
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold block uppercase tracking-wider ${cls.pending > 0 ? "text-rose-500" : "text-slate-400"}`}>
                          Pending
                        </span>
                        <span className={`text-xs font-bold ${cls.pending > 0 ? "text-rose-600 font-extrabold" : "text-slate-800"}`}>
                          {formatCurrency(cls.pending / 1000)}K
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Defaulters Indicator */}
                  <div className="mt-5 pt-3.5 border-t border-slate-50 flex items-center justify-between text-xs">
                    {cls.pendingCount > 0 ? (
                      <span className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {cls.pendingCount} unpaid students
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle className="h-3.5 w-3.5" />
                        100% Cleared
                      </span>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab("pending")
                        setSelectedClassFilter(cls.name)
                        setSelectedSeverityFilter("All")
                        triggerToast(`Filtered Directory to ${cls.name}`, "info")
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5 transition"
                    >
                      Audit
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. DEFAULTERS DIRECTORY */}
      {activeTab === "pending" && (
        <div className="space-y-6">
          {/* Filters Suite */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Outstanding Balances & Defaulters Registry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Filter, send digital alerts, and record payments for students with unpaid dues</p>
              </div>
              <button
                onClick={() => {
                  setSearchDefaulter("")
                  setSelectedClassFilter("All")
                  setSelectedSeverityFilter("All")
                  triggerToast("Filters successfully reset", "success")
                }}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition flex items-center gap-1"
              >
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchDefaulter}
                  onChange={(e) => setSearchDefaulter(e.target.value)}
                  placeholder="Search student, ID, or Roll..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Class Filter */}
              <div className="relative">
                <select
                  value={selectedClassFilter}
                  onChange={(e) => setSelectedClassFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="All">All Grades</option>
                  {INITIAL_CLASSES_FEES.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Overdue Severity Filter */}
              <div className="relative">
                <select
                  value={selectedSeverityFilter}
                  onChange={(e) => setSelectedSeverityFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="All">All Durations</option>
                  <option value="Critical">Critical (&gt;30 Days)</option>
                  <option value="Moderate">Moderate (15-30 Days)</option>
                  <option value="Mild">Mild (&lt;15 Days)</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Aggregated Selected Metric */}
              <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-950">Matching Defaulters</span>
                <span className="bg-indigo-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-black">
                  {filteredDefaulters.length}
                </span>
              </div>
            </div>
          </div>

          {/* Defaulters Grid Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {filteredDefaulters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 border border-dashed border-slate-200">
                  <UserCheck className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No Defaulters Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">All students under these specific filter criteria are completely paid and up-to-date with fee obligations.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-55/30 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-4 pl-6">Student details</th>
                      <th className="py-4">Parent details</th>
                      <th className="py-4 text-right">Fee structure</th>
                      <th className="py-4 text-right">Outstanding balance</th>
                      <th className="py-4 text-center">Overdue period</th>
                      <th className="py-4 text-center">Last alert sent</th>
                      <th className="py-4 pr-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <AnimatePresence>
                      {filteredDefaulters.map((stu) => (
                        <motion.tr
                          key={stu.id}
                          layout
                          className="hover:bg-slate-50/50 transition duration-150"
                        >
                          {/* Student */}
                          <td className="py-4 pl-6">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-600 font-black text-xs flex items-center justify-center">
                                {stu.name.split(" ").map(w => w.charAt(0)).join("")}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block leading-tight">{stu.name}</span>
                                <span className="text-[11px] text-slate-400 font-semibold">{stu.id} • {stu.class} {stu.division}</span>
                              </div>
                            </div>
                          </td>

                          {/* Parent */}
                          <td className="py-4">
                            <div className="space-y-0.5 text-xs text-slate-500">
                              <p className="font-bold text-slate-700 flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5 text-slate-400" />
                                {stu.parentName}
                              </p>
                              <p className="font-medium text-slate-400 flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5 text-slate-400" />
                                {stu.parentPhone}
                              </p>
                            </div>
                          </td>

                          {/* Total vs Paid */}
                          <td className="py-4 text-right">
                            <div className="text-xs space-y-0.5">
                              <p className="text-slate-400 font-medium">Expected: <span className="text-slate-700 font-bold">{formatCurrency(stu.totalFees)}</span></p>
                              <p className="text-emerald-600 font-bold">Paid: {formatCurrency(stu.amountPaid)}</p>
                            </div>
                          </td>

                          {/* Pending */}
                          <td className="py-4 text-right">
                            <span className="text-sm font-extrabold text-rose-600 block">{formatCurrency(stu.amountPending)}</span>
                          </td>

                          {/* Overdue */}
                          <td className="py-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                stu.severity === "Critical"
                                  ? "bg-rose-50 text-rose-700 border border-rose-100"
                                  : stu.severity === "Moderate"
                                  ? "bg-amber-50 text-amber-700 border border-amber-100"
                                  : "bg-slate-100 text-slate-700"
                              }`}>
                                {stu.severity}
                              </span>
                              <span className="text-[11px] text-slate-400 mt-1 font-semibold">
                                {stu.overdueDays} days overdue
                              </span>
                            </div>
                          </td>

                          {/* Last reminded */}
                          <td className="py-4 text-center text-xs text-slate-500">
                            {stu.lastReminded ? (
                              <span className="inline-flex items-center gap-1 text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                                <Send className="h-3 w-3" />
                                {stu.lastReminded}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">Never</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 pr-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleSendReminder(stu)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-all cursor-pointer"
                                title="Send digital reminder"
                              >
                                <Mail className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleOpenCollectModal(stu)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-xs cursor-pointer"
                              >
                                <CreditCard className="h-3.5 w-3.5" />
                                Record
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. FEE STRUCTURE CONFIGURATION */}
      {activeTab === "structure" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900">Standard Fees Structures Configuration</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage annual and recurring tuition rates and optional charge templates</p>
            </div>
            <button
              onClick={() => triggerToast("Add standard structure form opened.", "info")}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Structure
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 pl-6">Fee Type</th>
                  <th className="py-4">Billing Frequency</th>
                  <th className="py-4 text-right">Primary Section (Grade 1-5)</th>
                  <th className="py-4 text-right">Middle Section (Grade 6-8)</th>
                  <th className="py-4 text-right">Senior Section (Grade 9-12)</th>
                  <th className="py-4 pr-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {feeStructures.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-600" />
                        <span className="font-bold text-slate-800">{fee.type}</span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-slate-500 font-bold">{fee.interval}</td>
                    <td className="py-4 text-right font-semibold text-slate-800">{formatCurrency(fee.primary)}</td>
                    <td className="py-4 text-right font-semibold text-slate-800">{formatCurrency(fee.middle)}</td>
                    <td className="py-4 text-right font-semibold text-slate-800">{formatCurrency(fee.senior)}</td>
                    <td className="py-4 pr-6 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Collect Payment Modal (Slide-Out Slider) */}
      <AnimatePresence>
        {isCollectModalOpen && activeStudent && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCollectModalOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slider Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl border-l border-slate-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Record Fee Collection</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Log transaction details for manual payments</p>
                </div>
                <button
                  onClick={() => setIsCollectModalOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Student Details Summary */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      {activeStudent.name.split(" ").map(w => w.charAt(0)).join("")}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block leading-tight">{activeStudent.name}</span>
                      <span className="text-xs text-slate-500 font-semibold">{activeStudent.id} • {activeStudent.class} {activeStudent.division}</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Total Expected</span>
                      <span className="text-slate-700 font-bold text-sm">{formatCurrency(activeStudent.totalFees)}</span>
                    </div>
                    <div>
                      <span className="text-emerald-500 block font-bold uppercase tracking-wider text-[10px]">Total Paid</span>
                      <span className="text-slate-700 font-bold text-sm">{formatCurrency(activeStudent.amountPaid)}</span>
                    </div>
                  </div>
                </div>

                {/* Amount input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-indigo-600" />
                    Collection Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-base">₹</span>
                    <input
                      type="number"
                      value={collectAmount}
                      onChange={(e) => setCollectAmount(e.target.value)}
                      placeholder="e.g. 15000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm font-bold text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-rose-600 font-bold">Outstanding: {formatCurrency(activeStudent.amountPending)}</span>
                    <button
                      onClick={() => setCollectAmount(activeStudent.amountPending)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold underline"
                    >
                      Collect Max Out
                    </button>
                  </div>
                </div>

                {/* Method picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-indigo-600" />
                    Payment Channel
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["UPI", "Cash", "Net Banking", "Card"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex py-3 px-4 items-center justify-center rounded-xl border font-bold text-xs transition cursor-pointer ${
                          paymentMethod === method
                            ? "border-indigo-600 bg-indigo-50/50 text-indigo-700"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/20"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 p-5 bg-slate-50/50 flex gap-3">
                <button
                  onClick={() => setIsCollectModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCollectFeesSubmit}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700 transition active:scale-95 cursor-pointer"
                >
                  Confirm Payment
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SchoolFeesPage
