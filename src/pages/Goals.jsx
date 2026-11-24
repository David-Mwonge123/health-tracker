import { useSelector } from 'react-redux'

export default function Goals() {
  const goals = useSelector(state => state.settings.goals)
  const habits = useSelector(state => state.habits.habits)
  const workouts = useSelector(state => state.workouts.workouts || [])
  const water = useSelector(state => state.meals.water || 0)

  const habitsDone = habits.filter(h => h.done).length
  const habitsPct = habits.length ? Math.round((habitsDone / habits.length) * 100) : 0
  const waterPct = Math.min(100, Math.round((water / goals.water) * 100))
  const workoutPct = Math.min(100, Math.round((workouts.length / 5) * 100))

  const cards = [
    { label: 'Water Goal', value: `${water} / ${goals.water} glasses`, pct: waterPct },
    { label: 'Habits Today', value: `${habitsDone} / ${habits.length} done`, pct: habitsPct },
    { label: 'Workouts This Week', value: `${workouts.length} / 5 workouts`, pct: workoutPct },
    { label: 'Sleep Goal', value: `${goals.sleep} hrs target`, pct: 0 },
  ]

  return (
    <div >
      <h1>Goals</h1>
      <p>Goals come from Settings. Edit them in Settings page.</p>
      {cards.map(c => (
        <div key={c.label}>
          <div ><strong>{c.label}</strong><span>{c.value}</span></div>
          <div >
            <div />
          </div>
          <small>{c.pct}%</small>
        </div>
      ))}
    </div>
  )
}