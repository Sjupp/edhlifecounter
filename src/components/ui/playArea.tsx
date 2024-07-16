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
import { player } from "@/data/players/playerData";

interface PlayAreaProps {
  players: player[];
  numPlayers: number;
  onMenu: () => void;
}

const PlayArea: React.FC<PlayAreaProps> = ({ players, numPlayers, onMenu }) => {
  const [playerLifeCounters, setPlayerLifeCounters] = useState<number[]>(
    Array(numPlayers).fill(40)
  );
  const [playerCount, setPlayerCount] = useState(numPlayers);
  const [showConfirm, setshowConfirm] = useState(false);
  const [switchOddPlayer, setSwitchOddPlayer] = useState(false);
  const [playerBGColors] = useState<string[]>(Array(numPlayers).fill("#FFF"));

  useEffect(() => {
    playerBGColors.map(
      (_, index) =>
        (playerBGColors[index] = Math.random().toString(16).substr(-6))
    );
    return () => {};
  }, []);

  const handleIncrement = (i: number) => {
    setPlayerLifeCounters((prev) => {
      const newCounts = [...prev];
      newCounts[i] += 1;
      return newCounts;
    });
  };

  const handleDecrement = (i: number) => {
    setPlayerLifeCounters((prev) => {
      const newCounts = [...prev];
      newCounts[i] -= 1;
      return newCounts;
    });
  };

  const handleReset = () => {
    setPlayerLifeCounters(Array(playerCount).fill(40));
  };

  const handleAddPlayer = () => {
    setPlayerCount((prev) => prev + 1);
    setPlayerLifeCounters((prev) => [...prev, 40]);
  };
  const handleRemovePlayer = () => {
    setPlayerCount((prev) => prev - 1);
    setPlayerLifeCounters((prevCounts) => prevCounts.slice(0, -1));
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
        {playerLifeCounters.map((count, i) => (
          <PlayerBackground
            key={i}
            myBgColor={playerBGColors[i]}
            componentIndex={i}
            playerCount={playerCount}
            switchOddPlayer={switchOddPlayer}
          >
            <Counter
              componentIndex={i}
              playerCount={playerCount}
              switchOddPlayer={switchOddPlayer}
              count={count}
              playerName={players[i].name}
              commander={players[i].commander}
              onIncrement={() => handleIncrement(i)}
              onDecrement={() => handleDecrement(i)}
            />
          </PlayerBackground>
        ))}
      </div>
    </>
  );
};

export default PlayArea;
