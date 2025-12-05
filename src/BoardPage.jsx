// App.jsx
import React, { useState, useReducer, useMemo, useRef, useEffect, createContext, useContext } from "react";
import diceRollSound from "./assets/dice.mp3";
import moveSoundFile from "./assets/move.mp3";
import snakeSoundFile from "./assets/snake.mp3";
import winSoundFile from "./assets/win.mp3";

// 🐍 Ladder & Snakes
const snakes = {16:6,48:30,62:19,64:60,79:19,93:68,95:24,98:78};
const ladders = {1:38,4:14,9:31,21:42,28:84,36:44,51:67,71:91,80:100};

// 🎮 Context
const PlayerContext = createContext();
export function usePlayer() { return useContext(PlayerContext); }

// 🔁 Game Reducer
const initialState = {
  dice: null,
  winner: null,
  message: '',
  snakeBlink: { cell: null, destination: null },
  diceHistory: [[],[]],
  movesCount: [0,0]
};

function reducer(state, action) {
  switch(action.type) {
    case "ROLL_DICE":
      const history = [...state.diceHistory];
      history[action.player].push(action.dice);
      const moves = [...state.movesCount];
      moves[action.player]++;
      return {...state, dice: action.dice, diceHistory: history, movesCount: moves, message: '', snakeBlink:{cell:null,destination:null}};
    case "SET_WINNER": return {...state, winner: action.winner};
    case "SET_MESSAGE": return {...state, message: action.message};
    case "BLINK_SNAKE": return {...state, snakeBlink:{cell:action.cell,destination:action.destination}};
    case "CLEAR_BLINK": return {...state, snakeBlink:{cell:null,destination:null}};
    default: return state;
  }
}

const rollDice = () => Math.floor(Math.random()*6)+1;

export default function SnakeLadderAdvanced() {
  const [playerNames,setPlayerNames] = useState(['','']);
  const [positions,setPositions] = useState([1,1]);
  const [currentPlayer,setCurrentPlayer] = useState(0);
  const [isGameStarted,setIsGameStarted] = useState(false);
  const [state,dispatch] = useReducer(reducer,initialState);

  const diceAudio = useRef(new Audio(diceRollSound));
  const moveAudio = useRef(new Audio(moveSoundFile));
  const snakeAudio = useRef(new Audio(snakeSoundFile));
  const winAudio = useRef(new Audio(winSoundFile));

  useEffect(()=>{
    if(state.snakeBlink.cell){
      const timer = setTimeout(()=>dispatch({type:"CLEAR_BLINK"}),3000);
      return ()=>clearTimeout(timer);
    }
  },[state.snakeBlink.cell]);

  const handleRoll = () => {
    if(state.winner) return;
    diceAudio.current.play();
    const roll = rollDice();
    dispatch({type:"ROLL_DICE",dice:roll,player:currentPlayer});

    let newPositions = [...positions];
    let newPos = newPositions[currentPlayer]+roll;
    if(newPos>100) newPos=newPositions[currentPlayer];
    let finalDest = newPos;

    if(ladders[newPos]) {
      finalDest = ladders[newPos];
      dispatch({type:"SET_MESSAGE",message:`🪜 Climbed to ${finalDest}`});
    } else if(snakes[newPos]) {
      finalDest = snakes[newPos];
      dispatch({type:"SET_MESSAGE",message:`🐍 Snake bit! Sent to ${finalDest}`});
      dispatch({type:"BLINK_SNAKE",cell:newPos,destination:finalDest});
      snakeAudio.current.play();
    }

    newPositions[currentPlayer]=finalDest;
    setPositions(newPositions);
    moveAudio.current.play();

    if(finalDest===100){
      dispatch({type:"SET_WINNER",winner:playerNames[currentPlayer]});
      winAudio.current.play();
      // Save winner to localStorage leaderboard
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard")||"[]");
      leaderboard.push({name:playerNames[currentPlayer],date:new Date().toLocaleString()});
      localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
    } else setCurrentPlayer((currentPlayer+1)%playerNames.length);
  };

  const memoizedBoard = useMemo(()=>{
    return [...Array(100)].map((_,i)=>{
      const num = 100-i;
      const playersOnCell = playerNames.map((name,idx)=>positions[idx]===num ? <span key={idx}>{idx===0?"🔵":"🔴"}</span>:null);
      const icon = snakes[num]? "🐍": ladders[num]? "🪜": null;
      const showBlink = state.snakeBlink.cell===num? <span className="blink-text absolute bottom-0 text-red-600">↓ {state.snakeBlink.destination}</span>:null;
      return <div key={num} className={`w-12 h-12 border flex flex-col justify-center items-center relative text-xs ${snakes[num]?"bg-red-100":ladders[num]?"bg-green-100":num%2===0?"bg-blue-50":"bg-green-50"}`}>{playersOnCell}{icon}{showBlink}</div>
    });
  },[positions,state.snakeBlink]);

  const handleStartGame=()=>{ if(playerNames[0]&&playerNames[1]) setIsGameStarted(true); }

  // Leaderboard from localStorage
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")||"[]").slice(-5).reverse();

  return(
    <PlayerContext.Provider value={{playerNames}}>
      <div className="max-w-6xl mx-auto p-6 font-sans space-y-12">
        {/* Hero */}
        <section className="bg-white p-12 rounded-2xl shadow text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">🎲 Snake & Ladder Advanced</h1>
          <p className="text-gray-700 mb-6">Play with friends and compete on leaderboard!</p>
          {!isGameStarted && <div className="flex justify-center gap-4 mb-4">
            <input placeholder="Player 1" className="border p-2 rounded" onChange={e=>setPlayerNames([e.target.value,playerNames[1]])}/>
            <input placeholder="Player 2" className="border p-2 rounded" onChange={e=>setPlayerNames([playerNames[0],e.target.value])}/>
          </div>}
          {!isGameStarted && <button onClick={handleStartGame} className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded">Start Game</button>}
        </section>

        {/* Game Board */}
        {isGameStarted && <section>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Game Board</h2>
          <div className="grid grid-cols-10 border border-gray-400">{memoizedBoard}</div>
          <div className="mt-4 text-center">
            {state.winner? <h3 className="text-2xl text-green-800 font-bold">🎉 {state.winner} Wins!</h3>: <>
              <p>{playerNames[currentPlayer]}'s turn</p>
              <button onClick={handleRoll} className="mt-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded">Roll Dice 🎲</button>
            </>}
          </div>
        </section>}

        {/* Leaderboard */}
        <section className="bg-green-50 p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-green-800 mb-4">🏆 Leaderboard (Last 5 Wins)</h2>
          <ul className="list-disc list-inside text-gray-700">
            {leaderboard.length===0? <li>No games played yet</li>:
              leaderboard.map((entry,i)=><li key={i}>{entry.name} - {entry.date}</li>)
            }
          </ul>
        </section>
      </div>
    </PlayerContext.Provider>
  );
}

