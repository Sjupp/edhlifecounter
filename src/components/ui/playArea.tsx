import Counter from "./counter";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Home,
  Minimize,
  MinusIcon,
  PlusIcon,
  RefreshCwIcon,
  Expand,
  Check,
  SwitchCamera,
} from "lucide-react";
import { useEffect, useState } from "react";
import PlayerBackground from "./PlayerBackground";
import {
  addPlayerToList,
  changePlayerHealthBy,
  player,
  removePlayerFromList,
  setAllPlayerHealth,
} from "@/data/players/playerData";

interface PlayAreaProps {
  players: player[];
  onMenu: () => void;
}

const PlayArea: React.FC<PlayAreaProps> = ({ players, onMenu }) => {
  const [showConfirm, setshowConfirm] = useState(false);
  const [switchOddPlayer, setSwitchOddPlayer] = useState(false);
  const [playerBGColors] = useState<string[]>(
    Array(players.length).fill("#FFF")
  );

  console.log(players);

  useEffect(() => {
    playerBGColors.map(
      (_, index) =>
        (playerBGColors[index] = Math.random().toString(16).substr(-6))
    );
    return () => {};
  }, []);

  function handleValueChange(playerId: number, valueChange) {
    changePlayerHealthBy(players, playerId, valueChange);
    console.log(players);
  }

  const handleReset = () => {
    setAllPlayerHealth(players, 40);
  };

  const handleAddPlayer = () => {
    addPlayerToList(players);
  };
  const handleRemovePlayer = () => {
    removePlayerFromList(players);
  };

  const element = document.documentElement;

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-${numPlayers} h-screen w-full bg-background text-foreground">
        <div className="fixed top-1/2 w-full z-30 pointer-events-none">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="circle-button pointer-events-auto"
              >
                Yeehaw
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col gap-4">
              <AlertDialogFooter className="flex items-center gap-6 justify-center">
                <AlertDialogCancel
                  onClick={() => setshowConfirm(false)}
                  className="w-16 h-16"
                >
                  <Minimize />
                </AlertDialogCancel>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={handleRemovePlayer}
                  disabled={players.length <= 2}
                >
                  <MinusIcon />
                </Button>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={handleAddPlayer}
                  disabled={players.length >= 5}
                >
                  <PlusIcon />
                </Button>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={handleReset}
                >
                  <RefreshCwIcon />
                </Button>
                {showConfirm ? (
                  <Button
                    variant="rounded"
                    className="w-16 h-16"
                    onClick={onMenu}
                  >
                    <Check />
                  </Button>
                ) : (
                  <Button
                    variant="rounded"
                    className="w-16 h-16"
                    onClick={() => setshowConfirm(true)}
                  >
                    <Home />
                  </Button>
                )}
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={() => setSwitchOddPlayer(!switchOddPlayer)}
                >
                  <SwitchCamera />
                </Button>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={() => element.requestFullscreen()}
                >
                  <Expand />
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {players.map((player, mapIndex) => (
          <PlayerBackground
            key={mapIndex}
            myBgColor={playerBGColors[mapIndex]}
            componentIndex={mapIndex}
            playerCount={players.length}
            switchOddPlayer={switchOddPlayer}
          >
            <Counter
              componentIndex={mapIndex}
              player={player}
              playerCount={players.length}
              switchOddPlayer={switchOddPlayer}
              onIncrement={() => handleValueChange(mapIndex, 1)}
              onDecrement={() => handleValueChange(mapIndex, -1)}
            />
          </PlayerBackground>
        ))}
      </div>
    </>
  );
};

export default PlayArea;
