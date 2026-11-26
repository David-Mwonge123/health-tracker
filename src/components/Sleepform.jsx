
import React, { useState, useEffect } from "react";

function SleepForm({ initialSleep, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        date: "",
        bedtime: "",
        wakeUpTime: "",
        quality: "Good",
    });

    // Load existing record when editing
    useEffect(() => {
        if (initialSleep) {
            setFormData({
                date: initialSleep.date,
                bedtime: initialSleep.bedtime,
                wakeUpTime: initialSleep.wakeUpTime,
                quality: initialSleep.quality,
            });
        }
    }, [initialSleep]);

    // Calculate sleep duration
    const calculateDuration = () => {
        const { bedtime, wakeUpTime } = formData;

        if (!bedtime || !wakeUpTime) return 0;

        const [bedHour, bedMinute] = bedtime.split(":").map(Number);
        const [wakeHour, wakeMinute] = wakeUpTime.split(":").map(Number);

        let bedTime = bedHour * 60 + bedMinute;
        let wakeTime = wakeHour * 60 + wakeMinute;

        if (wakeTime <= bedTime) {
            wakeTime += 24 * 60;
        }

        return Number(((wakeTime - bedTime) / 60).toFixed(2));
    };

    const duration = calculateDuration();

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

        if (formData.bedtime === formData.wakeUpTime) {
            alert("Bedtime and wake-up time cannot be the same.");
            return;
        }

        onSave({
            ...formData,
            duration,
            id: initialSleep?.id ?? Date.now(),
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                    {initialSleep ? "Edit Sleep Record" : "Add Sleep Record"}
                </h2>

                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-500 hover:text-red-500"
                >
                    Close
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bedtime
                        </label>

                        <input
                            type="time"
                            name="bedtime"
                            value={formData.bedtime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Wake-up Time
                        </label>

                        <input
                            type="time"
                            name="wakeUpTime"
                            value={formData.wakeUpTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sleep Quality
                        </label>

                        <select
                            name="quality"
                            value={formData.quality}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="Poor">Poor</option>
                            <option value="Fair">Fair</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                    </div>

                </div>

                <div className="mt-5 bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                        Calculated Sleep Duration
                    </p>

                    <h3 className="text-xl font-bold text-green-700 mt-1">
                        {duration > 0 ? `${duration} hours` : "0 hours"}
                    </h3>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        {initialSleep ? "Update Record" : "Save Record"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SleepForm;
