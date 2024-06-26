import { Button } from "@/components/ui/button";
import { Combobox } from "./combobox";
import { preprocessCards } from "@/scripts/preprocessCards";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Input } from "./input";

const { legendaryCreatures } = preprocessCards();

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
    name: "Player 1",
    commander: ""
}, {
    id: 2,
    name: "Player 2",
    commander: ""
}, {
    id: 3, 
    name: "Player 3",
    commander: ""
}, {
    id: 6,
    name: "Player 4",
    commander: ""
}, {
    id: 5,
    name: "Player 5",
    commander: ""
}]);

  const updatePlayer = (id: number, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, name: newName } : player
      )
    );
  };

  const updateCommander = (id: number, newCommander: any) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, commander: newCommander } : player
      )
    );
  };

  return (
    <>


<div className="flex flex-col items-center justify-center h-full w-full overflow-auto">
    <Card className="flex flex-col justify-center w-2/3 items-center">

      <div className="flex flex-wrap gap-4 justify-center items-center pointer-events-auto p-4">
        {players.map((i) => (
            
            <Card key={i.id}>
            <CardHeader>{i.name}</CardHeader>
            <CardContent className="">
            <Input type="name" placeholder={i.name} className="my-2" onChange={(e) => updatePlayer(i.id, e.target.value)}></Input>
              <Combobox
                legendaryCreatures={legendaryCreatures}
                playerId={i.id}
                updateCommander={updateCommander}
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
