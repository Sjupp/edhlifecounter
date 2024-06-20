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

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Player 1",
    },
    {
      id: 2,
      name: "Player 2",
    },
    {
      id: 3,
      name: "Player 3",
    },
    {
      id: 4,
      name: "Player 4",
    },
    {
      id: 5,
      name: "Player 5",
    },
  ]);

  const updatePlayer = (id, newName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, name: newName } : player
      )
    );
  };

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
          players={players}
          onConfirm={handleStartGame}
        />
      )}
    </>
  );
}

export default App;
