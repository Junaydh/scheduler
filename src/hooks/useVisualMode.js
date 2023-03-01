import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      history.pop();
      setMode(newMode);
      setHistory([...history, newMode]);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };

  const back = function() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back
  };
}