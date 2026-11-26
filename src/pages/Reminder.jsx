import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReminder,
  toggleReminder,
  deleteReminder,
} from "../features/reminders/reminderSlice";

export default function Reminders() {
  const reminders = useSelector((state) => state.reminders?.reminders || []);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [repeat, setRepeat] = useState("Daily");

  const [alertReminder, setAlertReminder] = useState(null);
  const [alertedToday, setAlertedToday] = useState([]); // so it doesn't spam

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !time) return;
    dispatch(
      addReminder({ id: Date.now(), title, time, repeat, enabled: true }),
    );
    setTitle("");
    setTime("");
  };

  const sorted = useMemo(() => {
    return [...reminders].sort((a, b) => a.time.localeCompare(b.time));
  }, [reminders]);

  const nextReminder = useMemo(() => {
    const now = new Date().toTimeString().slice(0, 5);
    return sorted.find((r) => r.enabled && r.time >= now) || null;
  }, [sorted]);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      const todayKey = now.toDateString();

      const due = reminders.find(
        (r) =>
          r.enabled &&
          r.time === currentTime &&
          !alertedToday.includes(`${r.id}-${todayKey}`),
      );

      if (due) {
        setAlertReminder(due);
        setAlertedToday((prev) => [...prev, `${due.id}-${todayKey}`]);

        alert(`Reminder: ${due.title} - It's ${due.time}`);
      }
    };

    check();
    const interval = setInterval(check, 30000); // check every 30s
    return () => clearInterval(interval);
  }, [reminders, alertedToday]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Reminders</h1>

      {alertReminder && (
        <div className="bg-green-600 text-white p-4 rounded-xl mb-6 flex items-center justify-between">
          <p className="font-medium">
            It's {alertReminder.time} — {alertReminder.title}
          </p>
          <button
            onClick={() => setAlertReminder(null)}
            className="bg-white text-green-700 px-3 py-1 rounded-lg text-sm font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {nextReminder && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400">UP NEXT</p>
            <p className="font-bold text-gray-800 text-lg">
              {nextReminder.title}
            </p>
            <p className="text-sm text-gray-500">
              {nextReminder.time} • {nextReminder.repeat}
            </p>
          </div>
          <span className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-full text-sm">
            {nextReminder.time}
          </span>
        </div>
      )}

      <form
        onSubmit={handleAdd}
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6 flex flex-col md:flex-row gap-4"
      >
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Reminder e.g. Workout"
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <select
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Once</option>
        </select>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
          Add
        </button>
      </form>

      {reminders.length === 0 && (
        <p className="text-gray-500 text-center bg-white border border-gray-200 rounded-xl p-8">
          No reminders yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sorted.map((r) => (
          <div
            key={r.id}
            className={`bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-3 ${!r.enabled ? "opacity-50" : ""}`}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800">{r.title}</p>
              <p className="text-sm text-gray-500">
                {r.time} • {r.repeat}
              </p>
            </div>
            <button
              onClick={() => dispatch(toggleReminder(r.id))}
              className={`px-3 py-1 rounded-full text-sm font-bold ${r.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
            >
              {r.enabled ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => dispatch(deleteReminder(r.id))}
              className="p-2  text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
