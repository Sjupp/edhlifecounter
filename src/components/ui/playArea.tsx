import Counter from "./counter";

interface PlayAreaProps {
  numPlayers: number;
}

export default function PlayArea({ numPlayers }: PlayAreaProps) {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-${numPlayers} h-screen w-full bg-gray-950 text-white">
        {[...Array(numPlayers)].map((_, i) => (
          <Counter
            key={i}
            rot={
              numPlayers <= 3
                ? (i + 1) % 3 === 0
                  ? "none"
                  : (i + 1) % 3 === 1
                  ? "90"
                  : "-90"
                : numPlayers >= 4
                ? (i + 1) % 5 === 0
                  ? "none"
                  : (i + 1) % 5 === 1
                  ? "90"
                  : "-90"
                : "none"
            }
          />
        ))}
      </div>
    </>
  );
}
