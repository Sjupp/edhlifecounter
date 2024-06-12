import { useState } from "react";
import "./App.css";
import Counter from "@/components/ui/counter";

function App() {

  return (
    <>
      <div className="bg-gray-950 ">
        <div className="grid grid-cols-2 grid-rows-2 h-screen w-full bg-gray-950 text-white">
          <Counter rot="none" />
          <Counter rot="180" />
          <Counter rot="none" />
          <Counter rot="180" />
        </div>
      </div>

    </>
  );
}

export default App;
