import { useState } from "react";
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

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !time) return;
    dispatch(
      addReminder({ id: Date.now(), title, time, repeat, enabled: true }),
    );
    setTitle("");
    setTime("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Reminders</h1>
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
        {reminders.map((r) => (
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
              className="text-red-500 text-sm font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
