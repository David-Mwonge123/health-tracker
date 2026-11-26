
import { useSelector } from "react-redux";

export default function Goals() {
  const goals = useSelector(
    (state) => state.settings?.goals || { water: 8, sleep: 8 }
  );

  const habits = useSelector(
    (state) => state.habits?.habits || []
  );

  const workouts = useSelector(
    (state) => state.workouts?.workouts ||
      state.workouts?.entries || []
  );

  const waterEntries = useSelector(
    (state) => state.meals?.waterEntries || []
  );

  const dailyGoal = useSelector(
    (state) => state.meals?.dailyGoal || 2500
  );

  const moodEntries = useSelector(
    (state) => state.mood?.entries || []
  );

  const sleepEntries = useSelector(
    (state) => state.sleep?.sleepRecords || []
  );

  const today = new Date().toLocaleDateString("en-CA");

  // Beginning of current week (Sunday)
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(
    startOfWeek.getDate() - startOfWeek.getDay()
  );

  const getDate = (date) => {
    if (!date) return null;

    const parsed = new Date(`${date}T00:00:00`);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  // Water
  const waterConsumed = waterEntries
    .filter((w) => w.date === today)
    .reduce(
      (total, w) => total + Number(w.amount || 0),
      0
    );

  const waterGlasses = waterConsumed / 250;
  const waterGoalGlasses = dailyGoal / 250;

  const waterPct = dailyGoal
    ? Math.min(
        100,
        Math.round((waterConsumed / dailyGoal) * 100)
      )
    : 0;

  // Habits
  const habitsDone = habits.filter((h) => h.done).length;

  const habitsPct = habits.length
    ? Math.round((habitsDone / habits.length) * 100)
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
    ? Math.min(
        100,
        Math.round((averageSleep / goals.sleep) * 100)
      )
    : 0;

  // Mood - latest entry today
  const todayMood = [...moodEntries]
    .filter((m) => m.date === today)
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )[0];

  const moodPct = todayMood ? 100 : 0;

  // Goal cards
  const cards = [
    {
      label: "Water Goal",
      value: `${waterGlasses.toFixed(1)} / ${waterGoalGlasses} glasses`,
      pct: waterPct,
    },
    {
      label: "Habits Today",
      value: `${habitsDone} / ${habits.length} done`,
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
    {
      label: "Mood Today",
      value: todayMood
        ? `${todayMood.mood} - ${todayMood.energy}/10 energy`
        : "Not logged yet",
      pct: moodPct,
    },
  ];

  // Overall progress
  const overall = Math.round(
    (waterPct + habitsPct + workoutPct + sleepPct + moodPct) / 5
  );

  const message =
    overall === 100
      ? "🎉 All goals complete today. Amazing work!"
      : overall >= 50
        ? "💪 You're halfway there — keep going!"
        : "🌱 Small steps today. You've got this.";

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Goals
      </h1>

      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-3">
          <strong className="text-gray-800">
            Today's Overall Progress
          </strong>

          <span className="text-green-700 font-bold">
            {overall}%
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-600 h-3 rounded-full transition-all"
            style={{ width: `${overall}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-3">
          {message}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <strong className="text-gray-800">
                {c.label}
              </strong>

              <span className="text-gray-500 text-sm">
                {c.value}
              </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${c.pct}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-2">
              <small className="text-green-700 font-bold block">
                {c.pct}%
              </small>

              {c.pct === 100 && (
                <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">
                  {"\u2713"} Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
