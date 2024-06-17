import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface MenuProps {
  onStartGame: (players: number) => void;
}

const Menu = ({ onStartGame }: MenuProps) => {
  const [numPlayers, setNumPlayers] = useState<number>(5);

  return (
        <>
          <div className="flex flex-col h-screen w-full items-center justify-center p-4 text-white">
            <Card>
              <CardHeader>
                <CardTitle>Create a Game</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-6xl text-bold p-5">{numPlayers}</div>
                <div className="p-5">Choose number of players</div>
                <div className="align-middle gap-6 justify-center flex">
                  <Button variant="outline" onClick={() => setNumPlayers(numPlayers - 1)}>
                    <MinusIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" onClick={() => setNumPlayers(numPlayers + 1)}>
                    <PlusIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <Button onClick={() => onStartGame(numPlayers)}>Create Game</Button>
              </CardFooter>
            </Card>
          </div>
        </>
  )
};

export default Menu;