import { Button } from "@/components/ui/button";
import { Combobox } from "./combobox";
import { preprocessCards } from "@/scripts/preprocessCards";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./card";
import { Input } from "./input";
import { player } from "@/data/players/playerData";

const { legendaryCreatures } = preprocessCards();
// import {
//   player,
//   updatePlayerData,
//   updateCommanderData,
// } from "@/data/players/playerData";

interface playerSelectProps {
  numPlayers: number;
  onConfirm: (numPlayers: number) => void;
  players: player[];
}

export default function PlayerSelect({
  numPlayers,
  onConfirm,
  players,
}: playerSelectProps) {
  // const updatePlayer = (id: number, newName: string) => {
  //   setPlayers((prevPlayers) =>
  //     prevPlayers.map((player) =>
  //       player.id === id ? { ...player, name: newName } : player
  //     )
  //   );
  //   updatePlayerData(id, newName);
  // };

  // const updateCommander = (id: number, newCommander: any) => {
  //   setPlayers((prevPlayers) =>
  //     prevPlayers.map((player) =>
  //       player.id === id ? { ...player, commander: newCommander } : player
  //     )
  //   );
  //   updateCommanderData(id, newCommander);
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full overflow-auto">
        <Card className="flex flex-col justify-center w-2/3 items-center">
          <div className="flex flex-wrap gap-4 justify-center items-center pointer-events-auto p-4">
            {players.map((val, ind) => (
              <Card key={val.id}>
                <CardHeader>{val.name}</CardHeader>
                <CardContent className="">
                  <Input
                    type="name"
                    placeholder={val.name}
                    className="my-2"
                    onChange={(e) => (players[ind].name = e.target.value)}
                  ></Input>
                  {/* <Combobox
                    legendaryCreatures={legendaryCreatures}
                    playerId={val.id}
                    updateCommander={updateCommander}
                  ></Combobox> */}
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Button onClick={() => onConfirm(numPlayers)}>Start Game</Button>
            <Button onClick={() => console.log(players)}>Check Players</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
