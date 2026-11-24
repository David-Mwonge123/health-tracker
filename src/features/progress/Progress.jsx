
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import "../../styles/Member3.css";

const getDateKey = date => {
  const d = new Date(date);

  return new Date(
    d.getTime() - d.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);
};

function WeeklyChart({ title, unit, data, color, periodLabel }) {
  const max = Math.max(
    ...data.map(item => item.value),
    1
  );

  return (
    <div className="m3-card chart-card">

      <div className="m3-card-heading">
        <div>
          <span className="m3-section-label">
            {periodLabel.toUpperCase()}
          </span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="weekly-chart">

        {data.map(item => {

          const height = item.value > 0
            ? Math.max(5, (item.value / max) * 100)
            : 0;

          return (
            <div className="chart-column" key={item.date}>

              <span className="chart-value">
                {item.value > 0
                  ? `${Number(item.value.toFixed(1))}`
                  : "–"}
              </span>

              <div className="chart-bar-area">
                <div
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                    background: color
                  }}
                  title={`${item.value} ${unit}`}
                />
              </div>

              <span className="chart-day">
                {item.label}
              </span>

            </div>
          );
        })}

      </div>

      <p className="chart-unit">Values in {unit}</p>

    </div>
  );
}

export default function Progress({
  workouts = [],
  sleepEntries = []
}) {

  const meals = useSelector(
    state => state.meals?.entries || []
  );

  const waterEntries = useSelector(
    state => state.meals?.waterEntries || []
  );

  const moodEntries = useSelector(
    state => state.mood?.entries || []
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
          : date.getDate().toString()
      };
    });
  }, [period]);

  const aggregate = (records, valueFn) => {
    return days.map(day => ({
      ...day,
      value: valueFn(
        records.filter(record => {
          const recordDate = record.date || record.createdAt;

          return recordDate &&
            getDateKey(recordDate) === day.date;
        })
      )
    }));
  };

  // WATER INTAKE

  const waterData = aggregate(
    waterEntries,
    records =>
      records.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ) / 1000
  );

  // WORKOUT ACTIVITY

  const workoutData = aggregate(
    workouts,
    records =>
      records.reduce(
        (sum, item) => sum + Number(item.duration || 0),
        0
      )
  );

  // SLEEP DURATION

  const sleepData = aggregate(
    sleepEntries,
    records => {
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
    records => {
      if (!records.length) return 0;

      const moodScores = {
        Great: 5,
        Good: 4,
        Okay: 3,
        Low: 2,
        Bad: 1
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
    item => item.value > 0
  );

  const averageSleep = recordedSleepDays.length
    ? recordedSleepDays.reduce(
        (sum, item) => sum + item.value,
        0
      ) / recordedSleepDays.length
    : 0;

  const recordedMoodDays = moodData.filter(
    item => item.value > 0
  );

  const moodAverage = recordedMoodDays.length
    ? recordedMoodDays.reduce(
        (sum, item) => sum + item.value,
        0
      ) / recordedMoodDays.length
    : 0;

  const totalMeals = meals.filter(item => {
    const mealDate = item.date || item.createdAt;

    return mealDate &&
      days.some(day => getDateKey(mealDate) === day.date);
  }).length;

  const periodLabel = period === "week"
    ? "Last 7 days"
    : "Last 30 days";

  return (
    <div className="m3-page">

      <div className="m3-page-heading">
        <div>
          <span className="m3-eyebrow">YOUR WELLNESS JOURNEY</span>
          <h1>Progress</h1>
          <p>See how your daily habits are developing.</p>
        </div>
      </div>

      {/* PERIOD SELECTOR */}

      <div className="progress-period">

        <button
          className={period === "week" ? "active" : ""}
          onClick={() => setPeriod("week")}
        >
          7 Days
        </button>

        <button
          className={period === "month" ? "active" : ""}
          onClick={() => setPeriod("month")}
        >
          30 Days
        </button>

      </div>

      {/* SUMMARY */}

      <div className="progress-summary">

        <div className="m3-card summary-card">
          <span>💧</span>
          <small>Total water</small>
          <strong>{totalWater.toFixed(1)} L</strong>
        </div>

        <div className="m3-card summary-card">
          <span>🏋️</span>
          <small>Workout time</small>
          <strong>{Math.round(totalWorkout)} min</strong>
        </div>

        <div className="m3-card summary-card">
          <span>😴</span>
          <small>Average sleep</small>
          <strong>{averageSleep.toFixed(1)} hrs</strong>
        </div>

        <div className="m3-card summary-card">
          <span>🍽️</span>
          <small>Meals recorded</small>
          <strong>{totalMeals}</strong>
        </div>

      </div>

      {/* MOOD SUMMARY */}

      <div className="m3-card mood-summary-card">
        <div>
          <span className="m3-section-label">MOOD TREND</span>

          <h2>
            {moodAverage > 0
              ? `${moodAverage.toFixed(1)} / 5`
              : "No mood data"}
          </h2>

          <p>Average recorded mood · {periodLabel}</p>
        </div>

        <span className="mood-summary-emoji">
          {moodAverage >= 4 ? "😄" :
           moodAverage >= 3 ? "🙂" :
           moodAverage > 0 ? "😔" : "💭"}
        </span>
      </div>

      {/* CHARTS */}

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

    </div>
  );
}
