import { Button } from "@/components/ui/button";
import { Combobox } from "./combobox";
import { preprocessCards } from "@/scripts/preprocessCards";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Input } from "./input";

const { legendaryCreatures } = preprocessCards();
import {
  playerData,
  updatePlayerData,
  updateCommanderData,
  Player,
} from "@/data/players/playerData";

interface playerSelectProps {
  numPlayers: number;
  onConfirm: (numPlayers: number) => void;
}

export default function PlayerSelect({
  numPlayers,
  onConfirm,
}: playerSelectProps) {
  const [players, setPlayers] = useState<Player[]>(playerData);

  const updatePlayer = (id: number, newName: string) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, name: newName } : player
      )
    );
    updatePlayerData(id, newName);
  };

  const updateCommander = (id: number, newCommander: any) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === id ? { ...player, commander: newCommander } : player
      )
    );
    updateCommanderData(id, newCommander);
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
                  <Input
                    type="name"
                    placeholder={i.name}
                    className="my-2"
                    onChange={(e) => updatePlayer(i.id, e.target.value)}
                  ></Input>
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
            <Button onClick={() => console.log(playerData)}>
              Check Players
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
