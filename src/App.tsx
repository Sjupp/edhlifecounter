import { useState } from "react";
import "./App.css";
import PlayArea from "./components/ui/playArea";
import Menu from "./components/ui/menu";
import PlayerSelect from "./components/ui/playerSelect";

function App() {
  const [numPlayers, setNumPlayers] = useState(5);
  const [startGame, setStartGame] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"menu" | "playerSelect" | "play">("menu");

  const handleStartGame = (players: number) => {
    setNumPlayers(players);
    setCurrentScreen("play");
  };

  const handleMenu = () => {
    setCurrentScreen("menu");
  };

  const handlePlayerSelect = (players: number) => {
    setNumPlayers(players);
    setCurrentScreen("playerSelect");
  };
  
  return (
    <>
      {currentScreen === "menu" && <Menu onPlayerSelect={handlePlayerSelect}/>}
      {currentScreen === "play" && <PlayArea numPlayers={numPlayers} onMenu={handleMenu} />}
      {currentScreen === "playerSelect" && <PlayerSelect numPlayers={numPlayers} onConfirm={handleStartGame}/>}
    </>
    );
  };


export default App;
