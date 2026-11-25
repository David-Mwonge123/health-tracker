
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
     <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-5">

     {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        
        <h1 className="text-2xl font-bold text-green-700"> HEALTHTRACK</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">

        {/* Overview */}
        <p className="text-xs font-semibold text-gray-400 mb-3">OVERVIEW! </p>

        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200">  Dashboard</Link>

        {/* Daily Wellness */}
        <p className="text-xs font-semibold text-gray-400 mt-6 mb-3">DAILY WELLNESS!</p>

        <Link to="/Workouts"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> Workouts</Link>

        <Link to="/Mealswater" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> Meals & Water </Link>

        <Link to="/Sleepschedule" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600transition duration-200" >  Sleep schedule</Link>

        <Link to="/Journal"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200"> Journal / Diary</Link>

        <Link to="/Habits"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200" >Habits</Link>

        {/* Tracking */}
        <p className="text-xs font-semibold text-gray-400 mt-6 mb-3">TRACKING! </p>

    
        <Link to="/Progress"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200">Progress Chart</Link>

        <Link to="/Reminders"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200">  Reminders </Link>

      </nav>

      {/* Profile */}
      <div className="border-t border-gray-200 pt-5 mt-5">

        <Link to="/Profile"  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition duration-200">   <span>My Profile</span></Link>

      </div>

    </div>
    </>
  )
}

export default Sidebar