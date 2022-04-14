import { UseLayersExample } from "./UseLayersExample";
import React from "react";
import { render } from "react-dom";
import { Layers } from "../../src";

render(
  <Layers options={{ baseIndex: 1000 }}>
    <UseLayersExample />
  </Layers>,
  document.getElementById("root")
);
