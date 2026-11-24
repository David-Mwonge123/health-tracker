
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateTheme,
  updateWaterGoal,
  updateSleepGoal,
  resetSettings,
} from "../features/settings/settingsSlice";

function Settings() {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    document.body.className = settings.theme;
  }, [settings.theme]);

  function handleClearData() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your settings?"
    );

    if (confirmReset) {
      dispatch(resetSettings());
    }
  }

  return (
    <div>
      <h2>Settings</h2>

      <h3>Appearance</h3>

      <select
        value={settings.theme}
        onChange={(event) => dispatch(updateTheme(event.target.value))}
      >
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>

      <h3>Daily Water Goal (ml)</h3>

      <input
        type="number"
        value={settings.dailyWaterGoal}
        onChange={(event) =>
          dispatch(updateWaterGoal(Number(event.target.value)))
        }
      />

      <h3>Daily Sleep Goal (hours)</h3>

      <input
        type="number"
        value={settings.dailySleepGoal}
        onChange={(event) =>
          dispatch(updateSleepGoal(Number(event.target.value)))
        }
      />

      <hr />

      <h3>Clear Data</h3>

      <p>Reset your profile and settings to their default values.</p>

      <button onClick={handleClearData}>
        Reset Settings
      </button>
    </div>
  );
}

export default Settings;
