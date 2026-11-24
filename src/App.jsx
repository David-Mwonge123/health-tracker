import React from "react";
import "./index.css";
import "./App.css";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard.jsx";
import Habits from "./pages/Habits.jsx";
import Reminders from "./pages/Reminder.jsx";
import Goals from "./pages/Goals.jsx";
import Profile from "./components/Profile.jsx";
import MealsWater from "./components/MealsWater.jsx";
import MoodJournal from "./components/MoodJournal.jsx";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  return (
    <div className={`app ${theme}`}>
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
      <div id="meals">
        <MealsWater />
      </div>
      <hr />

      <div id="mood">
        <MoodJournal />
      </div>
      <hr />
    </div>
  );
}

export default App;
