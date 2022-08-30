import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import TodoSearch from "../components/TodoSearch";

describe("TodoHandler unit test", () => {
  render(
    <BrowserRouter>
      <TodoSearch />
    </BrowserRouter>
  );

  it("1. 검색 버튼과 검색 창이 나타나야 한다.", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
