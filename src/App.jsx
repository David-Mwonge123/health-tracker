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
    <>
    <div >
         <Sidebar/>
      <h1>Health Tracker</h1>

      <Dashboard />
      <Workouts/>
        <Profile />
        <Settings />
        <Habits/>
        <Reminders/>

    
    </div>
    </>
    
  );
}

export default App;
