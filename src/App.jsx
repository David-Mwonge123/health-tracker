import React from "react";
import "./index.css";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Reminders from "./pages/Reminder";
import Settings from "./pages/Settings";
import Workouts from "./pages/Workouts";
import MealsWater from "./components/MealsWater";
import MoodJournal from "./components/MoodJournal";
import Profile from "./components/Profile";
import Progress from "./components/progress/Progress";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sleep from "./pages/Sleep";

function Protected({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const theme = useSelector((state) => state.settings.theme);
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"}>
      <div className="flex min-h-screen">
        {!hideSidebar && <Sidebar />}

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
          <Routes>
            {/* Public - no login needed */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected - must be logged in */}
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/workouts"
              element={
                <Protected>
                  <Workouts />
                </Protected>
              }
            />
            <Route
              path="/meals-water"
              element={
                <Protected>
                  <MealsWater />
                </Protected>
              }
            />
            <Route
              path="/sleep"
              element={
                <Protected>
                  <Sleep />
                </Protected>
              }
            />
            <Route
              path="/mood-journal"
              element={
                <Protected>
                  <MoodJournal />
                </Protected>
              }
            />
            <Route
              path="/habits"
              element={
                <Protected>
                  <Habits />
                </Protected>
              }
            />
            <Route
              path="/goals"
              element={
                <Protected>
                  <Goals />
                </Protected>
              }
            />
            <Route
              path="/progress"
              element={
                <Protected>
                  <Progress />
                </Protected>
              }
            />
            <Route
              path="/reminders"
              element={
                <Protected>
                  <Reminders />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/settings"
              element={
                <Protected>
                  <Settings />
                </Protected>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
