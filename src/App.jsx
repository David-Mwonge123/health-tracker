import { useSelector } from "react-redux";

import Profile from "./components/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Reminders from './pages/Reminder';
import Sidebar from "./components/Sidebar";
import Workouts from "./pages/Workouts";






function App() {
  const theme = useSelector((state) => state.settings.theme);

  return (
    <div className={`app ${theme}`}>
         <Sidebar/>
      <h1>Health Tracker</h1>

      <Dashboard />

      <hr />

      <div id="profile">
        <Profile />
      </div>

      <hr />

      <div id="settings">
        <Settings />
      </div>
    <Workouts/>
    </div>
  );
}

export default App;
