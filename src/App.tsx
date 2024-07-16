import { useState } from "react";
import "./App.css";
import PlayArea from "./components/ui/playArea";
import Menu from "./components/ui/menu";
import PlayerSelect from "./components/ui/playerSelect";
import { createNewPlayer, player } from "./data/players/playerData";

function App() {
  const [players, setPlayers] = useState<player[]>();
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
    const newPlayerList = Array.from({ length: playerCount }, (_, index) =>
      createNewPlayer(index)
    );
    setPlayers(newPlayerList);

    setNumPlayers(playerCount);
    setCurrentScreen("playerSelect");
  };

  return (
    <>
      {currentScreen === "menu" && (
        <Menu
          numPlayers={numPlayers}
          setNumPlayers={setNumPlayers}
          onPlayerSelect={handlePlayerSelect}
        />
      )}
      {currentScreen === "play" && (
        <PlayArea players={players} onMenu={handleMenu} />
      )}
      {currentScreen === "playerSelect" && (
        <PlayerSelect players={players} onConfirm={handleStartGame} />
      )}
    </>
  );
}

export default App;
