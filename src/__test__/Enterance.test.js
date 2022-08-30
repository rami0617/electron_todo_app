import Enterance from "../components/Enterance";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import List from "../components/List";

describe("Enterance unit test", () => {
  render(
    <BrowserRouter>
      <Enterance />
      <List />
    </BrowserRouter>
  );

  it("1.🚪 이모티콘이 화면에 나타나고 이모티콘을 누르면 이동한다.", () => {
    const button = screen.getByText("🚪");
    userEvent.click(button);

    expect(screen.getByText("TODO LIST⏳")).toBeInTheDocument();
  });
});
