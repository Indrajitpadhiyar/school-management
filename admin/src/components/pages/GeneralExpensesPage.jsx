import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Receipt,
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  ChevronRight,
  X,
  FileText,
  User,
  CreditCard,
  AlertTriangle,
  Settings,
  Calendar,
  Building
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts"

// Mock Data
const INITIAL_BUDGETS = [
  { category: "Staff Salaries & Wages", allocated: 800000, spent: 780000, color: "#4f46e5" },
  { category: "Infrastructure & Maintenance", allocated: 300000, spent: 245000, color: "#06b6d4" },
  { category: "Academic Resources & Lab Supplies", allocated: 200000, spent: 175000, color: "#10b981" },
  { category: "Utilities & Operational Bills", allocated: 120000, spent: 112000, color: "#f59e0b" },
  { category: "Campus Events & Activities", allocated: 150000, spent: 98000, color: "#ec4899" },
  { category: "Administrative & Office Supplies", allocated: 80000, spent: 54000, color: "#8b5cf6" }
]

const INITIAL_EXPENSES_LEDGER = [
  { id: "EXP-9082", category: "Staff Salaries & Wages", amount: 450000, date: "2026-05-15", description: "Monthly wages for teaching and non-teaching primary staff", vendor: "Direct Deposit (Payroll)", paymentMethod: "Bank Transfer", status: "Approved" },
  { id: "EXP-9081", category: "Infrastructure & Maintenance", amount: 85000, date: "2026-05-14", description: "Science laboratory ventilation system repairs & wiring", vendor: "Apex Builders Pvt Ltd", paymentMethod: "UPI", status: "Approved" },
  { id: "EXP-9080", category: "Academic Resources & Lab Supplies", amount: 42000, date: "2026-05-12", description: "Standard Grade-10 chemistry and biology reagents textbook lot", vendor: "Royal Scholastic Press", paymentMethod: "Credit Card", status: "Approved" },
  { id: "EXP-9079", category: "Utilities & Operational Bills", amount: 78000, date: "2026-05-10", description: "Central high-tension power grid electricity supply dues", vendor: "State Electricity Board", paymentMethod: "Bank Transfer", status: "Approved" },
  { id: "EXP-9078", category: "Campus Events & Activities", amount: 65000, date: "2026-05-08", description: "Annual intra-school athletics championship stage, trophies & medals", vendor: "Pragati Sports Goods", paymentMethod: "UPI", status: "Approved" },
  { id: "EXP-9077", category: "Staff Salaries & Wages", amount: 330000, date: "2026-05-05", description: "Monthly wages for secondary grades auxiliary faculty & guards", vendor: "Direct Deposit (Payroll)", paymentMethod: "Bank Transfer", status: "Approved" },
  { id: "EXP-9076", category: "Administrative & Office Supplies", amount: 24000, date: "2026-05-03", description: "A4 printing sheets, toner cartridges & general logistics registers", vendor: "Papercraft Stationers", paymentMethod: "Cash", status: "Approved" },
  { id: "EXP-9075", category: "Infrastructure & Maintenance", amount: 160000, date: "2026-05-01", description: "Server room air conditioner replacement & hardware virtualization racks", vendor: "TechCool Solutions", paymentMethod: "Credit Card", status: "Approved" }
]

const INITIAL_PENDING_CLAIMS = [
  { id: "CLM-401", employee: "Mrs. Shruti Sharma", role: "Science HOD", amount: 18500, date: "2026-05-16", category: "Academic Resources & Lab Supplies", reason: "Emergency purchase of physics optics kits & glass prisms", vendor: "Scientific Lab Equipments" },
  { id: "CLM-402", employee: "Mr. Ramesh Gupta", role: "Sports Coordinator", amount: 12000, date: "2026-05-15", category: "Campus Events & Activities", reason: "Booking fees for regional inter-school basketball tournament court", vendor: "District Sports Arena" },
  { id: "CLM-403", employee: "Ms. Neha Verma", role: "Librarian", amount: 8400, date: "2026-05-13", category: "Academic Resources & Lab Supplies", reason: "Special edition reference books & monthly digital archive sub", vendor: "Universal Book Distributors" },
  { id: "CLM-404", employee: "Mr. Jayesh Patel", role: "Estate Manager", amount: 32000, date: "2026-05-11", category: "Infrastructure & Maintenance", reason: "Plumbing backup main pipeline replacement in Senior wing washrooms", vendor: "Modern Sanitary & Pipes" }
]

