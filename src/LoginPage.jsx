import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "./PlayerContext";

export default function LoginPage() {
  const { setPlayers } = useContext(PlayerContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [playerPassword, setPlayerPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    if (loading) return;
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (mode === "login") {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (
          storedUser &&
          storedUser.email === playerEmail &&
          storedUser.password === playerPassword
        ) {
          setPlayers([{ name: storedUser.name, email: storedUser.email }]);
          navigate("/game");
        } else {
          setError("Invalid email or password!");
        }
      } else if (mode === "register") {
        if (!playerName || !playerEmail || !playerPassword || !confirmPassword) {
          setError("Please fill all fields!");
          return;
        }

        if (playerPassword.length < 6) {
          setError("Password must be at least 6 characters!");
          return;
        }

        if (playerPassword !== confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

        const newUser = { name: playerName, email: playerEmail, password: playerPassword };
        localStorage.setItem("user", JSON.stringify(newUser));
        setMode("login");
        setPlayerName("");
        setPlayerEmail("");
        setPlayerPassword("");
        setConfirmPassword("");
        setError("Registration successful! Please login.");
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError("Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Navbar placeholder */}
      <div className="mb-8 w-full max-w-md">
      </div>

      {/* Login/Register Card */}
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-10 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        {mode === "register" && (
          <input
            type="text"
            placeholder="Full Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={playerEmail}
          onChange={(e) => setPlayerEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={playerPassword}
          onChange={(e) => setPlayerPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {mode === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold disabled:opacity-50"
        >
          {loading ? "Please Wait..." : mode === "login" ? "Login" : "Register"}
        </button>

        <p
          className="text-center mt-4 text-gray-600 cursor-pointer text-sm"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login"
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
