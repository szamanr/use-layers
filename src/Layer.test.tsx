import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, expect, it } from "vitest";
import { Layer, Layers } from "./index";

afterEach(() => {
  cleanup();
});

it("should use base zIndex for first rendered layer", () => {
  render(
    <Layers>
      <Layer>
        <article title="evil courage">
          The evil courage of samadhi is to avoid with dimension.
        </article>
      </Layer>
    </Layers>
  );

  const element = screen.getByRole("article", { name: /evil courage/i });
  expect(element.dataset.zIndex).toEqual("10");
});

it("should use custom base", () => {
  render(
    <Layers options={{ baseIndex: 100 }}>
      <Layer>
        <article title="evil courage">
          The evil courage of samadhi is to avoid with dimension.
        </article>
      </Layer>
    </Layers>
  );

  const element = screen.getByRole("article", { name: /evil courage/i });
  expect(element.dataset.zIndex).toEqual("110");
});

it("should use custom step", () => {
  render(
    <Layers options={{ step: 40 }}>
      <Layer>
        <article title="evil courage">
          The evil courage of samadhi is to avoid with dimension.
        </article>
      </Layer>
    </Layers>
  );

  const element = screen.getByRole("article", { name: /evil courage/i });
  expect(element.dataset.zIndex).toEqual("40");
});
