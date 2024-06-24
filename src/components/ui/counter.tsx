import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./button";

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
    <><div className="flex flex-col items-center gap-4 ">
      <div className="flex text-gray-500 font-semibold">
        Player name
      </div>
      <div className="flex gap-4 p-6 items-center justify-center">

      <Button
        variant="ghost"
        size="icon"
        className="pointer-events-auto"
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
        className="pointer-events-auto"
        onClick={onIncrement}
        onMouseDown={() => handleMouseDown("increment")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        >
        <PlusIcon className="w-5 h-5" />
      </Button>
        </div>
      <div className="text-gray-500 font-semibold">
        Commander name
      </div>

    </div>
      </>
  );

  if (count <= 0) {
    content = (
      <div className="text-2xl flex items-center justify-center">
        Game Over
      </div>
    );
  } 

  switch (rot) {
    case "none":
      return (
        <>
          <div className="flex col-span-2 items-center justify-center transform rotate-0 pointer-events-none">
            {content}
          </div>
        </>
      );
    case "-90":
      return (
        <>
          <div className="flex flex-col items-center justify-center transform -rotate-90 pointer-events-none">
            {content}
          </div>
        </>
      );
      case "90":
        return (
          <>
          <div className="flex flex-col items-center justify-center transform rotate-90 pointer-events-none">
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
