import Counter from "./counter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Minimize, MinusIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";

interface PlayAreaProps {
  numPlayers: number;
}

const PlayArea: React.FC<PlayAreaProps> = ({ numPlayers }) => {
    const initialCounts = Array(numPlayers).fill(40);
    const [counts, setCounts] = useState<number[]>(initialCounts);

    const handleIncrement = (i: number) => {
        setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] += 1;
            return newCounts;
        });
    };

    const handleDecrement = (i: number) => {
        setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] -= 1;
            return newCounts;
        });
    };

    const handleReset = () => {
        setCounts(initialCounts);
    };

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-${numPlayers} h-screen w-full bg-background text-foreground">
        <div className="fixed top-1/2 left-0 w-full h-48">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="circle-button">
                Menu
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogFooter className="flex items-center gap-6 justify-center">
                <AlertDialogCancel className="w-16 h-16">
                  <Minimize />
                </AlertDialogCancel>
                <Button variant="rounded" className="w-16 h-16">
                  <PlusIcon />
                </Button>
                <Button variant="rounded" className="w-16 h-16">
                  <MinusIcon />
                </Button>
                <Button
                  variant="rounded"
                  className="w-16 h-16"
                  onClick={handleReset}
                >
                  <RefreshCwIcon />
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {counts.map((count, i) => (
          <Counter
            key={i}
            rot={
              numPlayers <= 3
                ? (i + 1) % 3 === 0
                  ? "none"
                  : (i + 1) % 3 === 1
                  ? "90"
                  : "-90"
                : numPlayers >= 4
                ? (i + 1) % 5 === 0
                  ? "none"
                  : (i + 1) % 5 === 1 || (i + 1) % 5 === 3
                  ? "90"
                  : "-90"
                : "none"
            }
            count={count}
            onIncrement={() => handleIncrement(i)}
            onDecrement={() => handleDecrement(i)}
          />
        ))}
      </div>
    </>
  );
};

export default PlayArea;
