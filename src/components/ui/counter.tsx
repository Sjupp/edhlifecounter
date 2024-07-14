import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, Timer } from "lucide-react";
import { Button } from "./button";
import MyTest from "./MyTest";

interface CounterProps {
  count: number;
  playerCount: number;
  componentIndex: number;
  switchOddPlayer: boolean;
  playerName: string;
  commander: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter = ({
  count: lifeCount,
  playerCount,
  componentIndex,
  switchOddPlayer,
  playerName,
  commander,
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
    setLifeDiff(lifeCount - lifeCountSnapshot);
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
  }, [lifeCount]);

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
  }, [isPressing, pressType, onIncrement, onDecrement, lifeCount]);

  const handleMouseDown = (type: "increment" | "decrement") => {
    if (!diffTimer) {
      setLifeCountSnapshot(lifeCount);
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

  const isOdd = componentIndex % 2 === 0;
  let newRotation = "";
  if (switchOddPlayer) {
    newRotation = isOdd ? "-rotate-90" : "rotate-90";
    if (isOdd && componentIndex == 0) newRotation = "rotate-180";
  } else {
    newRotation = isOdd ? "rotate-90" : "-rotate-90";
    if (!isOdd && componentIndex == playerCount - 1) newRotation = "0";
  }

  if (lifeCount <= 0) {
    return (
      <div
        className={`text-2xl flex items-center justify-center ${newRotation}`}
      >
        Game Over
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${newRotation}`}>
      <MyTest displayNumber={lifeDiff}></MyTest>
      <div className="flex text-gray-500 font-semibold">{playerName}</div>
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
        <div className="text-6xl font-bold">{lifeCount}</div>
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
      <div className="text-gray-500 font-semibold">{commander} Big Bad Man</div>
    </div>
  );
};

export default Counter;
