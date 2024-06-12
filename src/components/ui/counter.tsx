import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "./button";

interface CounterProps {
  rot: string;
}

export default function Counter({ rot }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [pressType, setPresstype] = useState<"increment" | "decrement" | null>(
    null
  );
  const [rotation, setRotation] = useState(rot);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPressing) {
      interval = setInterval(() => {
        setCount((count) =>
          pressType === "increment" ? count + 1 : count - 1
        );
      }, 200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressing, pressType]);

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

  const content = (
    <div className="flex items-center justify-center w-80 h-80">
      <Button
        variant="ghost"
        size="icon"
        className=""
        onClick={() => setCount((count) => count - 1)}
        onMouseDown={() => handleMouseDown("decrement")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <MinusIcon className="w-5 h-5" />
      </Button>
      <div className="text-6xl mx-16 font-bold">{count}</div>
      <Button
        variant="ghost"
        size="icon"
        className=""
        onClick={() => setCount((count) => count + 1)}
        onMouseDown={() => handleMouseDown("increment")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <PlusIcon className="w-5 h-5" />
      </Button>
    </div>
  );

  switch (rotation) {
    case "none":
      return (
        <>
          <div className="flex flex-col items-center justify-center transform rotate-0">
            {content}
          </div>
        </>
      );
    case "-90":
      return (
        <>
          <div className="flex flex-col items-center justify-center transform -rotate-90">
            {content}
          </div>
        </>
      );
      case "90":
        return (
          <>
            <div className="flex flex-col items-center justify-center transform rotate-90">
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
}
