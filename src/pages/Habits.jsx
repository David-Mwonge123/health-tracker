import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addHabit,
  toggleHabit,
  deleteHabit,
} from "../features/habits/habitSlice";

export default function Habits() {
  const habits = useSelector((state) => state.habits?.habits || []);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addHabit({ id: Date.now(), name, done: false, streak: 0 }));
    setName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Habits</h1>
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit e.g. Drink water"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2">
          Add Habit
        </button>
      </form>

      {habits.length === 0 && (
        <p className="bg-white text-gray-500 text-center p-8 rounded-xl border border-gray-200">
          No habits yet. Add one above.
        </p>
      )}
      <div>
        {habits.map((h) => (
          <div
            key={h.id}
            className="bg-white p-6 rounde-xl border border-gray-200 flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={h.done}
              onChange={() => dispatch(toggleHabit(h.id))}
              className="w-5 h-5 accent-green-600"
            />
            <span
              className={
                'flex-1 font-medium ${h.done ? "line-through text-gray-400" : "text-gray-800"}'
              }
            >
              {h.name}
            </span>
            <span className="text-sm text-green-700 font-bold bg-green-50 px-3 py-1 rounded-full">
              {h.streak} day streak
            </span>
            <button
              onClick={() => dispatch(deleteHabit(h.id))}
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
