import { PropsWithChildren } from "react";

interface PlayerBackgroundProps {
  playerCount: number;
  componentIndex: number;
  myBgColor: string;
}

const PlayerBackground = ({
  myBgColor,
  playerCount,
  componentIndex,
  children,
}: PropsWithChildren<PlayerBackgroundProps>) => {
  const newColor = Math.random().toString(16).substr(-6);

  const indexFlexAdjustment =
    componentIndex % 2 === 0 && componentIndex == playerCount - 1
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
