
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateName } from "../features/settings/settingsSlice";

function Profile() {
  // Read the current name from Redux
  const name = useSelector((state) => state.settings.name);

  // Access Redux dispatch
  const dispatch = useDispatch();

  // Store the name being typed
  const [newName, setNewName] = useState(name);

  // Update the name in Redux
  function handleUpdate() {
    if (newName.trim() === "") {
      return;
    }

    dispatch(updateName(newName.trim()));
  }

  return (
    <div>
      <h2>My Profile</h2>

      <p>Current name: {name}</p>

      <input
        type="text"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
        placeholder="Enter your name"
      />

      <button onClick={handleUpdate}>
        Update Name
      </button>
    </div>
  );
}

export default Profile;
