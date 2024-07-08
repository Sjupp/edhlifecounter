import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, Timer } from "lucide-react";
import { Button } from "./button";
import MyTest from "./MyTest";

interface CounterProps {
  rot: string;
  count: number;
  playerName: string;
  commander: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter = ({
  rot,
  count: lifeCount,
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
    console.log("running use effect");
    setLifeDiff(lifeCount - lifeCountSnapshot);
    if (diffTimer) {
      console.log("clearing old timer");
      clearTimeout(diffTimer);
    }
    setDiffTimer(
      setTimeout(() => {
        console.log("reached timer end");
        setLifeDiff(0);
        setDiffTimer(null);
      }, 2000)
    );

    return () => {
      console.log("cleanup func");
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

  let content = (
    <>
      <div className="flex flex-col items-center gap-4 ">
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
        <div className="text-gray-500 font-semibold">
          {commander} BIg Bad Man
        </div>
      </div>
    </>
  );

  if (lifeCount <= 0) {
    content = (
      <div className="text-2xl flex items-center justify-center">Game Over</div>
    );
  }

  const getClassNameFromRotation = (rot) => {
    if (rot === "none") return "rotate-0 col-span-2";
    if (rot === "-90") return "-rotate-90 flex-col";
    if (rot === "90") return "rotate-90 flex-col";
    return "rotate-0 flex-col";
  };

  const myString = `flex items-center justify-center transform ${getClassNameFromRotation(
    rot
  )} pointer-events-none`;

  return (
    <>
      <div className={myString}>{content}</div>
    </>
  );
};

export default Counter;
