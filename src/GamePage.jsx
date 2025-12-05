import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "./PlayerContext";

import Snake from "./assets/img-4.jpg";
import Dice from "./assets/img-1.jpg";
import Ladder from "./assets/img-3.jpg";

export default function GamePage() {
  const { players } = useContext(PlayerContext);
  const navigate = useNavigate();

  return (
    <div className="w-full font-sans bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <section className="relative bg-white py-20 px-6 md:px-12 shadow-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            🎲 Welcome {players.map(p => p.name).join(" & ")} to Snake & Ladder!
          </h1>
          <p className="text-md md:text-lg text-gray-600 mb-8 leading-relaxed">
            The ultimate online classic board game experience. Roll the dice, climb ladders, avoid snakes, and compete to reach the finish first!
          </p>
          <button
            onClick={() => navigate("/play")}
            className="bg-green-600 text-white font-medium py-3 px-8 rounded-full text-lg shadow-md hover:bg-green-700 transition-colors"
          >
            ▶️ Start Playing
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6">
            About Snake & Ladder
          </h2>
          <p className="text-gray-600 mb-3">
            Snake & Ladder is a fun and strategic board game for 2 or more players. Reach the final square before your opponents by rolling the dice and moving your token along the board.
          </p>
          <p className="text-gray-600 mb-3">
            Beware of snakes! Landing on one will send you back. Climbing ladders helps you advance faster and gain an advantage.
          </p>
          <p className="text-gray-600">
            Play online with friends or other players worldwide. Strategy, luck, and timing all play a role in winning!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-4">
            Game Features
          </h2>
          <p className="text-gray-600 md:text-md">
            Everything you love about Snake & Ladder, now in a modern, online version.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-5 shadow hover:shadow-md transition-shadow text-center">
            <img src={Dice} alt="Dice" className="w-full h-40 object-cover rounded-xl mb-3"/>
            <h3 className="text-lg font-semibold text-green-700 mb-1">🎲 Roll the Dice</h3>
            <p className="text-gray-600 text-sm">Roll the dice and move your token. Every roll could bring you closer to victory or send you backward!</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow hover:shadow-md transition-shadow text-center">
            <img src={Snake} alt="Snake" className="w-full h-40 object-cover rounded-xl mb-3"/>
            <h3 className="text-lg font-semibold text-green-700 mb-1">🐍 Avoid Snakes</h3>
            <p className="text-gray-600 text-sm">Snakes are obstacles on your path. Landing on one can send you back several squares.</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow hover:shadow-md transition-shadow text-center">
            <img src={Ladder} alt="Ladder" className="w-full h-40 object-cover rounded-xl mb-3"/>
            <h3 className="text-lg font-semibold text-green-700 mb-1">🪜 Climb Ladders</h3>
            <p className="text-gray-600 text-sm">Ladders help you jump ahead and gain an advantage over opponents. Use them wisely!</p>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 text-center mb-8">
            How to Play
          </h2>
          <ul className="list-decimal list-inside text-gray-700 md:text-md space-y-2">
            <li>Each player rolls the dice to move their token along the board.</li>
            <li>If you land on a snake's head, you slide back to the tail.</li>
            <li>If you land at the bottom of a ladder, climb to the top and advance faster.</li>
            <li>The first player to reach the last square wins the game.</li>
            <li>Plan your moves strategically, but remember, luck plays a big role!</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
