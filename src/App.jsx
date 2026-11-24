import { useSelector } from "react-redux";

import Profile from "./components/Profile";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  return (
    <div className={`app ${theme}`}>
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
    </div>
  );
}

export default App;
