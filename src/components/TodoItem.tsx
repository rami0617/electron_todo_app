import React, { useState, Dispatch, SetStateAction } from "react";
import api from "../service/api";

type TodoItemType = {
  todoItem: {
    _id: string;
    name: string;
    dueDate: string;
    status: string;
  };
  today: string;
  handleList: Dispatch<SetStateAction<never[]>>;
};

export default function TodoItem({
  todoItem,
  today,
  handleList,
}: TodoItemType) {
  const [newTodoItem, setNewTodoItem] = useState(todoItem.name);
  const [newDate, setNewDate] = useState(todoItem.dueDate);
  const [hasChange, setHasChange] = useState(false);

  const handleListItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoItem(event.target.value);
  };

  const handleNewDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(event.target.value);
  };

  const updateTodoItem = async () => {
    if (!newTodoItem) {
      alert("할 일을 입력해주세요");

      return;
    }

    setHasChange((state) => !state);

    const result = await api.patch("/list/item", {
      id: todoItem._id,
      item: newTodoItem,
      date: newDate,
    });

    handleList(result.data.result);
  };

  const handleDelete = async () => {
    const result = await api.delete("/list", {
      headers: { id: todoItem._id },
    });

    handleList(result.data.result);
  };

  const handleUpdate = async () => {
    const result = await api.patch("/list", { id: todoItem._id });

    handleList(result.data.result);
  };

  const handleTodo = () => {
    setHasChange((state) => !state);
  };

  return (
    <div className="todo-item">
      {hasChange ? (
        <>
          <input value={newTodoItem} onChange={handleListItem} />
          <input type="date" min={today} onChange={handleNewDate} />
          <button onClick={updateTodoItem}>수정완료</button>
        </>
      ) : (
        <>
          <span className="todo-name">{todoItem.name}</span>
          <span className="due-date">{todoItem.dueDate}</span>
          <span className="status">{todoItem.status}</span>
        </>
      )}
      <button className="delete" value={todoItem._id} onClick={handleDelete}>
        삭제
      </button>
      <button className="done" value={todoItem._id} onClick={handleUpdate}>
        완료
      </button>
      <button className="change-todo" onClick={handleTodo}>
        수정
      </button>
    </div>
  );
}
