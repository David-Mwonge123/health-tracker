
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function getToday() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function Dashboard() {
  const settings = useSelector((state) => state.settings);
  const meals = useSelector((state) => state.meals.entries || []);
  const waterEntries = useSelector((state) => state.meals.waterEntries || []);
  const waterGoal = useSelector((state) => state.meals.dailyGoal || 2000);
  const workouts = useSelector((state) => state.workouts.workouts || []);
  const sleepRecords = useSelector((state) => state.sleep.sleepRecords || []);
  const moodEntries = useSelector((state) => state.mood.entries || []);
  const habits = useSelector((state) => state.habits.habits || []);

  const today = getToday();

  // Filter today's records
  const todaysMeals = meals.filter((item) => item.date === today);
  const todaysWater = waterEntries.filter((item) => item.date === today);
  const todaysWorkouts = workouts.filter((item) => item.date === today);
  const todaysSleep = sleepRecords.filter((item) => item.date === today);
  const todaysMood = moodEntries
    .filter((item) => item.date === today)
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

  // Calculate today's totals
  const waterConsumed = todaysWater.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  const workoutMinutes = todaysWorkouts.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  );

  const sleepHours = todaysSleep.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  );

  const sleepGoal = Number(settings.dailySleepGoal) || 8;
  const completedHabits = habits.filter((habit) => habit.done).length;

  // Build recent activity from actual records
  const activities = [
    ...todaysMeals.map((item) => ({
      id: `meal-${item.id}`,
      icon: "🥗",
      title: `Meal logged: ${item.name || item.type || "Meal"}`,
      date: item.createdAt || item.date,
    })),

    ...todaysWater.map((item) => ({
      id: `water-${item.id}`,
      icon: "💧",
      title: `Water intake: ${item.amount} ml`,
      date: item.createdAt || item.date,
    })),

    ...todaysWorkouts.map((item) => ({
      id: `workout-${item.id}`,
      icon: "🏋️",
      title: `Workout completed: ${item.name || item.type}`,
      date: item.date,
    })),

    ...todaysSleep.map((item) => ({
      id: `sleep-${item.id}`,
      icon: "😴",
      title: `Sleep recorded: ${item.duration} hours`,
      date: item.date,
    })),

    ...todaysMood.map((item) => ({
      id: `mood-${item.id}`,
      icon: "🙂",
      title: `Mood recorded: ${item.mood}`,
      date: item.createdAt || item.date,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const progressItems = [
    {
      label: "Water Intake",
      value: waterConsumed,
      goal: Number(waterGoal),
      unit: "ml",
      icon: "💧",
    },
    {
      label: "Sleep",
      value: sleepHours,
      goal: sleepGoal,
      unit: "hours",
      icon: "😴",
    },
    {
      label: "Workout",
      value: workoutMinutes,
      goal: 60,
      unit: "minutes",
      icon: "🏋️",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Health Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Welcome back, {settings.name || "User"}! Track your daily health
          and wellness progress.
        </p>
      </header>

      {/* Today's Summary */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Today's Summary
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🏋️",
              label: "Workout",
              value: `${workoutMinutes} minutes`,
            },
            {
              icon: "💧",
              label: "Water",
              value: `${waterConsumed.toLocaleString()} ml`,
            },
            {
              icon: "😴",
              label: "Sleep",
              value: `${sleepHours} hours`,
            },
            {
              icon: "🥗",
              label: "Meals",
              value: `${todaysMeals.length} meals`,
            },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-2xl">
                {item.icon}
              </span>
              <h3 className="mt-4 text-gray-500">{item.label}</h3>
              <p className="mt-1 text-xl font-bold text-gray-800">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Today's Progress */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Today's Progress
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {progressItems.map((item) => {
            const percentage =
              item.goal > 0
                ? Math.min((item.value / item.goal) * 100, 100)
                : 0;

            return (
              <article
                key={item.label}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-gray-700">
                  {item.icon} {item.label}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.value} / {item.goal} {item.unit}
                </p>

                <div
                  className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200"
                  role="progressbar"
                  aria-label={`${item.label} progress`}
                  aria-valuenow={Math.round(percentage)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="h-full rounded-full bg-green-600 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {Math.round(percentage)}% completed
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Additional Overview */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Wellness Overview
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-700">🙂 Today's Mood</h3>
            <p className="mt-3 text-2xl font-bold text-green-700">
              {todaysMood[0]?.mood || "Not recorded"}
            </p>
            {todaysMood[0] && (
              <p className="mt-1 text-sm text-gray-500">
                Energy: {todaysMood[0].energy}/10 · Stress:{" "}
                {todaysMood[0].stress}/10
              </p>
            )}
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-700">✅ Habits</h3>
            <p className="mt-3 text-2xl font-bold text-green-700">
              {completedHabits} / {habits.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Habits completed
            </p>
          </article>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <Link
            to="/profile"
            className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
          >
            👤 View Profile
          </Link>

          <Link
            to="/settings"
            className="rounded-lg bg-green-50 px-5 py-3 font-medium text-green-700 transition hover:bg-green-100"
          >
            ⚙️ Open Settings
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Today's Recent Activity
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          {activities.length === 0 ? (
            <p className="py-5 text-center text-gray-500">
              No activity recorded today.
            </p>
          ) : (
            <ul className="space-y-4">
              {activities.slice(0, 6).map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0"
                >
                  <span className="text-xl">{activity.icon}</span>
                  <span className="text-gray-700">{activity.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
