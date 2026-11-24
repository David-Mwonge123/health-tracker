
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const getDateKey = (date) => {
  const d = new Date(date);

  return new Date(
    d.getTime() - d.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);
};

function WeeklyChart({ title, unit, data, color, periodLabel }) {
  const max = Math.max(
    ...data.map((item) => item.value),
    1
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {periodLabel}
        </span>
        <h2 className="mt-1 text-lg font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex h-48 items-end gap-2 overflow-x-auto pb-2">
        {data.map((item) => {
          const height = item.value > 0
            ? Math.max(5, (item.value / max) * 100)
            : 0;

          return (
            <div
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
              key={item.date}
            >
              <span className="whitespace-nowrap text-[10px] text-slate-400">
                {item.value > 0
                  ? Number(item.value.toFixed(1))
                  : "–"}
              </span>

              <div className="flex h-32 w-full items-end justify-center">
                <div
                  className="w-full max-w-8 rounded-t-md transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    backgroundColor: color,
                    minHeight: item.value > 0 ? "4px" : "0",
                  }}
                  title={`${item.value} ${unit}`}
                />
              </div>

              <span className="text-[10px] text-slate-500">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Values in {unit}
      </p>
    </section>
  );
}

export default function Progress({
  workouts = [],
  sleepEntries = [],
}) {
  const meals = useSelector(
    (state) => state.meals?.entries || []
  );

  const waterEntries = useSelector(
    (state) => state.meals?.waterEntries || []
  );

  const moodEntries = useSelector(
    (state) => state.mood?.entries || []
  );

  const [period, setPeriod] = useState("week");

  const days = useMemo(() => {
    const count = period === "week" ? 7 : 30;

    return Array.from({ length: count }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (count - 1 - i));

      return {
        date: getDateKey(date),
        label: period === "week"
          ? date.toLocaleDateString("en", { weekday: "short" })
          : date.getDate().toString(),
      };
    });
  }, [period]);

  const aggregate = (records, valueFn) => {
    return days.map((day) => ({
      ...day,
      value: valueFn(
        records.filter((record) => {
          const recordDate = record.date || record.createdAt;

          return recordDate &&
            getDateKey(recordDate) === day.date;
        })
      ),
    }));
  };

  // WATER INTAKE
  const waterData = aggregate(
    waterEntries,
    (records) =>
      records.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ) / 1000
  );

  // WORKOUT ACTIVITY
  const workoutData = aggregate(
    workouts,
    (records) =>
      records.reduce(
        (sum, item) => sum + Number(item.duration || 0),
        0
      )
  );

  // SLEEP DURATION
  const sleepData = aggregate(
    sleepEntries,
    (records) => {
      if (!records.length) return 0;

      return records.reduce(
        (sum, item) => sum + Number(item.hours || 0),
        0
      ) / records.length;
    }
  );

  // MOOD TREND
  const moodData = aggregate(
    moodEntries,
    (records) => {
      if (!records.length) return 0;

      const moodScores = {
        Great: 5,
        Good: 4,
        Okay: 3,
        Low: 2,
        Bad: 1,
      };

      return records.reduce(
        (sum, item) => sum + (moodScores[item.mood] || 0),
        0
      ) / records.length;
    }
  );

  // SUMMARY CALCULATIONS
  const totalWater = waterData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const totalWorkout = workoutData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const recordedSleepDays = sleepData.filter(
    (item) => item.value > 0
  );

  const averageSleep = recordedSleepDays.length
    ? recordedSleepDays.reduce(
        (sum, item) => sum + item.value,
        0
      ) / recordedSleepDays.length
    : 0;

  const recordedMoodDays = moodData.filter(
    (item) => item.value > 0
  );

  const moodAverage = recordedMoodDays.length
    ? recordedMoodDays.reduce(
        (sum, item) => sum + item.value,
        0
      ) / recordedMoodDays.length
    : 0;

  const totalMeals = meals.filter((item) => {
    const mealDate = item.date || item.createdAt;

    return mealDate &&
      days.some((day) => getDateKey(mealDate) === day.date);
  }).length;

  const periodLabel = period === "week"
    ? "Last 7 days"
    : "Last 30 days";

  const summaryCards = [
    {
      icon: "💧",
      label: "Total water",
      value: `${totalWater.toFixed(1)} L`,
    },
    {
      icon: "🏋️",
      label: "Workout time",
      value: `${Math.round(totalWorkout)} min`,
    },
    {
      icon: "😴",
      label: "Average sleep",
      value: `${averageSleep.toFixed(1)} hrs`,
    },
    {
      icon: "🍽️",
      label: "Meals recorded",
      value: totalMeals,
    },
  ];

  return (
    <main className="min-h-screen space-y-6 bg-slate-950 p-4 text-white sm:p-6 lg:p-8">

      {/* PAGE HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            Your wellness journey
          </span>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Progress
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            See how your daily habits are developing.
          </p>
        </div>

        {/* PERIOD SELECTOR */}
        <div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1">
          <button
            type="button"
            onClick={() => setPeriod("week")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              period === "week"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            7 Days
          </button>

          <button
            type="button"
            onClick={() => setPeriod("month")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              period === "month"
                ? "bg-blue-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            30 Days
          </button>
        </div>
      </header>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5"
          >
            <span className="text-2xl">{card.icon}</span>

            <p className="mt-3 text-xs font-medium text-slate-400 sm:text-sm">
              {card.label}
            </p>

            <strong className="mt-1 block text-xl font-bold sm:text-2xl">
              {card.value}
            </strong>
          </div>
        ))}
      </section>

      {/* MOOD SUMMARY */}
      <section className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Mood trend
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            {moodAverage > 0
              ? `${moodAverage.toFixed(1)} / 5`
              : "No mood data"}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Average recorded mood · {periodLabel}
          </p>
        </div>

        <span className="text-4xl">
          {moodAverage >= 4
            ? "😄"
            : moodAverage >= 3
              ? "🙂"
              : moodAverage > 0
                ? "😔"
                : "💭"}
        </span>
      </section>

      {/* PROGRESS CHARTS */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        <WeeklyChart
          title="Workout activity"
          unit="minutes"
          data={workoutData}
          color="#8b5cf6"
          periodLabel={periodLabel}
        />

        <WeeklyChart
          title="Water intake"
          unit="litres"
          data={waterData}
          color="#38bdf8"
          periodLabel={periodLabel}
        />

        <WeeklyChart
          title="Sleep duration"
          unit="hours"
          data={sleepData}
          color="#a78bfa"
          periodLabel={periodLabel}
        />

        <WeeklyChart
          title="Mood trend"
          unit="mood score (1–5)"
          data={moodData}
          color="#34d399"
          periodLabel={periodLabel}
        />

      </section>

    </main>
  );
}
