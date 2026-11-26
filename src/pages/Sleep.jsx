
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSleepRecord, updateSleepRecord, deleteSleepRecord, } from "../features/sleep/sleepSlice";

import SleepForm from "../components/Sleepform";

function Sleep() {
  const dispatch = useDispatch();

  // Get sleep records from Redux
  const sleepRecords = useSelector(
    (state) => state.sleep.sleepRecords
  );

  // Form visibility
  const [showForm, setShowForm] = useState(false);

  const [editingSleep, setEditingSleep] = useState(null);

  // Open form for adding a record
  const handleAddClick = () => {
    setEditingSleep(null);
    setShowForm(true);
  };

  // Save or update sleep record
  const handleSave = (sleepData) => {
    if (editingSleep) {
      dispatch(updateSleepRecord(sleepData));
    } else {
      dispatch(addSleepRecord(sleepData));
    }

    setShowForm(false);
    setEditingSleep(null);
  };

  // Open form for editing
  const handleEdit = (record) => {
    setEditingSleep(record);
    setShowForm(true);
  };

  // Delete sleep record
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sleep record?"
    );

    if (confirmDelete) {
      dispatch(deleteSleepRecord(id));
    }
  };

  // Calculate average sleep duration
  const averageSleep =
    sleepRecords.length > 0
      ? (
        sleepRecords.reduce(
          (total, record) => total + Number(record.duration),
          0
        ) / sleepRecords.length
      ).toFixed(1)
      : 0;

  // Calculate average sleep quality
  const qualityScores = {
    Poor: 1,
    Fair: 2,
    Good: 3,
    Excellent: 4,
  };

  const averageQuality =
    sleepRecords.length > 0
      ? sleepRecords.reduce(
        (total, record) =>
          total + (qualityScores[record.quality] || 0),
        0
      ) / sleepRecords.length
      : 0;

  let qualityLabel = "No records";

  if (averageQuality > 0 && averageQuality < 1.5) {
    qualityLabel = "Poor";
  } else if (averageQuality >= 1.5 && averageQuality < 2.5) {
    qualityLabel = "Fair";
  } else if (averageQuality >= 2.5 && averageQuality < 3.5) {
    qualityLabel = "Good";
  } else if (averageQuality >= 3.5) {
    qualityLabel = "Excellent";
  }

  // Sort records by date
  const sortedRecords = [...sleepRecords].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  // Format time
  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(Number(hour), Number(minute));

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-700"> Sleep Log </h1>

        </div>

        <button
          onClick={handleAddClick}className="mt-4 sm:mt-0 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"  > Add Sleep
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Average Sleep */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Average Sleep </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2"> {averageSleep} hrs </h2>

          <p className="text-sm text-gray-400 mt-1"> Average duration  </p>
        </div>

        {/* Sleep Goal */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500"> Sleep Goal</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2"> 8 hrs </h2>

          <p className="text-sm text-gray-400 mt-1"> Daily target </p>
        </div>

        {/* Sleep Quality */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Average Sleep Quality</p>

          <h2 className="text-2xl font-bold text-green-600 mt-2"> {qualityLabel} </h2>

          <p className="text-sm text-gray-400 mt-1"> Based on saved records</p>
        </div>

        {/* Total Records */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Records </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2"> {sleepRecords.length} </h2>

          <p className="text-sm text-gray-400 mt-1">Saved sleep entries </p>
        </div>

      </div>

      {/* Sleep Form */}
      {showForm && (
        <SleepForm
          initialSleep={editingSleep}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingSleep(null);
          }}
        />
      )}

      {/* Sleep History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">

        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Sleep History</h2>

          <p className="text-sm text-gray-500 mt-1">Review and manage your previous sleep records. </p>
        </div>

        {sortedRecords.length === 0 ? (

          <div className="p-10 text-center">
            <p className="text-gray-500"> No sleep records yet. </p>

            <p className="text-sm text-gray-400 mt-1"> Click Add Sleep to record your first sleep entry. </p>
          </div>

        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Bedtime</th>
                  <th className="p-4">Wake-up</th>
                  <th className="p-4">Hours Slept</th>
                  <th className="p-4">Quality</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedRecords.map((record) => (

                  <tr
                    key={record.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      {new Date(
                        record.date + "T00:00:00"
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      {formatTime(record.bedtime)}
                    </td>

                    <td className="p-4 text-gray-700 whitespace-nowrap">
                      {formatTime(record.wakeUpTime)}
                    </td>

                    <td className="p-4 font-medium text-gray-800 whitespace-nowrap">
                      {record.duration} hrs
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${record.quality === "Excellent"
                            ? "bg-green-100 text-green-700"
                            : record.quality === "Good"
                              ? "bg-blue-100 text-blue-700"
                              : record.quality === "Fair"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                      >
                        {record.quality}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex gap-3">

                        <button
                          onClick={() => handleEdit(record)} className="p-2  text-sm text-green-600 hover:bg-green-50 rounded-lg"> Edit
                        </button>

                        <button onClick={() => handleDelete(record.id)} className="p-2  text-sm text-red-600 hover:bg-red-50 rounded-lg" >Delete
                        </button>

                      </div>
                    </td>
                  </tr>

                ))}
              </tbody>

            </table>
          </div>

        )}

      </div>

    </div>
  );
}

export default Sleep;
