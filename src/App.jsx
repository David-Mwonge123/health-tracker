import React from "react";
import "./index.css";
import "./App.css";
import { useSelector } from "react-redux";

import Profile from "./components/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Reminders from "./pages/Reminder";
import Sidebar from "./components/Sidebar";
import Workouts from "./pages/Workouts";
import MealsWater from "./components/MealsWater";
import MoodJournal from "./components/MoodJournal";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  return (
    <>
      <div>
        <Sidebar />
        <h1>Health Tracker</h1>

        <Dashboard />
        <hr />

        <div id="habits">
          <Habits />
        </div>
        <hr />

        <div id="goals">
          <Goals />
        </div>
        <hr />

        <div id="reminders">
          <Reminders />
        </div>
        <hr />

        <div id="profile">
          <Profile />
        </div>
        <hr />

        <div id="">
          <Workouts />
        </div>
        <hr />

        <div id="">
          <Settings />
        </div>
        <hr />

        <div id="meals">
          <MealsWater />
        </div>
        <hr />

        <div id="mood">
          <MoodJournal />
        </div>
        <hr />
      </div>
    </>
  );
}

export default App;
