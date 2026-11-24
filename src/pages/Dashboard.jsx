
function Dashboard() {
  return (
    <div>
      <h1>Health Dashboard</h1>

      {/* Today's Summary */}
      <section>
        <h2>Today's Summary</h2>

        <div>
          <h3>Workout</h3>
          <p>Today's workout progress</p>
        </div>

        <div>
          <h3>Water</h3>
          <p>Water intake today</p>
        </div>

        <div>
          <h3>Sleep</h3>
          <p>Sleep duration</p>
        </div>

        <div>
          <h3>Meals</h3>
          <p>Meals logged today</p>
        </div>
      </section>

      {/* Today's Progress */}
      <section>
        <h2>Today's Progress</h2>

        <div>
          <label>Water Intake: 1200 / 2000 ml</label>
          <progress value="1200" max="2000"></progress>
        </div>

        <div>
          <label>Sleep: 6 / 8 hours</label>
          <progress value="6" max="8"></progress>
        </div>

        <div>
          <label>Workout: 30 / 60 minutes</label>
          <progress value="30" max="60"></progress>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2>Quick Actions</h2>

        <div>
          <a href="#profile">View Profile</a>
        </div>

        <div>
          <a href="#settings">Open Settings</a>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2>Recent Activity</h2>

        <ul>
          <li>Water intake recorded</li>
          <li>Workout completed</li>
          <li>Sleep duration recorded</li>
          <li>Meal logged</li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
