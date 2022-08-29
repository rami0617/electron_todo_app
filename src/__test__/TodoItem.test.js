import React from "react";
import TodoItem from "../components/TodoItem";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("TodoItem unit test", () => {
  const mock = [
    {
      createdAt: "2022-08-27T11:01:56.251Z",
      dueDate: "2022-09-01",
      name: "we",
      status: "todo",
      updatedAt: "2022-08-27T11:01:56.251Z",
      __v: 0,
      _id: "6309f9a438146f221190e990",
    },
  ];

  render(
    <BrowserRouter>
      <TodoItem item={mock} today="2022/08/29" />
    </BrowserRouter>
  );

  it("1. 삭제, 완료, 수정 버튼이 나타나야 한다.", () => {
    expect(screen.getByText("삭제")).toBeInTheDocument();
    expect(screen.getByText("완료")).toBeInTheDocument();
    expect(screen.getByText("수정")).toBeInTheDocument();
  });
});
