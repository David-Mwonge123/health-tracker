# HEALTHTRACK — Personal Health & Wellness Tracker

HEALTHTRACK is a web app that helps users track their daily health habits in one place. Users can log workouts, meals, water, sleep, mood, and habits, set daily goals, view their progress over time, and get reminders to stay on track.

All data is stored locally in the browser using Redux + localStorage, so the app works without a backend and keeps working after refresh.

## Features

### Dashboard
- Today's summary: workouts, water, meals, sleep, and mood for today
- Progress bars for daily water and sleep goals
- Quick actions to jump to Workouts, Meals, Mood, Habits, and more
- Recent activity feed from all trackers

### Workouts
- Add, edit, and delete workouts
- Workout type, duration, intensity, and date
- Weekly summary: total sessions, total minutes, active days
- Weekly activity bar chart

### Sleep Log
- Log bedtime, wake time, hours, and sleep quality
- View average sleep and recent sleep history
- Sleep duration tracked in Progress charts

### Meals & Water
- Add meals with name, calories, and date
- Water counter with +/- buttons
- Daily water goal progress bar
- List of today's meals

### Mood Journal
- Log daily mood with emoji, energy, stress, and notes
- View today's mood entries
- Mood history and mood trend chart

### Habits
- Add habits and check them off for today
- Streak counter that increases on check and decreases on uncheck
- Delete habits

### Goals
- Shows goals from Settings: water goal and sleep goal
- Weekly progress percentage for each goal
- Visual progress bars

### Reminders
- Add reminders with title, time, and repeat (Daily / Weekly / Once)
- On / Off toggle for each reminder
- "Up Next" reminder card
- In-app alert when a reminder time is reached

### Progress
- Weekly charts for workouts, water, sleep, and mood trend
- Switch between 7 Days and 30 Days views
- Summary cards: total water, workout time, average sleep, meals recorded
- Average mood score (1–5)

### Profile & Settings
- Update profile name (syncs to Dashboard greeting)
- Set daily water goal and daily sleep goal
- Light / Dark theme
- Clear all health data (keeps account logged in)

### Authentication (Demo)
- Signup and Login with local accounts
- Accounts are stored in localStorage for demo purposes
- Note: This is a school project demo. Passwords are not hashed and auth is not production-secure.

### Tech Stack

- **React** — UI components
- **React Router** — Page navigation
- **Redux Toolkit** — Global state management
- **Tailwind CSS** — Styling
- **localStorage** — Data persistence (no backend)

## Team Roles
### Mark — Dashboard + Profile + Settings
- Dashboard: Today's summary, progress bars, quick actions, recent activity
- Reads data from everyone else's slices to show today's overview
- Settings: Profile, daily goals, theme, clear data
- Profile: Update name, view account info

### Mercy — Workouts (CRUD) + Sleep Log + UI Styling
- Workouts: Add / edit / delete workout, type, duration, intensity, weekly total
- Sleep Log: Bedtime, wake time, hours, quality, average sleep
- UI: Styled Navbar + global CSS

### Noah — Meals & Water + Mood + Progress
- Meals & Water: Water counter +/-, add meal, list today's meals
- Mood Journal: Mood emoji, energy, stress, notes, history
- Progress / Charts: Weekly charts for workouts, water, sleep, mood trend

### Mwonge — Habits + Goals + Reminders + Project Setup
- Project Setup: Initial setup, Redux store, merged all team PRs
- Habits: Add habit, check off today, streak counter
- Goals: Show goals from Settings, weekly progress %
- Reminders: Add reminder, time, repeat, on/off toggle