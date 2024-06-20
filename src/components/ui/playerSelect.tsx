import { Button } from "@/components/ui/button";
import { Combobox } from "./combobox";
import { preprocessCards } from "@/scripts/preprocessCards";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Input } from "./input";

const { legendaryCreatures, creatureMap } = preprocessCards();

interface playerSelectProps {
  numPlayers: number;
  onConfirm: (numPlayers: number) => void;
}

export default function PlayerSelect({
  numPlayers,
  onConfirm,
}: playerSelectProps) {


const [players, setPlayers] = useState([{
    id: 1,
    name: "Player 1"
}, {
    id: 2,
    name: "Player 2"
}, {
    id: 3, 
    name: "Player 3"
}, {
    id: 6,
    name: "Player 4"
}, {
    id: 5,
    name: "Player 5"
}]);

  return (
    <>
<div className="flex flex-col items-center justify-center h-screen w-full">
<Card className="flex flex-col justify-center w-2/3 items-center">

      <div className="flex flex-wrap gap-4 justify-center items-center pointer-events-auto p-4">
        {players.map((i) => (
            <Card key={i.id}>
            <CardHeader>{i.name}</CardHeader>
            <CardContent className="">
            <Input type="name" placeholder={i.name} className="my-2"></Input>
              <Combobox
                legendaryCreatures={legendaryCreatures}
                creatureMap={creatureMap}
                ></Combobox>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Button onClick={() => onConfirm(numPlayers)}>Start Game</Button>
      </div>
        </Card>
        </div>
    </>
  );
}
