import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReminder,
  toggleReminder,
  deleteReminder,
} from "../features/reminders/reminderSlice";

export default function Reminders() {
  const reminders = useSelector((state) => state.reminders.reminders);
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
        <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
          Add
        </button>
      </form>

      {reminders.length === 0 && (
        <p className="text-gray-500 text-center bg-white border border-gray-200 rounded-xl p-8">
          No reminders yet.
        </p>
      )}

      {reminders.map((r) => (
        <div
          key={r.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <span className="text-gray-800 font-medium">
            {r.title} - {r.time} ({r.repeat})
          </span>
          <button onClick={() => dispatch(toggleReminder(r.id))}>
            {r.enabled ? "ON" : "OFF"}
          </button>
          <button onClick={() => dispatch(deleteReminder(r.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
