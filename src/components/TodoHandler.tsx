import React from "react";

type TodoHandlerType = {
  newTodo: string;
  today: string;
  handleDate: React.ChangeEventHandler<HTMLInputElement>;
  handleInsertList: React.MouseEventHandler<HTMLButtonElement>;
  handleList: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TodoHandler({
  newTodo,
  today,
  handleList,
  handleDate,
  handleInsertList,
}: TodoHandlerType) {
  return (
    <>
      <span>할일 등록하기</span>
      <input className="todo" value={newTodo} onChange={handleList} />
      <input className="date" type="date" min={today} onChange={handleDate} />
      <button onClick={handleInsertList}>등록</button>
    </>
  );
}
