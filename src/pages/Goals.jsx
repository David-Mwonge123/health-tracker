
import { useSelector } from "react-redux";

export default function Goals() {
  const goals = useSelector(
    (state) => state.settings?.goals || { water: 8, sleep: 8 },
  );

  const habits = useSelector((state) => state.habits?.habits || []);
  const workouts = useSelector((state) => state.workouts?.workouts || []);

  const sleepRecords = useSelector(
    (state) => state.sleep?.sleepRecords || [],
  );

  const water = useSelector((state) => state.meals?.water || 0);

  const habitsDone = habits.filter((h) => h.done).length;

  const habitsPct = habits.length
    ? Math.round((habitsDone / habits.length) * 100)
    : 0;

  const waterPct = goals.water
    ? Math.min(100, Math.round((water / goals.water) * 100))
    : 0;

  const workoutPct = Math.min(100, Math.round((workouts.length / 5) * 100));

  // Calculate today's sleep progress
  const today = new Date().toLocaleDateString("en-CA");

  const todaysSleep = sleepRecords.filter(
    (record) => record.date === today
  );

  const sleepHours = todaysSleep.reduce(
    (total, record) => total + Number(record.duration || 0),
    0
  );

  const sleepPct = goals.sleep
    ? Math.min(100, Math.round((sleepHours / goals.sleep) * 100))
    : 0;

  const cards = [
    {
      label: "Water Goal",
      value: `${water} / ${goals.water} glasses`,
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
      value: `${sleepHours} / ${goals.sleep} hrs`,
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
