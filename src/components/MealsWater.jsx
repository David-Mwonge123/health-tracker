
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addMeal,
  updateMeal,
  deleteMeal,
  addWater,
  removeWater,
  setWaterGoal
} from "../features/meals/mealsSlice";


const today = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
};

export default function MealsWater() {
  const dispatch = useDispatch();

  const { entries = [], waterEntries = [], dailyGoal = 2500 } =
    useSelector(state => state.meals);

  const todayMeals = entries.filter(m => m.date === today());

  const waterConsumed = waterEntries
    .filter(w => w.date === today())
    .reduce((total, w) => total + w.amount, 0);

  const waterPercentage = Math.min(
    100,
    (waterConsumed / dailyGoal) * 100
  );

  const [amount, setAmount] = useState(250);
  const [goalInput, setGoalInput] = useState(dailyGoal);
  const [editingId, setEditingId] = useState(null);

  const [meal, setMeal] = useState({
    name: "",
    type: "Breakfast",
    calories: ""
  });

  const handleMealSubmit = e => {
    e.preventDefault();

    if (!meal.name.trim()) return;

    if (editingId) {
      dispatch(updateMeal({
        id: editingId,
        ...meal,
        calories: Number(meal.calories) || 0
      }));
      setEditingId(null);
    } else {
      dispatch(addMeal({
        ...meal,
        calories: Number(meal.calories) || 0,
        date: today()
      }));
    }

    setMeal({
      name: "",
      type: "Breakfast",
      calories: ""
    });
  };

  const editMeal = item => {
    setEditingId(item.id);
    setMeal({
      name: item.name,
      type: item.type,
      calories: item.calories || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setMeal({
      name: "",
      type: "Breakfast",
      calories: ""
    });
  };

  return (
    <div className="m3-page">

      <div className="m3-page-heading">
        <div>
          <span className="m3-eyebrow">YOUR DAILY WELLNESS</span>
          <h1>Meals & Water</h1>
          <p>Fuel your body and stay hydrated.</p>
        </div>
      </div>

      {/* WATER TRACKER */}

      <section className="m3-card water-card">

        <div className="m3-card-heading">
          <div>
            <span className="m3-section-label">HYDRATION</span>
            <h2>Water intake</h2>
          </div>
          <span className="m3-icon water-icon">💧</span>
        </div>

        <div className="water-content">

          <div
            className="water-circle"
            style={{
              "--water-progress": `${waterPercentage}%`
            }}
          >
            <div className="water-circle-inner">
              <strong>{(waterConsumed / 1000).toFixed(2)}</strong>
              <span>Litres</span>
            </div>
          </div>

          <div className="water-details">
            <h3>{Math.round(waterPercentage)}%</h3>
            <p>Daily target completed</p>

            <div className="m3-progress-track">
              <div
                className="m3-progress-fill water-fill"
                style={{ width: `${waterPercentage}%` }}
              />
            </div>

            <small>
              {Math.max(0, dailyGoal - waterConsumed)} ml remaining
            </small>
          </div>

        </div>

        <div className="water-controls">

          <label htmlFor="waterAmount">Amount per serving</label>

          <select
            id="waterAmount"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          >
            <option value={150}>150 ml</option>
            <option value={250}>250 ml</option>
            <option value={350}>350 ml</option>
            <option value={500}>500 ml</option>
            <option value={750}>750 ml</option>
            <option value={1000}>1 litre</option>
          </select>

          <div className="water-buttons">
            <button
              className="m3-button secondary-button"
              onClick={() => dispatch(removeWater(amount))}
              disabled={waterConsumed <= 0}
            >
              − Remove
            </button>

            <button
              className="m3-button primary-button"
              onClick={() => dispatch(addWater(amount))}
            >
              + Add water
            </button>
          </div>

          <div className="water-goal-editor">
            <label htmlFor="waterGoal">Daily water goal (ml)</label>

            <div className="goal-input-row">
              <input
                id="waterGoal"
                type="number"
                min="1"
                value={goalInput}
                onChange={e => setGoalInput(e.target.value)}
              />

              <button
                className="m3-button secondary-button"
                onClick={() => dispatch(setWaterGoal(goalInput))}
              >
                Save goal
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* MEAL FORM */}

      <section className="m3-card">

        <div className="m3-card-heading">
          <div>
            <span className="m3-section-label">NUTRITION</span>
            <h2>{editingId ? "Edit meal" : "Add a meal"}</h2>
          </div>
          <span className="m3-icon meal-icon">🍽️</span>
        </div>

        <form onSubmit={handleMealSubmit} className="m3-form">

          <div className="m3-form-group">
            <label htmlFor="mealName">Meal name</label>
            <input
              id="mealName"
              type="text"
              placeholder="e.g. Rice and chicken"
              value={meal.name}
              onChange={e =>
                setMeal({ ...meal, name: e.target.value })
              }
              required
            />
          </div>

          <div className="m3-form-grid">

            <div className="m3-form-group">
              <label htmlFor="mealType">Meal type</label>
              <select
                id="mealType"
                value={meal.type}
                onChange={e =>
                  setMeal({ ...meal, type: e.target.value })
                }
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
            </div>

            <div className="m3-form-group">
              <label htmlFor="mealCalories">Calories (optional)</label>
              <input
                id="mealCalories"
                type="number"
                min="0"
                placeholder="e.g. 450"
                value={meal.calories}
                onChange={e =>
                  setMeal({ ...meal, calories: e.target.value })
                }
              />
            </div>

          </div>

          <div className="m3-form-actions">
            <button className="m3-button primary-button" type="submit">
              {editingId ? "Update meal" : "+ Add meal"}
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
      </section>

      {/* TODAY'S MEALS */}

      <section className="m3-card">

        <div className="m3-card-heading">
          <div>
            <span className="m3-section-label">TODAY'S RECORD</span>
            <h2>Today's meals</h2>
          </div>

          <span className="m3-count">{todayMeals.length} meals</span>
        </div>

        {todayMeals.length === 0 ? (
          <div className="m3-empty">
            <span>🥗</span>
            <h3>No meals recorded yet</h3>
            <p>Add your first meal to start tracking your nutrition.</p>
          </div>
        ) : (
          <div className="meal-list">

            {todayMeals.map(item => (
              <div className="meal-item" key={item.id}>

                <div className="meal-item-icon">
                  {item.type === "Breakfast" ? "🌅" :
                   item.type === "Lunch" ? "🍛" :
                   item.type === "Dinner" ? "🍽️" : "🍎"}
                </div>

                <div className="meal-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.type} · {item.calories || 0} kcal</p>
                </div>

                <div className="meal-actions">
                  <button
                    aria-label="Edit meal"
                    onClick={() => editMeal(item)}
                  >
                    ✏️
                  </button>

                  <button
                    aria-label="Delete meal"
                    onClick={() => {
                      dispatch(deleteMeal(item.id));
                      if (editingId === item.id) cancelEdit();
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
