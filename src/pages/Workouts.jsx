
import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {addWorkout, updateWorkout, deleteWorkout, } from "../features/workouts/workoutsSlice";

import {Dumbbell,
  Clock, CalendarCheck, Plus, Pencil,Trash2, Footprints, Bike, Waves, Activity, } from "lucide-react";

// Get local date
function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Format date
function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function Workouts() {
  const dispatch = useDispatch();

  // Get workouts from Redux
  const workouts = useSelector(
    (state) => state.workouts.workouts
  );

  // Control workout form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  // Calculate weekly statistics
  const weeklyData = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);

    // Start week on Monday
    const day = today.getDay();
    const difference = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(today.getDate() - difference);
    startOfWeek.setHours(0, 0, 0, 0);

    // Get all seven days
    const weekDays = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);

      return {
        date: getDateKey(date),
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        minutes: 0,
      };
    });

    // Get workouts for this week
    const weeklyWorkouts = workouts.filter((workout) =>
      weekDays.some((day) => day.date === workout.date)
    );

    // Calculate minutes for each day
    weekDays.forEach((day) => {
      day.minutes = weeklyWorkouts
        .filter((workout) => workout.date === day.date)
        .reduce(
          (total, workout) => total + Number(workout.duration),
          0
        );
    });

    const totalMinutes = weeklyWorkouts.reduce(
      (total, workout) => total + Number(workout.duration),
      0
    );

    const activeDays = new Set(
      weeklyWorkouts.map((workout) => workout.date)
    ).size;

    return {
      count: weeklyWorkouts.length,
      minutes: totalMinutes,
      activeDays,
      weekDays,
    };
  }, [workouts]);

  // Sort workouts by date
  const recentWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
  }, [workouts]);

  // Open form to add workout
  const handleAdd = useCallback(() => {
    setEditingWorkout(null);
    setIsFormOpen(true);
  }, []);

  // Open form to edit workout
  const handleEdit = useCallback((workout) => {
    setEditingWorkout(workout);
    setIsFormOpen(true);
  }, []);

  // Save workout
  const handleSave = useCallback(
    (workout) => {
      if (editingWorkout) {
        dispatch(updateWorkout(workout));
      } else {
        dispatch(addWorkout(workout));
      }

      setIsFormOpen(false);
      setEditingWorkout(null);
    },
    [dispatch, editingWorkout]
  );

  // Close form
  const handleCancel = useCallback(() => {
    setIsFormOpen(false);
    setEditingWorkout(null);
  }, []);

  // Delete workout
  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteWorkout(id));
    },
    [dispatch]
  );

  // Workout icons
  const workoutIcons = {
    Running: Footprints,
    Walking: Footprints,
    Cycling: Bike,
    Gym: Dumbbell,
    Swimming: Waves,
    Yoga: Activity,
    Other: Activity,
  };

  // Intensity colors
  const intensityStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
  };

  // Get highest workout duration for chart
  const maxMinutes = Math.max(
    ...weeklyData.weekDays.map((day) => day.minutes),
    1
  );

  return (
    <div className="space-y-7">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            My Workouts
          </h1>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          <Plus size={20} />
          Add Workout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Workouts */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Workouts This Week
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {weeklyData.count}
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-xl">
              <Dumbbell className="text-green-600" size={25} />
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Sessions completed this week
          </p>
        </div>

        {/* Duration */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Total Duration
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {weeklyData.minutes}
                <span className="text-sm text-gray-500 ml-1">
                  min
                </span>
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl">
              <Clock className="text-blue-600" size={25} />
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Total exercise time this week
          </p>
        </div>

        {/* Active Days */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">
                Active Days
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {weeklyData.activeDays}
              </h2>
            </div>

            <div className="bg-orange-100 p-3 rounded-xl">
              <CalendarCheck className="text-orange-500" size={25} />
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            Days you exercised this week
          </p>
        </div>

      </div>

      {/* Weekly Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Weekly Activity
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your workout duration throughout the week.
          </p>
        </div>

        <div className="flex items-end justify-between gap-3 h-40">

          {weeklyData.weekDays.map((day) => {
            const barHeight =
              day.minutes > 0
                ? Math.max((day.minutes / maxMinutes) * 100, 8)
                : 0;

            return (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center justify-end h-full gap-2"
              >
                <span className="text-xs text-gray-500">
                  {day.minutes > 0 ? `${day.minutes}m` : ""}
                </span>

                <div className="w-full h-28 bg-gray-100 rounded-t-lg flex items-end overflow-hidden">
                  <div
                    className="w-full bg-green-500 rounded-t-lg transition-all duration-300"
                    style={{
                      height: `${barHeight}%`,
                    }}
                  ></div>
                </div>

                <span className="text-xs text-gray-500">
                  {day.day}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Workouts
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Keep track of your fitness activities.
          </p>
        </div>

        {recentWorkouts.length === 0 ? (

          // Empty State
          <div className="text-center py-14 px-4">

            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="text-green-600" size={30} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              No workouts yet
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              You haven't recorded any workouts. Start your fitness journey by adding your first workout.
            </p>

            <button
              onClick={handleAdd}
              className="mt-5 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              <Plus size={18} />
              Add Your First Workout
            </button>

          </div>

        ) : (

          // Display Workout Cards
          <div className="p-5 space-y-4">

            {recentWorkouts.map((workout) => {
              const WorkoutIcon =
                workoutIcons[workout.type] || Activity;

              return (
                <div
                  key={workout.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                >

                  <div className="bg-green-100 p-3 rounded-xl w-fit">
                    <WorkoutIcon
                      size={25}
                      className="text-green-600"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {workout.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {workout.type} · {workout.duration} minutes
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(workout.date)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        intensityStyles[workout.intensity] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {workout.intensity}
                    </span>

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(workout)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit workout"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Delete workout"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* Workout Form */}
      {isFormOpen && (
        <WorkoutForm
          key={editingWorkout?.id ?? "new-workout"}
          initialWorkout={editingWorkout}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

    </div>
  );
}

export default Workouts;
