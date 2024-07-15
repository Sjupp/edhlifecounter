// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import React from "react";

const MyComponent = (props: { displayNumber: number }) => {
  const { displayNumber } = props;

  const isPositive = (num: number) => {
    return num >= 0;
  };

  return (
    <div
      className="flex text-6xl font-bold"
      style={{
        minHeight: "60px",
        color: isPositive(displayNumber) ? "green" : "red",
      }}
    >
      {!displayNumber ? null : displayNumber}
    </div>
  );
};
export default MyComponent;
