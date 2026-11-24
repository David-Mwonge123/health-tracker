
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addMood,
  updateMood,
  deleteMood
} from "../features/mood/moodSlice";


const today = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
};

const moods = [
  { name: "Great", emoji: "😄" },
  { name: "Good", emoji: "🙂" },
  { name: "Okay", emoji: "😐" },
  { name: "Low", emoji: "😔" },
  { name: "Bad", emoji: "😣" }
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
    state => state.mood.entries || []
  );

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const todayEntries = entries
    .filter(entry => entry.date === today())
    .sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );

  const handleSubmit = e => {
    e.preventDefault();

    const selectedMood = moods.find(
      m => m.name === form.mood
    );

    const payload = {
      ...form,
      emoji: selectedMood.emoji,
      energy: Number(form.energy),
      stress: Number(form.stress),
      date: today()
    };

    if (editingId) {
      dispatch(updateMood({
        id: editingId,
        ...payload
      }));
    } else {
      dispatch(addMood(payload));
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

  return (
    <div className="m3-page">

      <div className="m3-page-heading">
        <div>
          <span className="m3-eyebrow">YOUR MENTAL WELLNESS</span>
          <h1>Mood Journal</h1>
          <p>Take a moment to check in with yourself.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="m3-card mood-form">

        <div className="m3-card-heading">
          <div>
            <span className="m3-section-label">DAILY CHECK-IN</span>
            <h2>{editingId ? "Edit your entry" : "How are you feeling?"}</h2>
          </div>

          <span className="m3-icon mood-icon">💭</span>
        </div>

        {/* MOOD SELECTOR */}

        <div className="mood-selector">

          {moods.map(item => (
            <button
              type="button"
              key={item.name}
              className={`mood-option ${
                form.mood === item.name ? "selected" : ""
              }`}
              onClick={() =>
                setForm({ ...form, mood: item.name })
              }
            >
              <span>{item.emoji}</span>
              <small>{item.name}</small>
            </button>
          ))}

        </div>

        {/* ENERGY */}

        <div className="mood-rating">

          <div className="mood-rating-heading">
            <label htmlFor="energy">Energy level</label>
            <strong>{form.energy}/10</strong>
          </div>

          <input
            id="energy"
            type="range"
            min="1"
            max="10"
            value={form.energy}
            onChange={e =>
              setForm({
                ...form,
                energy: Number(e.target.value)
              })
            }
          />

          <div className="mood-range-labels">
            <span>Exhausted</span>
            <span>Energetic</span>
          </div>

        </div>

        {/* STRESS */}

        <div className="mood-rating">

          <div className="mood-rating-heading">
            <label htmlFor="stress">Stress level</label>
            <strong>{form.stress}/10</strong>
          </div>

          <input
            id="stress"
            type="range"
            min="1"
            max="10"
            value={form.stress}
            onChange={e =>
              setForm({
                ...form,
                stress: Number(e.target.value)
              })
            }
          />

          <div className="mood-range-labels">
            <span>Relaxed</span>
            <span>Very stressed</span>
          </div>

        </div>

        {/* NOTES */}

        <div className="m3-form-group">
          <label htmlFor="moodNotes">Your thoughts (optional)</label>

          <textarea
            id="moodNotes"
            rows="4"
            placeholder="What happened today? How are you feeling?"
            value={form.notes}
            onChange={e =>
              setForm({
                ...form,
                notes: e.target.value
              })
            }
          />
        </div>

        <div className="m3-form-actions">

          <button className="m3-button primary-button" type="submit">
            {editingId ? "Update entry" : "Save mood entry"}
          </button>

          {editingId && (
            <button
              type="button"
              className="m3-button secondary-button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

      {/* TODAY'S MOOD */}

      <section className="m3-card">

        <div className="m3-card-heading">
          <div>
            <span className="m3-section-label">YOUR RECORDS</span>
            <h2>Today's mood history</h2>
          </div>

          <span className="m3-count">
            {todayEntries.length} entries
          </span>
        </div>

        {todayEntries.length === 0 ? (

          <div className="m3-empty">
            <span>🌱</span>
            <h3>No mood entries yet</h3>
            <p>Your daily check-ins will appear here.</p>
          </div>

        ) : (

          <div className="mood-history">

            {todayEntries.map(entry => (

              <div className="mood-history-item" key={entry.id}>

                <div className="mood-history-emoji">
                  {entry.emoji}
                </div>

                <div className="mood-history-info">
                  <h3>{entry.mood}</h3>

                  <p>
                    Energy: {entry.energy}/10
                    {" · "}
                    Stress: {entry.stress}/10
                  </p>

                  {entry.notes && (
                    <p className="mood-notes">
                      {entry.notes}
                    </p>
                  )}

                  <small>
                    {new Date(entry.createdAt).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </small>
                </div>

                <div className="meal-actions">
                  <button
                    aria-label="Edit mood"
                    onClick={() => editEntry(entry)}
                  >
                    ✏️
                  </button>

                  <button
                    aria-label="Delete mood"
                    onClick={() => {
                      dispatch(deleteMood(entry.id));
                      if (editingId === entry.id) cancelEdit();
                    }}
                  >
                    🗑️
                  </button>
                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}
