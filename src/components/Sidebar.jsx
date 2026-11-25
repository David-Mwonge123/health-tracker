import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
      isActive
        ? "bg-green-600 text-white font-bold"
        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-5">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-2xl font-bold text-green-700">HEALTHTRACK</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <p className="text-xs font-semibold text-gray-400 mb-3">OVERVIEW</p>
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <p className="text-xs font-semibold text-gray-400 mt-6 mb-3">
          DAILY WELLNESS
        </p>
        <NavLink to="/workouts" className={linkClass}>
          Workouts
        </NavLink>
        <NavLink to="/meals-water" className={linkClass}>
          Meals & Water
        </NavLink>
        <NavLink to="/sleep" className={linkClass}>
          Sleep Schedule
        </NavLink>
        <NavLink to="/mood" className={linkClass}>
          Journal / Diary
        </NavLink>
        <NavLink to="/habits" className={linkClass}>
          Habits
        </NavLink>
        <NavLink to="/goals" className={linkClass}>
          Goals
        </NavLink>

        <p className="text-xs font-semibold text-gray-400 mt-6 mb-3">
          TRACKING
        </p>
        <NavLink to="/progress" className={linkClass}>
          Progress Chart
        </NavLink>
        <NavLink to="/reminders" className={linkClass}>
          Reminders
        </NavLink>
      </nav>

      {/* Profile */}
      <div className="border-t border-gray-200 pt-5 mt-5">
        <NavLink to="/settings" className={linkClass}>
          <span>My Profile</span>
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
      </div>
      <button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 font-bold transition duration-200 mt-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
