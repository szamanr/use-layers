import { cleanup, render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { afterEach, expect, it } from "vitest";
import { Layer, Layers } from "./index";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
  const [showModal0, setShowModal0] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <Layers>
      <button onClick={() => setShowModal0((s) => !s)}>toggle modal 0</button>
      {showModal0 && (
        <Layer>
          <article title="evil courage">
            The evil courage of samadhi is to avoid with dimension.
          </article>
        </Layer>
      )}
      <button onClick={() => setShowModal1((s) => !s)}>toggle modal 1</button>
      {showModal1 && (
        <Layer>
          <article title="love sex">
            Love is the only sex, the only guarantee of peace.
          </article>
        </Layer>
      )}
    </Layers>
  );
};

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

it("should set the zIndex in the order of render", () => {
  render(
    <Layers>
      <Layer>
        <article title="evil courage">
          The evil courage of samadhi is to avoid with dimension.
        </article>
      </Layer>
      <Layer>
        <article title="love sex">
          Love is the only sex, the only guarantee of peace.
        </article>
      </Layer>
    </Layers>
  );

  const elements = [
    screen.getByRole("article", { name: /evil courage/i }),
    screen.getByRole("article", { name: /love sex/i }),
  ];
  expect(elements[0].dataset.zIndex).toEqual("10");
  expect(elements[1].dataset.zIndex).toEqual("20");
});

it("should unset the zIndex when element removed from DOM", () => {
  render(<TestComponent />);

  const toggleModal0 = screen.getByRole("button", { name: /toggle modal 0/ });
  const toggleModal1 = screen.getByRole("button", { name: /toggle modal 1/ });

  const elements: [string, { name: RegExp }][] = [
    ["article", { name: /evil courage/i }],
    ["article", { name: /love sex/i }],
  ];

  expect(screen.queryByRole(...elements[0])).toBeNull();
  expect(screen.queryByRole(...elements[1])).toBeNull();

  userEvent.click(toggleModal0);

  expect(screen.getByRole(...elements[0]).dataset.zIndex).toEqual("10");
});
