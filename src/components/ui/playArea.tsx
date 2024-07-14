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
import { useState } from "react";
import { playerData } from "@/data/players/playerData";
import PlayerBackground from "./PlayerBackground";

interface PlayAreaProps {
  numPlayers: number;
  onMenu: () => void;
}

const PlayArea: React.FC<PlayAreaProps> = ({ numPlayers, onMenu }) => {
  const [playerLifeCounters, setPlayerLifeCounters] = useState<number[]>(
    Array(numPlayers).fill(40)
  );
  const [players, setPlayers] = useState(numPlayers);
  const [showConfirm, setshowConfirm] = useState(false);
  const [switchOddPlayer, setSwitchOddPlayer] = useState(true);

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
    setPlayerLifeCounters(Array(players).fill(40));
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => prev + 1);
    setPlayerLifeCounters((prev) => [...prev, 40]);
  };
  const handleRemovePlayer = () => {
    setPlayers((prev) => prev - 1);
    setPlayerLifeCounters((prevCounts) => prevCounts.slice(0, -1));
  };

  const element = document.documentElement;

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-${numPlayers} h-screen w-full bg-background text-foreground">
        <div className="fixed top-2/3 w-full z-30 pointer-events-none">
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
                  disabled={players <= 2}
                >
                  <MinusIcon />
                </Button>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={handleAddPlayer}
                  disabled={players >= 5}
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
            myBgColor=""
            componentIndex={i}
            playerCount={players}
            switchOddPlayer={switchOddPlayer}
          >
            {/* <PlayerRotator componentIndex={i} playerCount={players}> */}
            <Counter
              componentIndex={i}
              playerCount={players}
              switchOddPlayer={switchOddPlayer}
              count={count}
              playerName={playerData[i].name}
              commander={playerData[i].commander}
              onIncrement={() => handleIncrement(i)}
              onDecrement={() => handleDecrement(i)}
            />
            {/* </PlayerRotator> */}
          </PlayerBackground>
        ))}
      </div>
    </>
  );
};

export default PlayArea;
