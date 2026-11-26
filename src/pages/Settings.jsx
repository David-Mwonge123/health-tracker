
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearHealthData } from "../app/store";

import {
  updateTheme,
  updateSleepGoal,
} from "../features/settings/settingsSlice";

import { setWaterGoal } from "../features/meals/mealsSlice";

function Settings() {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings);
  const waterGoal = useSelector((state) => state.meals.dailyGoal);

  useEffect(() => {
    document.body.className = settings.theme;
  }, [settings.theme]);

  function handleClearData() {
    const confirmReset = window.confirm(
      "Are you sure you want to clear all your health data? This action cannot be undone.",
    );

    if (confirmReset) {
      dispatch(clearHealthData());
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Settings
      </h2>

      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Appearance
        </h3>

        <select
          value={settings.theme}
          onChange={(event) => dispatch(updateTheme(event.target.value))}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-white text-gray-800 outline-none focus:border-green-600"
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Daily Water Goal (ml)
        </h3>

        <input
          type="number"
          value={waterGoal}
          onChange={(event) =>
            dispatch(setWaterGoal(Number(event.target.value)))
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-800 outline-none focus:border-green-600"
        />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">
          Daily Sleep Goal (hours)
        </h3>

        <input
          type="number"
          value={settings.dailySleepGoal}
          onChange={(event) =>
            dispatch(updateSleepGoal(Number(event.target.value)))
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-800 outline-none focus:border-green-600"
        />
      </div>

      <hr className="border-gray-200 my-6" />

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Clear Data
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Clear all health records and reset your profile and settings
          to their default values.
        </p>

        <button
          onClick={handleClearData}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-600 transition duration-200"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}

export default Settings;