const MONTHLY_BUDGET_VS_SPENT = [
  { month: "Jan", budget: 1400000, spent: 1280000 },
  { month: "Feb", budget: 1400000, spent: 1350000 },
  { month: "Mar", budget: 1550000, spent: 1490000 },
  { month: "Apr", budget: 1650000, spent: 1610000 },
  { month: "May", budget: 1650000, spent: 1464000 }
]

const GeneralExpensesPage = () => {
  const [activeTab, setActiveTab] = useState("overview") // overview, ledger, claims, budget
  const [budgets, setBudgets] = useState(INITIAL_BUDGETS)
  const [ledger, setLedger] = useState(INITIAL_EXPENSES_LEDGER)
  const [claims, setClaims] = useState(INITIAL_PENDING_CLAIMS)

  // Search & Filters State
  const [searchLedger, setSearchLedger] = useState("")
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All")
  const [selectedMethodFilter, setSelectedMethodFilter] = useState("All")

  // Record Expense Form Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [formCategory, setFormCategory] = useState("Staff Salaries & Wages")
  const [formAmount, setFormAmount] = useState("")
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0])
  const [formDescription, setFormDescription] = useState("")
  const [formVendor, setFormVendor] = useState("")
  const [formMethod, setFormMethod] = useState("Bank Transfer")

  // Toast System
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Calculated Aggregate Values
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0)
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0)
  const remainingBudget = totalAllocated - totalSpent
  const overallSpentPct = ((totalSpent / totalAllocated) * 100).toFixed(1)

  // Filtered Ledger entries
  const filteredLedger = ledger.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchLedger.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchLedger.toLowerCase()) ||
      item.id.toLowerCase().includes(searchLedger.toLowerCase())
    const matchesCategory = selectedCategoryFilter === "All" || item.category === selectedCategoryFilter
    const matchesMethod = selectedMethodFilter === "All" || item.paymentMethod === selectedMethodFilter

    return matchesSearch && matchesCategory && matchesMethod
  })

  // Action Handlers
  const handleRecordExpenseSubmit = () => {
    if (!formAmount || parseFloat(formAmount) <= 0) {
      showToast("Please enter a valid expense amount.", "alert")
      return
    }
    if (!formVendor.trim()) {
      showToast("Please specify the vendor or payee details.", "alert")
      return
    }
    if (!formDescription.trim()) {
      showToast("Please provide a short description.", "alert")
      return
    }

    const amount = parseFloat(formAmount)

    // Deduct/Increase from Budget Allocation category
    const targetBudget = budgets.find((b) => b.category === formCategory)
    if (targetBudget && targetBudget.spent + amount > targetBudget.allocated) {
      showToast(`Warning: This expense exceeds allocated budget for ${formCategory}!`, "alert")
    }

    // Update Category Budget allocation spend state
    const updatedBudgets = budgets.map((b) => {
      if (b.category === formCategory) {
        return { ...b, spent: b.spent + amount }
      }
      return b
    })
    setBudgets(updatedBudgets)

    // Append to Ledger
    const newEntry = {
      id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: formCategory,
      amount: amount,
      date: formDate,
      description: formDescription,
      vendor: formVendor,
      paymentMethod: formMethod,
      status: "Approved"
    }
    setLedger([newEntry, ...ledger])

    // Reset drawer state & close
    setFormAmount("")
    setFormDescription("")
    setFormVendor("")
    setIsDrawerOpen(false)
    showToast(`Successfully recorded expense of ₹${amount.toLocaleString()}!`, "success")
  }

  const handleApproveClaim = (claim) => {
    const amount = claim.amount

    // Update Category Budget allocation spend state
    const updatedBudgets = budgets.map((b) => {
      if (b.category === claim.category) {
        return { ...b, spent: b.spent + amount }
      }
      return b
    })
    setBudgets(updatedBudgets)

    // Append to ledger
    const newEntry = {
      id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      category: claim.category,
      amount: amount,
      date: new Date().toISOString().split("T")[0],
      description: `[REIMBURSEMENT Approved for ${claim.employee}]: ${claim.reason}`,
      vendor: claim.vendor,
      paymentMethod: "Bank Transfer",
      status: "Approved"
    }
    setLedger([newEntry, ...ledger])

    // Delete from pending claims list
    setClaims(claims.filter((c) => c.id !== claim.id))
    showToast(`Claim CLM-401 for ₹${amount.toLocaleString()} approved and logged to ledger!`, "success")
  }

  const handleRejectClaim = (claimId) => {
    setClaims(claims.filter((c) => c.id !== claimId))
    showToast("Reimbursement claim rejected.", "alert")
  }

  const formatCurrency = (val) => {
    return "₹" + val.toLocaleString("en-IN")
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert Popups */}
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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-lg shadow-rose-100">
            <Receipt className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              General Expenses &amp; Budgets
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">Control operational spending, approve reimbursement bills, and configure caps</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => showToast("Exporting ledger. Excel download will start momentarily.", "success")}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-rose-600 transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Export Ledger
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Record Expense
          </button>
        </div>
      </div>

      {/* Expense Health Overview Metric Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Spent */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-slate-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Total Spent This Month</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalSpent)}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="flex items-center gap-0.5 font-semibold text-rose-500">
                <TrendingUp className="h-3 w-3" />
                +6.2%
              </span>
              <span>vs April operational overhead</span>
            </div>
          </div>
        </motion.div>

        {/* Budget Allocation Ratio */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-rose-100 bg-rose-50/10 p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-rose-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Budget Consumed Ratio</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-rose-900">{overallSpentPct}%</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-700">
              <span className="font-bold bg-rose-100 px-2 py-0.5 rounded-full">
                {formatCurrency(remainingBudget)} Remaining
              </span>
              <span>until cap overflow</span>
            </div>
          </div>
        </motion.div>

        {/* Highest Expense Category */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-slate-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Top Cost Driver</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-lg font-bold text-slate-900 leading-tight truncate">Staff Salaries</h3>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>{formatCurrency(780000)} spent</span>
              <span className="font-semibold text-indigo-650 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                53.2% Share
              </span>
            </div>
          </div>
        </motion.div>

        {/* Reimbursement Claims pending */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-amber-100 bg-amber-50/20 p-5 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-amber-50 group-hover:scale-110 transition-transform duration-300" />
          <div className="relative flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">Claims Pending Review</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="relative mt-4">
            <h3 className="text-2xl font-bold text-amber-700">{claims.length} Open Bills</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-amber-600 underline cursor-pointer" onClick={() => setActiveTab("claims")}>
                Requires immediate audit
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Controller */}
      <div className="flex border-b border-slate-200 bg-white p-1.5 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${activeTab === "overview"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
        >
          Overview &amp; Analytics
        </button>
        <button
          onClick={() => setActiveTab("ledger")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${activeTab === "ledger"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
        >
          Expenditure Ledger Directory
        </button>
        <button
          onClick={() => setActiveTab("claims")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${activeTab === "claims"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
        >
          Reimbursements ({claims.length})
        </button>
        <button
          onClick={() => setActiveTab("budget")}
          className={`flex-1 py-3 text-center text-sm font-semibold rounded-lg transition-all cursor-pointer ${activeTab === "budget"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
        >
          Budget Allocations Configuration
        </button>
      </div>

      {/* TAB CONTENT: 1. OVERVIEW & ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Allocation vs Spent Monthly chart */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Budget vs Actual Expenditures (2026)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Dual area flow monitoring standard operational cash flows</p>
                </div>
                <div className="flex gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-slate-200" />
                    <span className="text-slate-600">Budget limit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="text-rose-600">Actual Outflow</span>
                  </div>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_BUDGET_VS_SPENT} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `₹${val / 100000}L`} tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), ""]}
                      contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                    />
                    <Area type="monotone" dataKey="spent" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
                    <Area type="monotone" dataKey="budget" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="4 4" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Allocation pie chart breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-1">Expenditures Distribution</h3>
              <p className="text-xs text-slate-500 mb-6">Percentage breakdown of spent sums per category</p>
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgets}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="spent"
                    >
                      {budgets.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-rose-600">₹14.6L</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Spent Total</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 max-h-36 overflow-y-auto pr-1">
                {budgets.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-slate-600 truncate">{item.category}</span>
                    </div>
                    <span className="font-bold text-slate-800 shrink-0">
                      {((item.spent / totalSpent) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & High Cost Alert */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Quick configuration panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-5">Claims Pipeline Actions</h3>
              <div className="space-y-3.5">
                <div
                  onClick={() => {
                    setActiveTab("claims")
                    showToast("Opening claims manager review.", "success")
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-amber-100 bg-amber-50/20 hover:bg-amber-50/50 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-950">Review Reimbursements</h4>
                      <p className="text-xs text-amber-700">{claims.length} claims waiting audit</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  onClick={() => {
                    setIsDrawerOpen(true)
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-rose-100 bg-rose-50/20 hover:bg-rose-50/50 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-rose-950">Record Single Expense</h4>
                      <p className="text-xs text-rose-700">Quick-log vendor billings</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
                </div>

                <div
                  onClick={() => {
                    setActiveTab("budget")
                    showToast("Configure caps of categories.", "success")
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
                      <Settings className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Budget Controls</h4>
                      <p className="text-xs text-slate-500">Edit allocated category caps</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Recent Expenditures ledger brief */}
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Expenditure Ledger</h3>
                  <p className="text-xs text-slate-500">Historical listing of authorized school purchases</p>
                </div>
                <button
                  onClick={() => setActiveTab("ledger")}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition"
                >
                  View Full Directory
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 pl-2">Bill ID</th>
                      <th className="pb-3">Recipient &amp; Vendor</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right pr-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {ledger.slice(0, 4).map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 pl-2 text-xs font-mono text-slate-500">{item.id}</td>
                        <td className="py-3">
                          <div>
                            <span className="font-bold text-slate-800 block leading-tight truncate max-w-[200px]">{item.description}</span>
                            <span className="text-[11px] text-slate-400 font-semibold">{item.vendor} • {item.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="py-3 text-xs">
                          <span className="inline-flex bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                            {item.category.split(" & ")[0]}
                          </span>
                        </td>
                        <td className="py-3 text-xs text-slate-500 font-semibold">{item.date}</td>
                        <td className="py-3 text-right font-extrabold text-slate-800 pr-2">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. EXPENDITURE LEDGER DIRECTORY */}
      {activeTab === "ledger" && (
        <div className="space-y-6">
          {/* Filters Suite */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Comprehensive Expense Directory Ledger</h3>
                <p className="text-xs text-slate-500 mt-0.5">Audit, filter, and track audited cash outflows and receipt logs</p>
              </div>
              <button
                onClick={() => {
                  setSearchLedger("")
                  setSelectedCategoryFilter("All")
                  setSelectedMethodFilter("All")
                  showToast("Search filters reset", "success")
                }}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition"
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
                  value={searchLedger}
                  onChange={(e) => setSearchLedger(e.target.value)}
                  placeholder="Search description, vendor, ID..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-rose-450 focus:bg-white focus:ring-2 focus:ring-rose-50"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-50"
                >
                  <option value="All">All Categories</option>
                  {budgets.map((b, idx) => (
                    <option key={idx} value={b.category}>{b.category}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Payment Method Filter */}
              <div className="relative">
                <select
                  value={selectedMethodFilter}
                  onChange={(e) => setSelectedMethodFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-slate-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-50"
                >
                  <option value="All">All Payment Channels</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Counter Indicator */}
              <div className="bg-rose-50/50 border border-rose-100/50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-rose-950">Matching Entries</span>
                <span className="bg-rose-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-black">
                  {filteredLedger.length}
                </span>
              </div>
            </div>
          </div>

          {/* Directory Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {filteredLedger.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-350 border border-dashed border-slate-200 mb-4">
                  <Receipt className="h-8 w-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No Expenses Found</h3>
                <p className="text-xs text-slate-500 mt-1">No expenditures match the specific search or filter parameters you selected.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/40 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="py-4 pl-6">Receipt ID</th>
                      <th className="py-4">Transaction description</th>
                      <th className="py-4">Operational Category</th>
                      <th className="py-4">Payment Channel</th>
                      <th className="py-4">Authorized Date</th>
                      <th className="py-4 text-right pr-6">Amount spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <AnimatePresence>
                      {filteredLedger.map((item) => (
                        <motion.tr
                          key={item.id}
                          layout
                          className="hover:bg-slate-50/50 transition duration-150"
                        >
                          {/* Receipt ID */}
                          <td className="py-4 pl-6 text-xs font-mono text-slate-400">{item.id}</td>

                          {/* Description */}
                          <td className="py-4">
                            <div>
                              <span className="font-bold text-slate-900 block leading-tight">{item.description}</span>
                              <span className="text-[11px] text-slate-400 font-semibold">Payee: {item.vendor}</span>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-4 text-xs">
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md font-bold">
                              {item.category}
                            </span>
                          </td>

                          {/* Payment Method */}
                          <td className="py-4 text-xs text-slate-600">
                            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md font-bold">
                              <CreditCard className="h-3 w-3 text-slate-400" />
                              {item.paymentMethod}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-4 text-xs text-slate-500 font-bold">{item.date}</td>

                          {/* Amount */}
                          <td className="py-4 text-right pr-6">
                            <span className="text-sm font-extrabold text-slate-900">{formatCurrency(item.amount)}</span>
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

      {/* TAB CONTENT: 3. REIMBURSEMENT CLAIMS QUEUE */}
      {activeTab === "claims" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900">Employee Reimbursement Audit Pipeline</h3>
              <p className="text-xs text-slate-500 mt-0.5">Audit auxiliary expenditures, verify scientific / academic purchase receipts, and authorize bank drafts</p>
            </div>
            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
              {claims.length} pending reviews
            </span>
          </div>

          {claims.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Clear Pipeline!</h3>
              <p className="text-sm text-slate-500 mt-1">All teacher and auxiliary employee reimbursement claims have been fully audited, approved, and logged.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnimatePresence>
                {claims.map((claim) => (
                  <motion.div
                    key={claim.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Header line */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs flex items-center justify-center">
                            {claim.employee.split(" ").map(w => w.replace(".", "").charAt(0)).join("")}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight">{claim.employee}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{claim.role} • {claim.id}</span>
                          </div>
                        </div>
                        <span className="text-base font-black text-rose-600">{formatCurrency(claim.amount)}</span>
                      </div>

                      {/* Reasons & Vendor */}
                      <div className="mt-4 space-y-2 text-xs">
                        <p className="text-slate-700 font-semibold leading-relaxed">
                          <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">Expenditure description</span>
                          {claim.reason}
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Supplier / Vendor</span>
                            <span className="text-slate-800 font-bold">{claim.vendor}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-bold uppercase tracking-wider text-[9px]">Requested Date</span>
                            <span className="text-slate-850 font-bold flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              {claim.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tag */}
                      <div className="mt-4 pt-3 border-t border-slate-50">
                        <span className="inline-flex bg-slate-100 text-slate-650 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase">
                          {claim.category}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() => handleRejectClaim(claim.id)}
                        className="flex-1 py-2 border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-bold text-slate-600 rounded-xl transition cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApproveClaim(claim)}
                        className="flex-1 py-2 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                      >
                        Authorize &amp; Pay
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 4. BUDGET ALLOCATIONS CONFIGURATION */}
      {activeTab === "budget" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900">Standard Category Budget Allocations</h3>
              <p className="text-xs text-slate-500 mt-0.5">Define, review, and modify annual and monthly expenditure caps across departments</p>
            </div>
            <button
              onClick={() => showToast("Add new budget category form unlocked.", "success")}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Category Cap
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 pl-6">Budget Category</th>
                  <th className="py-4 text-right">Allocated Monthly Cap</th>
                  <th className="py-4 text-right">Utilized Sum</th>
                  <th className="py-4 text-right">Remaining Balance</th>
                  <th className="py-4 text-center">Efficiency Rate</th>
                  <th className="py-4 pr-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {budgets.map((b, idx) => {
                  const pct = ((b.spent / b.allocated) * 100).toFixed(0)
                  const remaining = b.allocated - b.spent

                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-2.5">
                          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                          <span className="font-bold text-slate-800">{b.category}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-slate-800">{formatCurrency(b.allocated)}</td>
                      <td className="py-4 text-right font-semibold text-rose-600">{formatCurrency(b.spent)}</td>
                      <td className="py-4 text-right font-semibold text-slate-600">{formatCurrency(remaining)}</td>
                      <td className="py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-xs font-bold ${parseFloat(pct) > 90 ? "text-rose-600 font-extrabold" : "text-slate-800"}`}>
                            {pct}% Consumed
                          </span>
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{ width: `${pct}%`, backgroundColor: b.color }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-6 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${parseFloat(pct) > 95
                            ? "bg-rose-50 text-rose-700"
                            : parseFloat(pct) > 75
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}>
                          {parseFloat(pct) > 95 ? "Overcap Risk" : parseFloat(pct) > 75 ? "Warning" : "Optimal"}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Expense Modal Drawer (Slide-Out Slider) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Slide-out Panel */}
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
                  <h3 className="text-base font-bold text-slate-900">Record Operational Expense</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Deduct cash flows from standard budgets</p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Category Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-rose-500" />
                    Budget Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-rose-450 focus:bg-white focus:ring-2 focus:ring-rose-50"
                  >
                    {budgets.map((b, idx) => (
                      <option key={idx} value={b.category}>{b.category}</option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-rose-500" />
                    Expense Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-base">₹</span>
                    <input
                      type="number"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      placeholder="e.g. 15000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm font-bold text-slate-800 outline-none transition focus:border-rose-450 focus:bg-white focus:ring-2 focus:ring-rose-50"
                    />
                  </div>
                </div>

                {/* Vendor / Payee Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-rose-500" />
                    Vendor / Payee Details
                  </label>
                  <input
                    type="text"
                    value={formVendor}
                    onChange={(e) => setFormVendor(e.target.value)}
                    placeholder="e.g. Royal Scholastic Press, Apex Builders..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-rose-450 focus:bg-white"
                  />
                </div>

                {/* Date Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-rose-500" />
                    Date Authorized
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-rose-450 focus:bg-white"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-rose-500" />
                    Short Description
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Provide details about materials purchased, maintenance repairs or service descriptions..."
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-700 outline-none transition focus:border-rose-450 focus:bg-white"
                  />
                </div>

                {/* Payment Method Select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-rose-500" />
                    Payment Channel
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["Bank Transfer", "UPI", "Credit Card", "Cash"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setFormMethod(method)}
                        className={`flex py-3 px-4 items-center justify-center rounded-xl border font-bold text-xs transition cursor-pointer ${formMethod === method
                            ? "border-rose-600 bg-rose-50/50 text-rose-700"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50/20"
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
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRecordExpenseSubmit}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-100 hover:shadow-lg hover:shadow-rose-200 transition active:scale-95 cursor-pointer"
                >
                  Confirm Expense
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GeneralExpensesPage