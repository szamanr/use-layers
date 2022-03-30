import React, { useContext, useEffect, useRef, useState } from "react";
import { LayersContext } from "LayersContext";

/**
 * TODO: wip - unmounting doesn't work
 * this is an alternative approach for adding elements to the layers stack. still in experimental mode.
 * pass ref(s) to the elements you want to put on the layers stack. they will be consecutively added to the stack.
 * requires a top-level {@link Layers} wrapper which provides the context for the layers stack.
 */
export const useLayers = (...refs: React.RefObject<HTMLElement>[]): void => {
  const { push, remove } = useContext(LayersContext);
  const layerIds = useRef(
    refs.map(() => Math.floor(Math.random() * 1_000_000))
  );

  const renderedCount = refs.reduce(
    (count, ref) => count + (ref.current ? 1 : 0),
    0
  );

  useEffect(() => {
    refs.forEach((ref, arrayIndex) => {
      if (ref.current) {
        const zIndex = push(layerIds.current[arrayIndex]);
        ref.current.style.zIndex = `${zIndex}`;
      } else {
        remove(layerIds.current[arrayIndex]);
      }
    });
    // TODO: fix deps?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderedCount]);
};
