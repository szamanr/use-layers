import { LayerExample } from "./LayerExample";
import React from "react";
import { render } from "react-dom";
import { Layers } from "../../src";
import "./index.css";

render(
  <Layers options={{ baseIndex: 1000 }}>
    <LayerExample />
  </Layers>,
  document.getElementById("root")
);
