
import { useSelector } from "react-redux";

export default function Goals() {
  const sleepGoal = useSelector(
    (state) => state.settings?.dailySleepGoal || 8
  );

  const habits = useSelector((state) => state.habits?.habits || []);
  const workouts = useSelector((state) => state.workouts?.workouts || []);

  const waterEntries = useSelector(
    (state) => state.meals?.waterEntries || []
  );
  const dailyGoal = useSelector(
    (state) => state.meals?.dailyGoal || 2500
  );

  const moodEntries = useSelector(
    (state) => state.mood?.entries || []
  );

  const sleepRecords = useSelector(
    (state) => state.sleep?.sleepRecords || state.sleep?.entries || []
  );

  const todayStr = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  // Water
  const waterConsumed = waterEntries
    .filter((w) => w.date === todayStr)
    .reduce((total, w) => total + Number(w.amount || 0), 0);

  const waterGlasses = Math.floor(waterConsumed / 250);
  const waterGoalGlasses = Math.floor(dailyGoal / 250);

  const waterPct = dailyGoal
    ? Math.min(100, Math.round((waterConsumed / dailyGoal) * 100))
    : 0;

  // Habits
  const habitsDone = habits.filter((h) => h.done).length;

  const habitsPct = habits.length
    ? Math.round((habitsDone / habits.length) * 100)
    : 0;

  // Workouts
  const workoutPct = Math.min(
    100,
    Math.round((workouts.length / 5) * 100)
  );

  // Sleep
  const todaysSleep = sleepRecords.filter(
    (record) => record.date === todayStr
  );

  const sleepHours = todaysSleep.reduce(
    (total, record) =>
      total + Number(record.duration || record.hours || 0),
    0
  );

  const sleepPct = sleepGoal
    ? Math.min(100, Math.round((sleepHours / sleepGoal) * 100))
    : 0;

  // Mood
  const todayMood = [...moodEntries]
    .filter((m) => m.date === todayStr)
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )[0];

  const moodPct = todayMood ? 100 : 0;

  // Goal cards
  const cards = [
    {
      label: "Water Goal",
      value: `${waterGlasses} / ${waterGoalGlasses} glasses`,
      pct: waterPct,
    },
    {
      label: "Habits Today",
      value: `${habitsDone} / ${habits.length} done`,
      pct: habitsPct,
    },
    {
      label: "Workouts This Week",
      value: `${workouts.length} / 5 workouts`,
      pct: workoutPct,
    },
    {
      label: "Sleep Goal",
      value: `${sleepHours.toFixed(1)} / ${sleepGoal} hrs`,
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

        <p className="text-sm text-gray-500 mt-3">{message}</p>
      </div>

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
