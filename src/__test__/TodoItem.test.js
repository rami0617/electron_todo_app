import TodoItem from "../components/TodoItem";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("TodoItem unit test", () => {
  const mock = [
    {
      _id: "6309f9a438146f221190e990",
      name: "밥 먹기",
      dueDate: "2022-09-01",
      status: "todo",
    },
  ];

  render(
    <BrowserRouter>
      <TodoItem item={mock} />
    </BrowserRouter>
  );

  it("1. 삭제, 완료, 수정 버튼이 나타나야 한다.", () => {
    expect(screen.getByText("삭제")).toBeInTheDocument();
    expect(screen.getByText("완료")).toBeInTheDocument();
    expect(screen.getByText("수정")).toBeInTheDocument();
  });
});
