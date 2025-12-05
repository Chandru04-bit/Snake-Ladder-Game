import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import GamePage from "./GamePage";
import BoardPage from "./BoardPage";
import Footer from "./Footer"; // ✅ Make sure Footer.jsx exists in src/
import { PlayerContextProvider, PlayerContext } from "./PlayerContext";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { players } = useContext(PlayerContext);
  const isLoggedIn = players.length > 0;
  return isLoggedIn ? children : <Navigate to="/" />;
}

function AppRoutes() {
  const { players, setPlayers } = useContext(PlayerContext);
  const isLoggedIn = players.length > 0;

  const handleLogout = () => setPlayers([]);

  return (
    <>
      {/* Navbar always visible */}
      <Navbar isLoggedIn={isLoggedIn} players={players} onLogout={handleLogout} />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/play"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <PlayerContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </PlayerContextProvider>
  );
}

