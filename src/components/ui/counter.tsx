import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./button";
import MyTest from "./MyTest";
import { player } from "@/data/players/playerData";

interface CounterProps {
  player: player;
  playerCount: number;
  componentIndex: number;
  switchOddPlayer: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter = ({
  player,
  playerCount,
  componentIndex,
  switchOddPlayer,
  onIncrement,
  onDecrement,
}: CounterProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const [pressType, setPresstype] = useState<"increment" | "decrement" | null>(
    null
  );
  const [lifeDiff, setLifeDiff] = useState<number>(0);
  const [diffTimer, setDiffTimer] = useState(null);
  const [lifeCountSnapshot, setLifeCountSnapshot] = useState<number | null>(
    null
  );

  useEffect(() => {
    setLifeDiff(player.life - lifeCountSnapshot);
    if (diffTimer) {
      clearTimeout(diffTimer);
    }
    setDiffTimer(
      setTimeout(() => {
        setLifeDiff(0);
        setDiffTimer(null);
      }, 2000)
    );

    return () => {
      clearTimeout(diffTimer);
    };
    // I know what I'm doing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.life]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPressing) {
      interval = setInterval(() => {
        if (pressType === "increment") {
          onIncrement();
        } else if (pressType === "decrement") {
          onDecrement();
        }
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressing, pressType, onIncrement, onDecrement, player.life]);

  const handleMouseDown = (type: "increment" | "decrement") => {
    if (!diffTimer) {
      setLifeCountSnapshot(player.life);
    }
    setPresstype(type);
    setIsPressing(true);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
  };

  const handleMouseLeave = () => {
    setPresstype(null);
    setIsPressing(false);
  };

  const oddPlayerIndex = switchOddPlayer ? 0 : playerCount - 1;
  const isEvenPlayerCount = playerCount % 2 === 0;

  let newRotation = "rotate-0";
  // alternate odd/even check depending on player amount and if odd player is first or last
  if (componentIndex % 2 == (switchOddPlayer && !isEvenPlayerCount ? 1 : 0)) {
    newRotation = "rotate-90";
  } else {
    newRotation = "-rotate-90";
  }

  // flip the odd player
  if (!isEvenPlayerCount && componentIndex == oddPlayerIndex) {
    newRotation = switchOddPlayer ? "rotate-180" : "rotate-0";
  }

  if (player.life <= 0) {
    return (
      <div
        className={`text-2xl flex items-center justify-center ${newRotation}`}
      >
        Game Over
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center gap-4 pointer-events-none ${newRotation}`}
    >
      <MyTest displayNumber={lifeDiff}></MyTest>
      <div className="flex text-gray-500 font-semibold">{player.name}</div>
      <div className="flex gap-4 p-6 items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto"
          onClick={onDecrement}
          onMouseDown={() => handleMouseDown("decrement")}
          onMouseUp={handleMouseUp}
          onTouchStart={() => handleMouseDown("decrement")}
          onTouchEnd={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <MinusIcon className="w-5 h-5" />
        </Button>
        <div className="text-6xl font-bold">{player.life}</div>
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto"
          onClick={onIncrement}
          onMouseDown={() => handleMouseDown("increment")}
          onMouseUp={handleMouseUp}
          onTouchStart={() => handleMouseDown("increment")}
          onTouchEnd={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <PlusIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="text-gray-500 font-semibold">
        {player.commander} Big Bad Man
      </div>
    </div>
  );
};

export default Counter;
