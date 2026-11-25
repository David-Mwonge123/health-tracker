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

function App() {
  const theme = useSelector((state) => state.settings.theme);

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"}>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/meals-water" element={<MealsWater />} />

            <Route path="/mood-journal" element={<MoodJournal />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
