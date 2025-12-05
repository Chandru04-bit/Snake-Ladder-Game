import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export function PlayerContextProvider({ children }) {
  const [players, setPlayers] = useState([]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
}

