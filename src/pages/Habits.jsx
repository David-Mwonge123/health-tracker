import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addHabit,
  toggleHabit,
  deleteHabit,
} from "../features/habits/habitSlice";

export default function Habits() {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addHabit({ id: Date.now(), name, done: false, streak: 0 }));
    setName("");
  };

  return (
    <div>
      <h1>Habits</h1>
      <form onSubmit={handleAdd}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit e.g. Drink water"
        />
        <button>Add Habit</button>
      </form>

      {habits.length === 0 && <p>No habits yet. Add one above.</p>}

      {habits.map((h) => (
        <div key={h.id}>
          <input
            type="checkbox"
            checked={h.done}
            onChange={() => dispatch(toggleHabit(h.id))}
          />
          <span>{h.name}</span>
          <span>{h.streak} day streak</span>
          <button onClick={() => dispatch(deleteHabit(h.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
