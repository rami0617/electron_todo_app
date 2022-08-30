import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import TodoHandler from "../components/TodoHandler";

describe("TodoHandler unit test", () => {
  render(
    <BrowserRouter>
      <TodoHandler />
    </BrowserRouter>
  );

  it("1. 할일등록하기 글이 나와야 하고 '등록'버튼이 나타나야한다.", () => {
    expect(screen.getByText("할일 등록하기")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
