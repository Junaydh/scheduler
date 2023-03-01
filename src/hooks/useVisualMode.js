import { useState } from "react";

export function useVisualMode(mode) {
  const [mode, setMode] = useState(initial);

  return {
    mode,  
  }
}