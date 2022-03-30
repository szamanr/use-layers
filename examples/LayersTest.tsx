import React, { useState } from "react";
import { Layer } from "../src/index";

export const LayersTest = (): JSX.Element => {
  const [shown, setShown] = useState([false, false, false, false]);
  const showAll = () => {
    setShown([false, false, false, false]);
  };
  const toggle = (index: number) => {
    const newShown = [...shown];
    newShown[index] = !newShown[index];
    setShown(newShown);
  };

  return (
    <div className="relative w-screen h-screen bg-white">
      {shown[0] && (
        <Layer>
          <div
            className="absolute left-0 top-0 w-40 h-40 bg-red-100"
            onClick={() => toggle(0)}
          >
            layer 0
          </div>
        </Layer>
      )}
      {shown[1] && (
        <Layer>
          <div
            className="absolute left-4 top-4 w-40 h-40 bg-red-200"
            onClick={() => toggle(1)}
          >
            layer 1
          </div>
        </Layer>
      )}
      {shown[2] && (
        <Layer>
          <div
            className="absolute left-8 top-8 w-40 h-40 bg-red-300"
            onClick={() => toggle(2)}
          >
            layer 2
          </div>
        </Layer>
      )}
      {shown[3] && (
        <Layer>
          <div
            className="absolute left-12 top-12 w-40 h-40 bg-red-400"
            onClick={() => toggle(3)}
          >
            layer 3
          </div>
        </Layer>
      )}

      <div className="absolute bottom-20 w-full flex gap-2">
        <button onClick={showAll}>reset</button>
        <button onClick={() => toggle(0)}>show 0</button>
        <button onClick={() => toggle(1)}>show 1</button>
        <button onClick={() => toggle(2)}>show 2</button>
        <button onClick={() => toggle(3)}>show 3</button>
      </div>
    </div>
  );
};
