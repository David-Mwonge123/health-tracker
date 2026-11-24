
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addMood,
  updateMood,
  deleteMood
} from "../features/mood/moodSlice";

<<<<<<< HEAD
=======

>>>>>>> a6e9a89622d3de1c0b053dae1257950cbdb467f5
const today = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
};

const moods = [
  { name: "Great", description: "Feeling excellent" },
  { name: "Good", description: "Feeling positive" },
  { name: "Okay", description: "Doing alright" },
  { name: "Low", description: "Feeling down" },
  { name: "Bad", description: "Having a hard day" }
];

const initialForm = {
  mood: "Good",
  energy: 7,
  stress: 3,
  notes: ""
};

export default function MoodJournal() {
  const dispatch = useDispatch();

  const entries = useSelector(
    state => state.mood?.entries || []
  );

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const todayEntries = entries
    .filter(entry => entry.date === today())
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

  const updateForm = (field, value) => {
    setForm(previous => ({
      ...previous,
      [field]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      ...form,
      energy: Number(form.energy),
      stress: Number(form.stress),
      date: today(),
      createdAt: editingId
        ? entries.find(entry => entry.id === editingId)?.createdAt
        : new Date().toISOString()
    };

    if (editingId) {
      dispatch(
        updateMood({
          id: editingId,
          ...payload
        })
      );
    } else {
      dispatch(
        addMood({
          ...payload,
          createdAt: new Date().toISOString()
        })
      );
    }

    setForm(initialForm);
    setEditingId(null);
  };

  const editEntry = entry => {
    setEditingId(entry.id);

    setForm({
      mood: entry.mood,
      energy: entry.energy,
      stress: entry.stress,
      notes: entry.notes || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const deleteEntry = id => {
    dispatch(deleteMood(id));

    if (editingId === id) {
      cancelEdit();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* PAGE HEADING */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Mental wellness
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Mood Journal
          </h1>

          <p className="text-sm text-slate-400">
            Take a moment to check in with yourself.
          </p>
        </div>

        {/* MOOD FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm sm:p-6"
        >
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Daily check-in
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              {editingId ? "Edit your entry" : "How are you feeling?"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Choose the option that best describes your day.
            </p>
          </div>

          {/* MOOD SELECTOR */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {moods.map(item => {
              const selected = form.mood === item.name;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => updateForm("mood", item.name)}
                  aria-pressed={selected}
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 bg-slate-800 hover:border-slate-500"
                  }`}
                >
                  <span
                    className={`block text-sm font-semibold ${
                      selected ? "text-blue-400" : "text-slate-200"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span className="mt-1 block text-xs text-slate-500">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ENERGY LEVEL */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="energy"
                className="text-sm font-medium text-slate-200"
              >
                Energy level
              </label>

              <span className="text-sm font-semibold text-blue-400">
                {form.energy}/10
              </span>
            </div>

            <input
              id="energy"
              type="range"
              min="1"
              max="10"
              value={form.energy}
              onChange={e =>
                updateForm("energy", Number(e.target.value))
              }
              className="h-2 w-full cursor-pointer accent-blue-500"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>Exhausted</span>
              <span>Energetic</span>
            </div>
          </div>

          {/* STRESS LEVEL */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="stress"
                className="text-sm font-medium text-slate-200"
              >
                Stress level
              </label>

              <span className="text-sm font-semibold text-blue-400">
                {form.stress}/10
              </span>
            </div>

            <input
              id="stress"
              type="range"
              min="1"
              max="10"
              value={form.stress}
              onChange={e =>
                updateForm("stress", Number(e.target.value))
              }
              className="h-2 w-full cursor-pointer accent-blue-500"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>Relaxed</span>
              <span>Very stressed</span>
            </div>
          </div>

          {/* NOTES */}
          <div className="mt-7">
            <label
              htmlFor="moodNotes"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Your thoughts
              <span className="ml-2 font-normal text-slate-500">
                (optional)
              </span>
            </label>

            <textarea
              id="moodNotes"
              rows="4"
              placeholder="What happened today? How are you feeling?"
              value={form.notes}
              onChange={e => updateForm("notes", e.target.value)}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* FORM ACTIONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {editingId ? "Update entry" : "Save mood entry"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* TODAY'S HISTORY */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Your records
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Today's mood history
              </h2>
            </div>

            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300">
              {todayEntries.length} entries
            </span>
          </div>

          {todayEntries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 px-4 py-10 text-center">
              <h3 className="text-base font-medium text-slate-300">
                No mood entries yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Your daily check-ins will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {todayEntries.map(entry => (
                <div
                  key={entry.id}
                  className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {entry.mood}
                      </h3>

                      <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
                        {entry.energy}/10 energy
                      </span>

                      <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
                        {entry.stress}/10 stress
                      </span>
                    </div>

                    {entry.notes && (
                      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-400">
                        {entry.notes}
                      </p>
                    )}

                    <p className="mt-3 text-xs text-slate-500">
                      {entry.createdAt
                        ? new Date(entry.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit"
                            }
                          )
                        : "Time unavailable"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => editEntry(entry)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteEntry(entry.id)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
