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
    .toISOString()
    .slice(0, 10);
};

export default function MealsWater() {
  const dispatch = useDispatch();

  const {
    entries = [],
    waterEntries = [],
    dailyGoal = 2500
  } = useSelector(state => state.meals);

  const todayMeals = entries.filter(m => m.date === today());

  const waterConsumed = waterEntries
    .filter(w => w.date === today())
    .reduce((total, w) => total + Number(w.amount || 0), 0);

  const waterPercentage = dailyGoal > 0
    ? Math.min(100, (waterConsumed / dailyGoal) * 100)
    : 0;

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

  const saveWaterGoal = () => {
    const goal = Number(goalInput);

    if (goal > 0) {
      dispatch(setWaterGoal(goal));
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-600";

  const cardClass =
    "rounded-xl border border-gray-200 bg-white p-5 sm:p-6";

  const primaryButton =
    "rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50";

  const secondaryButton =
    "rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800";

  return (
    <main className="space-y-6 p-4 text-gray-800 sm:p-6 lg:p-8">

      {/* PAGE HEADER */}

      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
          DAILY WELLNESS
        </span>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-green-700 sm:text-3xl">
          Meals & Water
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Keep track of what you eat and how much water you drink.
        </p>
      </header>

      {/* WATER TRACKER */}

      <section className={cardClass}>

        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
              HYDRATION
            </span>

            <h2 className="mt-1 text-lg font-semibold text-gray-800">
              Water intake
            </h2>
          </div>

          <span className="text-sm font-medium text-gray-500">
            {Math.round(waterPercentage)}% completed
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">

          <div>
            <div className="flex items-baseline gap-2">
              <strong className="text-4xl font-bold tracking-tight text-gray-800">
                {(waterConsumed / 1000).toFixed(2)}
              </strong>

              <span className="text-sm text-gray-500">
                litres
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              of {(dailyGoal / 1000).toFixed(2)} litres daily target
            </p>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-600 transition-all duration-500"
                style={{ width: `${waterPercentage}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {Math.max(0, dailyGoal - waterConsumed)} ml remaining today
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <label htmlFor="waterAmount" className={labelClass}>
              Serving size
            </label>

            <select
              id="waterAmount"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className={inputClass}
            >
              <option value={150}>150 ml</option>
              <option value={250}>250 ml</option>
              <option value={350}>350 ml</option>
              <option value={500}>500 ml</option>
              <option value={750}>750 ml</option>
              <option value={1000}>1 litre</option>
            </select>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={secondaryButton}
                onClick={() => dispatch(removeWater(amount))}
                disabled={waterConsumed <= 0}
              >
                Remove
              </button>

              <button
                type="button"
                className={primaryButton}
                onClick={() => dispatch(addWater(amount))}
              >
                + Add water
              </button>
            </div>
          </div>

        </div>

        {/* WATER GOAL */}

        <div className="mt-6 border-t border-gray-200 pt-5">
          <label htmlFor="waterGoal" className={labelClass}>
            Daily water target
          </label>

          <div className="flex max-w-md gap-2">
            <input
              id="waterGoal"
              type="number"
              min="1"
              value={goalInput}
              onChange={e => setGoalInput(e.target.value)}
              className={inputClass}
            />

            <button
              type="button"
              className={secondaryButton}
              onClick={saveWaterGoal}
            >
              Save
            </button>
          </div>
        </div>

      </section>

      {/* MEAL FORM */}

      <section className={cardClass}>

        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
            NUTRITION
          </span>

          <h2 className="mt-1 text-lg font-semibold text-gray-800">
            {editingId ? "Update meal" : "Record a meal"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add details of something you've eaten.
          </p>
        </div>

        <form onSubmit={handleMealSubmit} className="space-y-5">

          <div>
            <label htmlFor="mealName" className={labelClass}>
              Meal name
            </label>

            <input
              id="mealName"
              type="text"
              placeholder="e.g. Rice and chicken"
              value={meal.name}
              onChange={e =>
                setMeal({ ...meal, name: e.target.value })
              }
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label htmlFor="mealType" className={labelClass}>
                Meal type
              </label>

              <select
                id="mealType"
                value={meal.type}
                onChange={e =>
                  setMeal({ ...meal, type: e.target.value })
                }
                className={inputClass}
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
            </div>

            <div>
              <label htmlFor="mealCalories" className={labelClass}>
                Calories (optional)
              </label>

              <input
                id="mealCalories"
                type="number"
                min="0"
                placeholder="e.g. 450"
                value={meal.calories}
                onChange={e =>
                  setMeal({ ...meal, calories: e.target.value })
                }
                className={inputClass}
              />
            </div>

          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className={primaryButton}
            >
              {editingId ? "Update meal" : "+ Add meal"}
            </button>

            {editingId && (
              <button
                type="button"
                className={secondaryButton}
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>

        </form>
      </section>

      {/* TODAY'S MEALS */}

      <section className={cardClass}>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
              TODAY'S RECORD
            </span>

            <h2 className="mt-1 text-lg font-semibold text-gray-800">
              Meals recorded
            </h2>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
            {todayMeals.length} {todayMeals.length === 1 ? "meal" : "meals"}
          </span>
        </div>

        {todayMeals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 px-4 py-10 text-center">
            <h3 className="font-medium text-gray-700">
              Nothing recorded yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your meals will appear here once you add them.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">

            {todayMeals.map(item => (
              <div
                className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                key={item.id}
              >

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-800">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.type}
                    <span className="mx-2 text-gray-300">·</span>
                    {item.calories || 0} kcal
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Edit meal"
                    title="Edit meal"
                    onClick={() => editMeal(item)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    aria-label="Delete meal"
                    title="Delete meal"
                    onClick={() => {
                      dispatch(deleteMeal(item.id));

                      if (editingId === item.id) {
                        cancelEdit();
                      }
                    }}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-red-500 transition hover:border-red-200 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}