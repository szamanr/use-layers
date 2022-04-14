import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLayers } from "../../src";

export const UseLayersExample = (): JSX.Element => {
  const [, refresh] = useState(false);
  const [shown, setShown] = useState([false, false, false, false]);
  const reset = (_, state = false) => {
    const newShown = [...shown];
    setShown(newShown.fill(state));
  };
  const toggle = (index: number) => {
    const newShown = [...shown];
    newShown[index] = !newShown[index];
    setShown(newShown);
  };

  // just for example purposes: display z-index on each card
  useLayoutEffect(() => {
    for (const element of document.querySelectorAll(".info")) {
      const layer = element.parentElement;
      const zIndex = layer.dataset.zIndex;
      if (zIndex != null) {
        element.innerHTML = `zIndex: ${zIndex}`;
      }
    }
  });

  // just for example purposes: make sure the displayed z-index shows immediately
  useEffect(() => {
    refresh((prev) => !prev);
  }, [shown]);

  // actual code
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  useLayers(ref0, ref1, ref2, ref3);

  return (
    <div className="relative w-screen h-screen bg-gray-600 text-gray-50">
      {shown[0] && (
        <div
          ref={ref0}
          className="layer-0 absolute left-0 top-0 w-40 h-40 bg-red-800"
          onClick={() => toggle(0)}
        >
          <p>layer 0</p>
          <p className="info"></p>
        </div>
      )}
      {shown[1] && (
        <div
          ref={ref1}
          className="layer-1 absolute left-4 top-4 w-40 h-40 bg-red-700"
          onClick={() => toggle(1)}
        >
          <p>layer 1</p>
          <p className="info"></p>
        </div>
      )}
      {shown[2] && (
        <div
          ref={ref2}
          className="layer-2 absolute left-8 top-8 w-40 h-40 bg-red-600"
          onClick={() => toggle(2)}
        >
          <p>layer 2</p>
          <p className="info"></p>
        </div>
      )}
      {shown[3] && (
        <div
          ref={ref3}
          className="layer-3 absolute left-12 top-12 w-40 h-40 bg-red-500"
          onClick={() => toggle(3)}
        >
          <p>layer 3</p>
          <p className="info"></p>
        </div>
      )}

      <div className="absolute bottom-20 w-full flex gap-2">
        <button onClick={reset}>reset</button>
        <button onClick={() => toggle(0)}>show 0</button>
        <button onClick={() => toggle(1)}>show 1</button>
        <button onClick={() => toggle(2)}>show 2</button>
        <button onClick={() => toggle(3)}>show 3</button>
      </div>
    </div>
  );
};
