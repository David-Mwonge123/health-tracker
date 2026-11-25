
import React, { useState } from "react";

function WorkoutForm({ initialWorkout, onSave, onCancel }) {

  const [formData, setFormData] = useState({
    name: initialWorkout?.name || "",
    type: initialWorkout?.type || "Running",
    duration: initialWorkout?.duration || "",
    intensity: initialWorkout?.intensity || "Low",
    date: initialWorkout?.date || new Date().toISOString().split("T")[0],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      id: initialWorkout?.id ?? Date.now(),
      duration: Number(formData.duration),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Form Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {initialWorkout ? "Edit Workout" : "Add Workout"}
          </h2>

          <button onClick={onCancel} type="button">
           Done
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Workout Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workout Name
            </label>

            <input type="text"
              name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Morning Run" required className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          {/* Workout Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Workout Type </label>

            <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5">
              <option>Running</option>
              <option>Walking</option>
              <option>Cycling</option>
              <option>Gym</option>
              <option>Swimming</option>
              <option>Other</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) </label>

            <input type="number" name="duration" value={formData.duration}  onChange={handleChange} placeholder="e.g. 30" min="1" required className="w-full border border-gray-300 rounded-lg p-2.5"
            />
          </div>

          {/* Intensity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Intensity </label>

            <select name="intensity" value={formData.intensity} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5" >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Date </label>

            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100" > Cancel
            </button>

            <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" > {initialWorkout ? "Update" : "Save Workout"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
