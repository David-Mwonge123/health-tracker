import { useSelector } from "react-redux";

export default function Goals() {
  const goals = useSelector(
    (state) => state.settings?.goals || { water: 8, sleep: 8 },
  );
  const habits = useSelector((state) => state.habits?.habits || []);
  const workouts = useSelector((state) => state.workouts?.workouts || []);
  const water = useSelector((state) => state.meals?.water || 0);
  const sleepEntries = useSelector((state) => state.sleep?.entries || []);

  const habitsDone = habits.filter((h) => h.done).length;
  const habitsPct = habits.length
    ? Math.round((habitsDone / habits.length) * 100)
    : 0;
  const waterPct = goals.water
    ? Math.min(100, Math.round((water / goals.water) * 100))
    : 0;
  const workoutPct = Math.min(100, Math.round((workouts.length / 5) * 100));

  
  const avgSleep = sleepEntries.length
    ? sleepEntries.reduce((sum, s) => sum + Number(s.hours || 0), 0) / sleepEntries.length
    : 0;
  const sleepPct = goals.sleep
    ? Math.min(100, Math.round((avgSleep / goals.sleep) * 100))
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
      value: `${avgSleep.toFixed(1)} / ${goals.sleep} hrs`,
      pct: sleepPct,
    },
  ];


  const overall = Math.round(
    (waterPct + habitsPct + workoutPct + sleepPct) / 4
  );
  const message =
    overall === 100
      ? "\u{1F389} All goals complete today. Amazing work!"
      : overall >= 50
        ? "\u{1F4AA} You're halfway there — keep going!"
        : "\u{1F331} Small steps today. You've got this.";

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-8">Goals</h1>

      
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-3">
          <strong className="text-gray-800">Today's Overall Progress</strong>
          <span className="text-green-700 font-bold">{overall}%</span>
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
                   Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}