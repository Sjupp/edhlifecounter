import { useState } from "react";
import "./App.css";
import PlayArea from "./components/ui/playArea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";

function App() {
  const [numPlayers, setNumPlayers] = useState(5);
  const [startGame, setStartGame] = useState(false);

  return (
    <>
      {startGame === false ? (
        <>
          <div className="flex flex-col h-screen w-full bg-gray-950 items-center justify-center p-4 text-white">
            <Card className="bg-gray-950 text-white">
              <CardHeader>
                <CardTitle>Create a Game</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-6xl text-bold p-5">{numPlayers}</div>
                <div className="p-5">Choose number of players</div>
                <div className="align-middle justify-center flex">
                  <Button onClick={() => setNumPlayers(numPlayers - 1)}>
                    <MinusIcon className="h-5 w-5" />
                  </Button>
                  <Button onClick={() => setNumPlayers(numPlayers + 1)}>
                    <PlusIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-center">
                <Button onClick={() => setStartGame(true)}>Create Game</Button>
              </CardFooter>
            </Card>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-screen w-full bg-gray-950 items-center justify-center p-4 text-white">
          <PlayArea numPlayers={numPlayers} />
        </div>
      )}
    </>
  );

}

export default App;
