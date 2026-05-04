import AttendanceTrendCard from './AttendanceTrendCard'
import EnrollmentCard from './EnrollmentCard'
import NotificationsPanel from './NotificationsPanel'
import StatsCards from './StatsCards'
import QuickActions from './QuickActions'
import TodaySchedule from './TodaySchedule'
// import DashboardWelcome from './DashboardWelcome'
import TopPerformers from '../ClassPerformance/sections/TopPerformers'

const DashboardOverview = () => {
  return (
    <div className="space-y-6 sm:space-y-8 2xl:space-y-10">
      {/* Welcome Banner */}
      {/* <DashboardWelcome /> */}

      {/* Top Section: Stats */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-12 xl:gap-8">
        {/* Left Column: Primary Content */}
        <div className="lg:col-span-8 space-y-6 xl:space-y-8">
          <AttendanceTrendCard />

          {/* Middle Section: Quick Actions */}
          <QuickActions />

          <div className="grid gap-6 sm:grid-cols-2 xl:gap-8">
            <EnrollmentCard />
            <TodaySchedule />
          </div>
        </div>

        {/* Right Column: Information Feed */}
        <div className="lg:col-span-4 space-y-6 h-full">
          <div className="sticky top-[88px] space-y-6">
            <NotificationsPanel />
            <TopPerformers />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
