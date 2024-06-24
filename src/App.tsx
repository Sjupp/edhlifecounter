import { useState } from "react";
import "./App.css";
import PlayArea from "./components/ui/playArea";
import Menu from "./components/ui/menu";
import PlayerSelect from "./components/ui/playerSelect";

function App() {
  const [numPlayers, setNumPlayers] = useState(5);
  const [currentScreen, setCurrentScreen] = useState<
    "menu" | "playerSelect" | "play"
  >("menu");



  const handleStartGame = (playerCount: number) => {
    setNumPlayers(playerCount);
    setCurrentScreen("play");
  };

  const handleMenu = () => {
    setCurrentScreen("menu");
  };

  const handlePlayerSelect = (playerCount: number) => {
    setNumPlayers(playerCount);
    setCurrentScreen("playerSelect");
  };

  return (
    <>
      {currentScreen === "menu" && <Menu numPlayers={numPlayers} setNumPlayers={setNumPlayers} onPlayerSelect={handlePlayerSelect} />}
      {currentScreen === "play" && (
        <PlayArea numPlayers={numPlayers} onMenu={handleMenu} />
      )}
      {currentScreen === "playerSelect" && (
        <PlayerSelect
          numPlayers={numPlayers}
          onConfirm={handleStartGame}
        />
      )}
    </>
  );
}

export default App;
