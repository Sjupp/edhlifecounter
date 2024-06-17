import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./button";
import React from "react";
import { on } from "events";

interface CounterProps {
  rot: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}


const Counter = ({rot, count, onIncrement, onDecrement}: CounterProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const [pressType, setPresstype] = useState<"increment" | "decrement" | null>(
    null
  );
  const [rotation, setRotation] = useState(rot);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPressing) {
      interval = setInterval(() => {
        if (pressType === "increment"){
          onIncrement();
        } else if (pressType === "decrement") {
          onDecrement();
        }
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressing, pressType, onIncrement, onDecrement, count]);

  const handleMouseDown = (type: "increment" | "decrement") => {
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
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className=""
        onClick={onDecrement}
        onMouseDown={() => handleMouseDown("decrement")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <MinusIcon className="w-5 h-5" />
      </Button>
      <div className="text-6xl font-bold">{count}</div>
      <Button
        variant="ghost"
        size="icon"
        className=""
        onClick={onIncrement}
        onMouseDown={() => handleMouseDown("increment")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <PlusIcon className="w-5 h-5" />
      </Button>
    
    </div>
  );

  if (count <= 0) {
    content = (
      <div className="text-2xl flex items-center justify-center">
        Game Over
      </div>
    );
  } 

  switch (rotation) {
    case "none":
      return (
        <>
          <div className="flex col-span-2 items-center justify-center transform rotate-0">
            {content}
          </div>
        </>
      );
    case "-90":
      return (
        <>
          <div className="flex flex-col p-8 items-center justify-center transform -rotate-90">
            {content}
          </div>
        </>
      );
      case "90":
        return (
          <>
          <div className="flex flex-col p-8 items-center justify-center transform rotate-90">
              {content}
            </div>
          </>
        );
    default:
      return (
        <>
          <div className="flex flex-col items-center justify-center transform rotate-90">
            {content}
          </div>
        </>
      );
  }
};

export default Counter;
