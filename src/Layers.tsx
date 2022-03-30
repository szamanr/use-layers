import { find, last, remove as _remove } from "lodash";
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

  function push(layerId: number, index?: number) {
    const found = find(layers.current, (layer) => layer.id === layerId);
    if (found) {
      return found.zIndex;
    }

    const lastIndex = last(layers.current)?.zIndex ?? baseIndex;
    const layerIndex = index ?? lastIndex + step;
    layers.current.push({ id: layerId, zIndex: layerIndex });

    return layerIndex;
  }

  function remove(layerId: number) {
    const found = find(layers.current, (layer) => layer.id === layerId);
    if (!found) {
      const lastIndex = last(layers.current)?.zIndex ?? baseIndex;
      return lastIndex + step;
    }

    _remove(layers.current, (layer) => layer.id === layerId);

    const lastItem = last(layers.current);
    const lastIndex = lastItem?.zIndex ?? baseIndex;
    return lastIndex + step;
  }

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
