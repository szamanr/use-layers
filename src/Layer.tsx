import React, { useContext, useEffect, useRef, useState } from "react";
import { LayersContext } from "./LayersContext";

type Props = {
  children: React.ReactElement;
  /** optional forced index, useful for overriding 3rd-party libraries. */
  index?: number;
};

/**
 * wrap this around an element to add it to the Layers stack. when it renders, it will be assigned a zIndex one step higher
 * than the top index currently on the stack.
 * requires a top-level {@link Layers} wrapper which provides the context for the layers stack.
 */
export const Layer = ({ children, index }: Props): JSX.Element => {
  const { push, remove } = useContext(LayersContext);
  const [zIndex, setZIndex] = useState<number | null>(null);
  // TODO: use a GUID library, or useID from React 18
  const layerId = useRef(Math.floor(Math.random() * 1_000_000));

  useEffect(() => {
    const id = layerId.current;
    const newZIndex = push(id, index);
    setZIndex(newZIndex);

    return () => {
      setZIndex(null);
      remove(id);
    };
  }, []);

  return React.cloneElement(children, {
    "data-z-index": zIndex,
    id: `layer-${layerId.current}`,
    style: { zIndex },
  });
};
