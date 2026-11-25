import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, clearError } from "../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(login({ email, password }));

    setTimeout(() => {
      const saved = localStorage.getItem("health-user");
      if (saved) navigate("/");
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-2">HEALTHTRACK</h1>
        <p className="text-gray-500 mb-6">Login to track your health</p>

        {error && (
          <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 outline-none focus:border-green-600"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4 outline-none focus:border-green-600"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700">
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          No account?{" "}
          <Link to="/signup" className="text-green-700 font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
