import React from "react";

/** returns index for pushed element */
export type PushFunction = (elementId: number, index?: number) => number;
/** returns next top index after removing element */
export type RemoveFunction = (elementId: number) => number;

export type Layer = {
  /** unique identifier for the layer */
  id: number;
  /** zIndex assigned to the layer */
  zIndex: number;
};

type Context = {
  /** starting zIndex, default = 0 */
  baseIndex: number;
  /** layers currently in the stack */
  layers: Layer[];
  /** pushes an element to the layer stack */
  push: PushFunction;
  /** removes an element from the layer stack */
  remove: RemoveFunction;
  /** how much to increment zIndex when adding new layer, default = 10 */
  step: number;
};

export const LayersContext = React.createContext<Context>({} as Context);
