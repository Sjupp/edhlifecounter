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

  const lastPlayerIndex = switchOddPlayer ? 0 : playerCount - 1;

  const indexFlexAdjustment =
    componentIndex % 2 === 0 && componentIndex == lastPlayerIndex
      ? "col-span-2"
      : "flex-col";
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
