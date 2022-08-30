import List from "../components/List";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("List unit test", () => {
  render(
    <BrowserRouter>
      <List />
    </BrowserRouter>
  );

  it("1. TODO LIST와 할일 등록하기 글자가 나타나야햔다.", () => {
    expect(screen.getByText("TODO LIST⏳")).toBeInTheDocument();
    expect(screen.getByText("할일 등록하기")).toBeInTheDocument();
  });
});
