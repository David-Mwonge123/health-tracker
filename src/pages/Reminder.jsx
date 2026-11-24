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
    <div>
      <h1>Reminders</h1>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Reminder e.g. Workout"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Once</option>
        </select>
        <button>Add</button>
      </form>

      {reminders.length === 0 && <p>No reminders yet.</p>}

      {reminders.map((r) => (
        <div key={r.id}>
          <span>
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
