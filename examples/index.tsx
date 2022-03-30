import { LayersTest } from "./LayersTest";
import React from "react";
import { render } from "react-dom";
import { Layers } from "../src/index";

render(
  <Layers options={{ baseIndex: 1000 }}>
    <LayersTest />
  </Layers>,
  document.getElementById("root")
);