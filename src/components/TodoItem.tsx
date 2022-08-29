import React, { useState, Dispatch, SetStateAction } from "react";
import api from "../service/api";

type TodoItemType = {
  item: {
    _id: string;
    name: string;
    dueDate: string;
    status: string;
  };
  handleList: Dispatch<SetStateAction<never[]>>;
  today: string;
};

export default function TodoItem({ item, handleList, today }: TodoItemType) {
  const [newTodoItem, setNewTodoItem] = useState("");
  const [newDate, setNewDate] = useState(item.dueDate);
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

    setHasChange((prev) => !prev);

    const result = await api.patch("/item", {
      id: item._id,
      item: newTodoItem,
      date: newDate,
    });

    handleList(result.data.result);
  };

  const handleDelete = async () => {
    const result = await api.delete("/", {
      headers: { id: item._id },
    });

    handleList(result.data.result);
  };

  const handleUpdate = async () => {
    const result = await api.patch("/", { id: item._id });

    handleList(result.data.result);
  };

  const handleTodo = () => {
    setHasChange((state) => !state);
  };

  return (
    <div key={item._id}>
      <div className="todo-item">
        {hasChange ? (
          <>
            <input value={newTodoItem} onChange={handleListItem} />
            <input type="date" min={today} onChange={handleNewDate} />
            <button onClick={updateTodoItem}>수정완료</button>
          </>
        ) : (
          <>
            <span className="todo-name">{item.name}</span>
            <span className="due-date">{item.dueDate}</span>
            <span className="status">{item.status}</span>
          </>
        )}
        <button className="delete" value={item._id} onClick={handleDelete}>
          삭제
        </button>
        <button className="done" value={item._id} onClick={handleUpdate}>
          완료
        </button>
        <button className="change-todo" onClick={handleTodo}>
          수정
        </button>
      </div>
    </div>
  );
}
