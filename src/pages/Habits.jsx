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
  const [filter, setFilter] = useState("all");

  const doneCount = habits.filter((h) => h.done).length;
  const progress = habits.length
    ? Math.round((doneCount / habits.length) * 100)
    : 0;

  const filtered = habits.filter((h) =>
    filter === "all" ? true : filter === "done" ? h.done : !h.done,
  );

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addHabit({ id: Date.now(), name, done: false, streak: 0 }));
    setName("");
  };

  const handleClearCompleted = () => {
    habits.filter((h) => h.done).forEach((h) => dispatch(deleteHabit(h.id)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Habits</h1>

      {/* Progress bar */}
      {habits.length > 0 && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Today's progress</span>
            <span className="font-bold text-green-700">
              {doneCount}/{habits.length} • {progress}%
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

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

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {habits.length === 0 && (
        <p className="bg-white text-gray-500 text-center p-8 rounded-xl border border-gray-200">
          No habits yet. Add one above.
        </p>
      )}

      <div className="space-y-3">
        {filtered.map((h) => (
          <div
            key={h.id}
            className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={h.done}
              onChange={() => dispatch(toggleHabit(h.id))}
              className="w-5 h-5 accent-green-600"
            />
            <span
              className={`flex-1 font-medium ${
                h.done ? "line-through text-gray-400" : "text-gray-800"
              }`}
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

      {doneCount > 0 && (
        <button
          onClick={handleClearCompleted}
          className="text-sm text-red-500 font-bold mt-4"
        >
          Clear completed ({doneCount})
        </button>
      )}
    </div>
  );
}
