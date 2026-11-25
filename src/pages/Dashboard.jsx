
function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-700">Health Dashboard</h1>
          <p className="text-gray-500 mt-2">Track your daily health and wellness progress.</p>
        </div>
      </header>

      {/* Today's Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Summary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <article className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <span className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">🏋️</span>
            <h3 className="text-gray-500 mt-4">Workout</h3>
            <p>30 minutes</p>
          </article>

          <article className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <span className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">💧</span>
            <h3 className="text-gray-500 mt-4">Water</h3>
            <p>1,200 ml</p>
          </article>

          <article className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <span className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">😴</span>
            <h3 className="text-gray-500 mt-4">Sleep</h3>
            <p>6 hours</p>
          </article>

          <article className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <span className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-2xl">🥗</span>
            <h3 className="text-gray-500 mt-4">Meals</h3>
            <p>3 meals</p>
          </article>
        </div>
      </section>

      {/* Today's Progress */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Progress</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-700">Water Intake</h3>
            <p>1,200 / 2,000 ml</p>
            <progress value="1200" max="2000" />
          </article>

          <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-700">Sleep</h3>
            <p>6 / 8 hours</p>
            <progress value="6" max="8" />
          </article>

          <article className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-700">Workout</h3>
            <p>30 / 60 minutes</p>
            <progress value="30" max="60" />
          </article>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4">
          <a href="#profile"  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition duration-200">👤 View Profile</a>
          <a href="#settings" className="bg-green-50 hover:bg-green-100 text-gray-500 hover:text-green-700 px-5 py-3 rounded-lg font-medium transition duration-200">⚙️ Open Settings</a>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <ul className="space-y-4">
            <li >💧 Water intake recorded</li>
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
