import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "./PlayerContext";

export default function Navbar({ isLoggedIn, players, onLogout }) {
  const navigate = useNavigate();
  const { setPlayers } = useContext(PlayerContext);

  const handleLogout = () => {
    setPlayers([]);
    onLogout && onLogout();
    navigate("/"); // redirect to login page
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Logo / Title */}
      <div
        className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition"
        onClick={() => navigate("/")}
      >
        🐍 Snake & Ladder
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="font-medium bg-green-600 px-3 py-1 rounded-lg shadow-inner">
              Welcome,{" "}
              {players.map((p) => (
                <span key={p.name} className="text-yellow-300 font-semibold">
                  {p.name}
                </span>
              )).reduce((prev, curr) => [prev, " & ", curr])}
            </span>

            <Link
              to="/game"
              className="hover:bg-green-800 px-3 py-1 rounded transition"
            >
              Game
            </Link>
            <Link
              to="/play"
              className="hover:bg-green-800 px-3 py-1 rounded transition"
            >
              Board
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white text-green-700 font-semibold px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="bg-white text-green-700 font-semibold px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
