import { useState } from "react";
import "./App.css";
import PlayArea from "./components/ui/playArea";

import Menu from "./components/ui/menu";

function App() {
  const [numPlayers, setNumPlayers] = useState(5);
  const [startGame, setStartGame] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"menu" | "play">("menu");

  const handleStartGame = (players: number) => {
    setNumPlayers(players);
    setCurrentScreen("play");
  };

  const handleMenu = () => {
    setCurrentScreen("menu");
  };
  
  return (
    <>
      {currentScreen === "menu" && <Menu onStartGame={handleStartGame}/>}
      {currentScreen === "play" && <PlayArea numPlayers={numPlayers} onMenu={handleMenu} />}
    </>
    );
  };


export default App;
