import React from "react";
import "./index.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import Progress from "./components/progress/Progress";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const theme = useSelector((state) => state.settings.theme);
  function Protected({ children }) {
    const user = useSelector((state) => state.auth.user);
    if (!user) return <Navigate to="/login" replace />;
    return children;
  }

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"}>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
              path="/settings"
              element={
                <Protected>
                  <Settings />
                </Protected>
              }
            />

            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
