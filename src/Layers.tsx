import React, { useRef } from "react";
import { Layer, LayersContext } from "./LayersContext";

const DEFAULT_STEP = 10;
const DEFAULT_BASE_Z_INDEX = 0;

type Options = {
  baseIndex?: number;
  step?: number;
};

type Props = {
  children: React.ReactNode;
  options?: Options;
};
/**
 * provider for the layers stack. wrap this around the main component of the app / module.
 */
export const Layers = ({ children, options }: Props): JSX.Element => {
  const baseIndex = options?.baseIndex ?? DEFAULT_BASE_Z_INDEX;
  const step = options?.step ?? DEFAULT_STEP;
  const layers = useRef<Layer[]>([]);

  const debugLayers = () => {
    console.debug(
      `current layers (${layers.current?.length ?? 0}):`,
      layers.current
    );
  };

  const push = (layerId: number, customIndex?: number) => {
    const found = layers.current.find((layer) => layer.id === layerId);
    if (found) {
      return found.zIndex;
    }

    const lastLayer = layers.current.slice(-1)[0];
    const lastIndex = lastLayer?.zIndex ?? baseIndex;
    const layerIndex = customIndex ?? lastIndex + step;
    layers.current.push({ id: layerId, zIndex: layerIndex });

    return layerIndex;
  };

  const remove = (layerId: number) => {
    const found = layers.current.find((layer) => layer.id === layerId);
    if (found) {
      layers.current = layers.current.filter((layer) => layer.id !== layerId);
    }

    const lastLayer = layers.current.slice(-1)[0];
    const lastIndex = lastLayer?.zIndex ?? baseIndex;
    return lastIndex + step;
  };

  return (
    <LayersContext.Provider
      value={{
        baseIndex,
        layers: layers.current,
        push,
        remove,
        step,
      }}
    >
      {children}
    </LayersContext.Provider>
  );
};
