import "../App.css";
function Dashboard() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Health Dashboard</h1>
          <p>Track your daily health and wellness progress.</p>
        </div>
      </header>

      {/* Today's Summary */}
      <section className="dashboard-section">
        <h2>Today's Summary</h2>

        <div className="summary-grid">
          <article className="summary-card">
            <span>🏋️</span>
            <h3>Workout</h3>
            <p>30 minutes</p>
          </article>

          <article className="summary-card">
            <span>💧</span>
            <h3>Water</h3>
            <p>1,200 ml</p>
          </article>

          <article className="summary-card">
            <span>😴</span>
            <h3>Sleep</h3>
            <p>6 hours</p>
          </article>

          <article className="summary-card">
            <span>🥗</span>
            <h3>Meals</h3>
            <p>3 meals</p>
          </article>
        </div>
      </section>

      {/* Today's Progress */}
      <section className="dashboard-section">
        <h2>Today's Progress</h2>

        <div className="progress-grid">
          <article className="progress-card">
            <h3>Water Intake</h3>
            <p>1,200 / 2,000 ml</p>
            <progress value="1200" max="2000" />
          </article>

          <article className="progress-card">
            <h3>Sleep</h3>
            <p>6 / 8 hours</p>
            <progress value="6" max="8" />
          </article>

          <article className="progress-card">
            <h3>Workout</h3>
            <p>30 / 60 minutes</p>
            <progress value="30" max="60" />
          </article>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <a href="#profile">👤 View Profile</a>
          <a href="#settings">⚙️ Open Settings</a>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="dashboard-section">
        <h2>Recent Activity</h2>

        <div className="activity-card">
          <ul>
            <li>💧 Water intake recorded</li>
            <li>🏋️ Workout completed</li>
            <li>😴 Sleep duration recorded</li>
            <li>🥗 Meal logged</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
