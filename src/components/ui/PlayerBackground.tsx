import { PropsWithChildren } from "react";

interface PlayerBackgroundProps {
  playerCount: number;
  componentIndex: number;
  myBgColor: string;
  switchOddPlayer: boolean;
}

const PlayerBackground = ({
  myBgColor,
  playerCount,
  componentIndex,
  switchOddPlayer,
  children,
}: PropsWithChildren<PlayerBackgroundProps>) => {
  const newColor = Math.random().toString(16).substr(-6);

  const oddPlayerIndex = switchOddPlayer ? 0 : playerCount - 1;
  const isEven = oddPlayerIndex % 2 === 0;

  let indexFlexAdjustment = "flex-col";
  if (isEven && componentIndex == oddPlayerIndex) {
    if (!switchOddPlayer || playerCount % 2 == 1)
      indexFlexAdjustment = "col-span-2";
  }

  return (
    <div
      style={{
        backgroundColor: "#" + newColor,
        justifyContent: "center",
        alignContent: "center",
      }}
      className={indexFlexAdjustment}
    >
      {children}
    </div>
  );
};

export default PlayerBackground;
