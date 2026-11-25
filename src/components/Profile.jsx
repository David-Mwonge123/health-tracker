import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateName } from "../features/settings/settingsSlice";

function Profile() {
  const name = useSelector((state) => state.settings.name);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [newName, setNewName] = useState(name);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  // Update the name in Redux
  function handleUpdate() {
    if (newName.trim() === "") {
      return;
    }
    dispatch(updateName(newName.trim()));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const initial = (name || "U").charAt(0).toUpperCase();

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-8">My Profile</h1>

      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
            {initial}
          </div>
          <div>
            <p className="text-sm text-gray-500">Current name</p>
            <p className="text-xl font-bold text-gray-800">
              {name || "No name yet"}
            </p>
            {user?.email && (
              <p className="text-sm text-gray-500">{user.email}</p>
            )}
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-2">Current name: {name}</p>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          Enter your name
        </label>
        <input
          type="text"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
            setSaved(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          placeholder="Enter your name"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition duration-200"
        >
          Update Name
        </button>

        {saved && (
          <p className="bg-green-50 text-green-700 text-sm font-medium text-center p-3 rounded-lg mt-4">
            Name updated successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
