import React from "react";

/** returns index for pushed element */
export type PushFunction = (elementId: number, index?: number) => number;
/** returns next top index after removing element */
export type RemoveFunction = (elementId: number) => number;

export type Layer = {
  id: number;
  zIndex: number;
};

type Context = {
  baseIndex: number;
  layers: Layer[];
  push: PushFunction;
  remove: RemoveFunction;
  step: number;
};

export const LayersContext = React.createContext<Context>({} as Context);
