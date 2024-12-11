import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Button>Hello shadcn</Button>

      <div className="border-2 border-red-400">Hello world</div>
    </>
  );
}

export default App;
