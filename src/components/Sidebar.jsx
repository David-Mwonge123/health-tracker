import {LayoutDashboard, Dumbbell, Utensils, Moon, BookOpen, Repeat, ChartNoAxesCombined, Bell, User, Target
} from "lucide-react";

function Sidebar() {
  return (
    <>
     <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-5">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-green-100 p-2 rounded-xl">
          <HeartPulse className="text-green-600" size={28} />
        </div>

        <h1 className="text-2xl font-bold text-green-700">HealthTrack</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">

        {/* Overview */}
        <p className="text-xs font-semibold text-gray-400 mb-3">OVERVIEW </p>

        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> <LayoutDashboard size={20} /> Dashboard</Link>

        {/* Daily Wellness */}
        <p className="text-xs font-semibold text-gray-400 mt-6 mb-3">DAILY WELLNESS</p>

        <Link to="/Workouts"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"><Dumbbell size={20} /> Workouts</Link>

        <Link to="/Mealswater" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> <Utensils size={20} />Meals & Water </Link>

        <Link to="/Sleepschedule" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600transition duration-200" >  <Moon size={20} />Sleep schedule</Link>

        <Link to="/Journal"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> <BookOpen size={20} />Journal / Diary</Link>

        <Link to="/Habits"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200" > <Repeat size={20} />Habits</Link>

        {/* Tracking */}
        <p className="text-xs font-semibold text-gray-400 mt-6 mb-3">TRACKING </p>

    
        <Link to="/Progress"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> <ChartNoAxesCombined size={20} />Progress Chart</Link>

        <Link to="/Reminders"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> <Bell size={20} />Reminders </Link>

      </nav>

      {/* Profile */}
      <div className="border-t border-gray-200 pt-5 mt-5">

        <Link to="/Profile"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200">  <User size={20} /> <span>My Profile</span></Link>

      </div>

    </div>
    </>
  )
}

export default Sidebar