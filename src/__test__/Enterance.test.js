import React from "react";
import Enterance from "../components/Enterance";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Enterance unit test", () => {
  render(
    <BrowserRouter>
      <Enterance />
    </BrowserRouter>
  );

  it("1. 문 모양의 이모티콘이 나타나야 한다.", () => {
    expect(screen.getByText("🚪")).toBeInTheDocument();
  });

  it("2. 이모티콘을 누르면 이동한다.", () => {});
});
