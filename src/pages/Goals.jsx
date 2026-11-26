
import { useSelector } from "react-redux";

export default function Goals() {
  const goals = useSelector(
    (state) => state.settings?.goals || { water: 8, sleep: 8 }
  );

  const habits = useSelector((state) => state.habits?.habits || []);

  const workouts = useSelector(
    (state) => state.workouts?.workouts ||
      state.workouts?.entries || []
  );

  const waterEntries = useSelector(
    (state) => state.meals?.waterEntries || []
  );

  const sleepEntries = useSelector(
    (state) => state.sleep?.sleepRecords || []
  );

  const today = new Date().toLocaleDateString("en-CA");

  // Get the beginning of the current week (Sunday)
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const getDate = (date) => {
    if (!date) return null;
    return new Date(`${date}T00:00:00`);
  };

  // Habits
  const habitsToday = habits;

  const habitsDone = habitsToday.filter((h) => h.done).length;

  const habitsPct = habitsToday.length
    ? Math.round((habitsDone / habitsToday.length) * 100)
    : 0;

  // Water: 250ml per glass
  const waterToday = waterEntries
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

  const waterGlasses = waterToday / 250;

  const waterPct = goals.water
    ? Math.min(100, Math.round((waterGlasses / goals.water) * 100))
    : 0;

  // Workouts this week
  const workoutsThisWeek = workouts.filter((workout) => {
    const date = getDate(workout.date);
    return date && date >= startOfWeek && date <= new Date();
  });

  const workoutPct = Math.min(
    100,
    Math.round((workoutsThisWeek.length / 5) * 100)
  );

  // Sleep average this week
  const sleepThisWeek = sleepEntries.filter((sleep) => {
    const date = getDate(sleep.date);
    return date && date >= startOfWeek && date <= new Date();
  });

  const averageSleep = sleepThisWeek.length
    ? sleepThisWeek.reduce(
        (sum, sleep) =>
          sum + Number(sleep.duration ?? sleep.hours ?? 0),
        0
      ) / sleepThisWeek.length
    : 0;

  const sleepPct = goals.sleep
    ? Math.min(100, Math.round((averageSleep / goals.sleep) * 100))
    : 0;

  const cards = [
    {
      label: "Water Goal",
      value: `${waterGlasses.toFixed(1)} / ${goals.water} glasses`,
      pct: waterPct,
    },
    {
      label: "Habits Today",
      value: `${habitsDone} / ${habitsToday.length} done`,
      pct: habitsPct,
    },
    {
      label: "Workouts This Week",
      value: `${workoutsThisWeek.length} / 5 workouts`,
      pct: workoutPct,
    },
    {
      label: "Sleep Goal",
      value: `${averageSleep.toFixed(1)} / ${goals.sleep} hrs average`,
      pct: sleepPct,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Goals
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <strong className="text-gray-800">{c.label}</strong>
              <span className="text-gray-500 text-sm">{c.value}</span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${c.pct}%` }}
              />
            </div>

            <small className="text-green-700 font-bold mt-2 block">
              {c.pct}%
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
