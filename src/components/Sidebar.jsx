import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

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
        <NavLink to="/mood-journal" className={linkClass}>
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

      <div className="border-t border-gray-200 pt-5 mt-5">
        {user ? (
          <>
            <p className="px-4 text-sm text-gray-500 mb-2">Hi, {user.name}</p>
            <NavLink to="/profile" className={linkClass}>
              My Profile
            </NavLink>
            <NavLink to="/settings" className={linkClass}>
              Settings
            </NavLink>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 font-bold transition duration-200 mt-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/signup" className={linkClass}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
