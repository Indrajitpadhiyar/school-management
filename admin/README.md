# 🏫 EduMaster Admin Panel — Professional School Management Workspace

Welcome to the **EduMaster Admin Panel** codebase. This is a state-of-the-art, premium school management dashboard built specifically for school administrators, principals, and financial auditors. It combines high-end visual aesthetics, glassmorphic layout elements, smooth micro-interactions, responsive grids, and real-time state reactivity.

This document serves as the absolute blueprint and operational guide for developers, system architects, and administrators.

---

## 🚀 Technical Architecture & Stack

EduMaster leverages a modern, ultra-fast frontend stack configured for optimal developer experience, smooth rendering, and robust scalability:

*   **Core Framework**: [React 19](https://react.dev/) — Utilizing advanced hooks, reactive states, and highly optimized rendering cycles.
*   **Build Tooling & HMR**: [Vite](https://vite.dev/) — Rapid hot-module replacement for fluid development and lightning-fast asset builds.
*   **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) — Next-generation utility-first styling with `@tailwindcss/vite` integration.
*   **Visual Data Analytics**: [Recharts](https://recharts.org/) — Highly responsive, modular SVG charting library for interactive data plotting.
*   **Micro-Interactions & Transitions**: [Framer Motion](https://www.framer.com/motion/) — Fluid, hardware-accelerated animations for page loads, sidebar toggles, success toast popups, and slider modals.
*   **Standardized Iconography**: [Lucide React](https://lucide.dev/) — Crisp, consistent SVG icons mapped throughout the navigation and page modules.

---

## 📂 Directory Map (`/admin/src`)

The project follows a component-driven, highly modular architecture that segregates view pages from section-specific layout blocks:

```text
admin/
├── public/                     # Static assets & favicon resources
├── src/
│   ├── assets/                 # SVGs, high-res images, and illustrations
│   ├── components/
│   │   ├── layouts/            # Page-specific modular visual blocks
│   │   │   ├── AcademicRecords/# Charts, dashboards, and AI analytics for records
│   │   │   ├── Admin_overview/ # Header summaries, metrics, and global cards
│   │   │   ├── ClassPerformance/# Charts, top student cards, breakdown items
│   │   │   ├── HiringInterviews/# Resume lists, recruiter feedback pipelines
│   │   │   ├── TeacherPerformance/# Grade sheets, syllabus tracking, ratings
│   │   │   └── DashboardSidebar.jsx # Animated main navigation sidebar
│   │   │
│   │   └── pages/              # Core page entry-point views
│   │       ├── AcademicRecordsPage.jsx   # Detailed exam & grade summaries
│   │       ├── admin_deshboard.jsx       # Global page router & layout wrapper
│   │       ├── ClassPerformancePage.jsx  # Primary, Middle & Senior analytics
│   │       ├── HiringInterviewPage.jsx   # Full recruitment funnel tracker
│   │       ├── ManageClassesPage.jsx     # Add & configure grades and divisions
│   │       ├── SchoolFeesPage.jsx        # Premium finance, expected vs collected, defaulters & payments
│   │       └── TeacherPerformancePage.jsx# Professional teacher audits & metrics
│   │
│   ├── App.css                 # Main application visual overrides
│   ├── App.jsx                 # Base component mounting point
│   ├── index.css               # Global Tailwind CSS imports & theme configurations
│   ├── main.jsx                # DOM rendering orchestrator
│   └── utils.js                # Shared core utilities (e.g. 'cn' tailwind-merge helper)
├── index.html                  # HTML entry point (SEO headers & Title configurations)
├── package.json                # Project configurations & dependency declarations
└── vite.config.js              # Vite compiler, React plugin & Tailwind imports
```

---

## 🛠️ Complete Operational Module Reference

### 1. Admin Overview (Main Hub)
*   **Purpose**: The default launchpad dashboard giving administrators a high-level birds-eye view of school operations.
*   **Key Modules**:
    *   Dynamic statistics metrics showing student enrollment, daily average attendance ratios, active hiring pipeline counters, and monthly revenue collection speed.
    *   System warning notices (e.g., severe teacher shortage, high absenteeism in Senior sections).
    *   Overview charts showing total school growth.

### 2. Class Performance Panel (`ClassPerformancePage.jsx`)
*   **Purpose**: Segmented tracking of scholastic and attendance performance across specific student age groups.
*   **Key Modules**:
    *   **Three Section Switches**: Renders dedicated metrics for **Primary (Grade 1-5)**, **Middle (Grade 6-8)**, and **Senior (Grade 9-12)** sections.
    *   **Dynamic Data Generator**: Generates custom statistics (Total Students, At-Risk Counters, Average Scores, and Attendance Rates) based on the section currently selected.
    *   **Performance Graph & Class Breakdown**: Visualizes the grade-by-grade progress to identify underperforming divisions.
    *   **Top Students List**: Highlights students with outstanding achievements per class.
    *   **Improvement Goals Tracker**: Inline targets module to set specific achievement percentages and follow up.

### 3. Academic Records & Analytics (`AcademicRecordsPage.jsx`)
*   **Purpose**: Centralized command center for grade books, assessments, exams management, and student reports.
*   **Key Modules**:
    *   **AI Insights Module**: Premium segment showcasing AI-synthesized suggestions for improvement, identifying classes that need attention.
    *   **Exam Scheduler & Manager**: Set up, reschedule, and track upcoming midterms, finals, and surprise quizzes.
    *   **Report Card Generator**: Export term results, detailed attendance sheets, and individual marks ledgers directly to printable structures.
    *   **Flagging Suite**: Automatic alert triggers flags for students whose grades drop significantly.

### 4. Teacher Performance Workspace (`TeacherPerformancePage.jsx`)
*   **Purpose**: Comprehensive audit tool mapping staff performance, syllabus completion, and classroom feedback.
*   **Key Modules**:
    *   Interactive cards for every teacher listing their subject expertise, average class result rate, and lesson completion ratios.
    *   **Detailed Analytics Modals**: Click on any teacher to open in-depth parameters: student feedback ratings (Clarity, Punctuality, Engagement), monthly syllabus coverage checklists, and professional administrative reviews.

### 5. Add & Manage Classes (`ManageClassesPage.jsx`)
*   **Purpose**: Structured editor to manage grades and assign administrative classroom divisions.
*   **Key Modules**:
    *   **Interactive Division Picker**: Standardized options (`A`, `B`, `C`, `D`, `E`, `F`) mapped to buttons. Click to assign/unassign multiple divisions instantly.
    *   **Inline Editing Mode**: Toggle a class to editable mode, allowing real-time name changes and division adjustments in a clean list format.
    *   **Add / Delete Mechanics**: Adds verification steps to ensure no duplicate classes are created, backed by success toasts.

### 6. School Fees & Financial Center (`SchoolFeesPage.jsx`)
*   **Purpose**: High-end financial management dashboard mapping incoming payments, outstanding balances, and class structures.
*   **Key Modules**:
    *   **Aggregated Financial Overview Cards**: Displays expected revenue, realized collections, outstanding balances, and overall defaulters ratio.
    *   **Monthly Collection Trends Area Chart**: Responsive area chart charting monthly expected payments against actual cash collections.
    *   **Fee Type Distribution Donut Chart**: Breaks down expected revenue by category (Tuition, Transport, Lab, Hostel, and Sports).
    *   **Defaulters Directory**: Robust tabular grid showing students with unpaid balances, parent contact details, and color-coded overdue severity tags.
    *   **Digital Reminder Alerts**: Fires digital warning logs (updating "Last Alert Sent" parameter) with elegant toast messaging.
    *   **Manual Payment Collection Drawer**: Side-sliding transaction form drawer allowing instant logging of student payments, updating outstanding figures globally in real-time.
    *   **Collections Ledger Journal**: Transaction history recording Receipt IDs, Student Profiles, Payment Methods (UPI, Cash, Cards, Net Banking), timestamps, and status badges.
    *   **Fee Structures Configurator**: Annual/recurring fee template configuration dashboard.

### 7. Hiring & Interviews (`HiringInterviewPage.jsx`)
*   **Purpose**: Modern Recruitment Pipeline tracking applications, scheduling interview panels, and logging scorecards.
*   **Key Modules**:
    *   Visual progress board following candidates through stages: **Applied**, **Screening**, **Interview scheduled**, **Offer extended**, and **Hired**.
    *   **Reviewer Scorecard Logs**: Record candidate technical and cultural scores with recommendations.

---

## 💻 Developer Installation & Scripts

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.x or above recommended) installed on your system.

### 🔌 Setup Steps
1. Navigate to the `admin` workspace directory:
   ```bash
   cd d:/SchoolManagement/admin
   ```
2. Install the necessary project dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs with hot-reloading enabled):
   ```bash
   npm run dev
   ```
   *Vite will compile files and spin up a development web server, usually hosted at `http://localhost:5173/`.*

### 🛠️ Core Scripts Available in `package.json`
*   `npm run dev` — Compiles files in memory and launches the hot-reloading dev server.
*   `npm run build` — Compiles and bundles production-ready static assets in the `/dist` directory.
*   `npm run lint` — Performs automated ESLint checks on files to identify syntax errors, unused dependencies, or styling anomalies.
*   `npm run preview` — Launches a local web server serving the compiled `/dist` bundle, allowing developers to test production-like conditions.

---

## 🎨 Design System & Custom Coding Standards

To maintain visual excellence and premium aesthetics, follow these coding guidelines when creating new components:

### 1. Consistent Color System
Ensure all components leverage tailored HSL color systems instead of browser defaults:
*   **Indigo Accent**: `bg-indigo-600` / `text-indigo-700` / `bg-indigo-50` for primary components, active tabs, buttons, and progress meters.
*   **Slate Backgrounds**: `bg-slate-50` / `bg-[#f8fafc]` / `border-slate-200` for cards, inputs, and canvas containers.
*   **Status Indicators**:
    *   🟢 **Success**: `emerald` (`text-emerald-700` / `bg-emerald-50`)
    *   🟡 **Warning**: `amber` (`text-amber-700` / `bg-amber-50`)
    *   🔴 **Danger/Alert**: `rose` (`text-rose-700` / `bg-rose-50`)

### 2. Micro-Animations with Framer Motion
Every panel entry, tab-switch, toast, and modal should be wrapped with Framer Motion components to feel premium and alive:
*   **Tab Transitions**:
    ```jsx
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Component content */}
    </motion.div>
    ```
*   **Toasts**: Use `AnimatePresence` to cleanly animate toasts in and out on success events.

### 3. Clean CSS Class Merging
Avoid inline styling. When toggling states or dynamically merging utility classes, always leverage the `cn` helper defined in `utils.js` to prevent Tailwind class conflicts.
*   **Usage**:
    ```javascript
    import { cn } from "../../utils"
    
    const Button = ({ isActive }) => (
      <button className={cn("px-4 py-2 rounded-xl transition", isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600")} />
    )
    ```

### 4. Interactive State Mocking
Until full API integration with the MongoDB/NodeJS backend is established:
*   Maintain comprehensive local react state mocks (using `useState`).
*   Ensure that CRUD operations (e.g. adding a class, deleting a class, recording a fee payment) update the local state arrays, allowing testers to experience full visual reactivity.

---

## 📝 License & Contributions
This admin panel is a private property. Contact the **EduMaster School Administration Board** for security clearance and database keys before attempting production deployments.
