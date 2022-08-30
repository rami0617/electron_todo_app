import React, { useEffect, useState } from "react";
import api from "../service/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import TodoItem from "./TodoItem";
import TodoHandler from "./TodoHandler";
import TodoSearch from "./TodoSearch";

export default function List() {
  const today = format(new Date(), "yyyy-MM-dd");

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [date, setDate] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await api.get("/list");

    setTodoList(result.data.result);
  };

  const handleList = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleInsertList = async () => {
    if (!newTodo) {
      alert("할 일을 입력해주세요");

      return;
    }

    const result = await api.post("/list", { name: newTodo, date: date });

    setTodoList((prev) => prev.concat(result.data.result));
    setNewTodo("");
  };

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSearch = async () => {
    const result = await api.post("/list/search", { keyword });

    setTodoList(result.data.result);
  };

  const handleKeyword = (evnet: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(evnet.target.value);
  };

  return (
    <>
      <Container>
        <Link to="/">🏠</Link>
        <header className="header">TODO LIST⏳</header>
        <Registration>
          <TodoHandler
            newTodo={newTodo}
            today={today}
            handleList={handleList}
            handleDate={handleDate}
            handleInsertList={handleInsertList}
          />
        </Registration>
        <SearchItem>
          <TodoSearch
            handleKeyword={handleKeyword}
            handleSearch={handleSearch}
          />
        </SearchItem>
        <ListItem>
          {todoList?.map((todoItem: any) => (
            <TodoItem
              todoItem={todoItem}
              handleList={setTodoList}
              today={today}
              key={todoItem?._id}
            />
          ))}
        </ListItem>
      </Container>
    </>
  );
}

const Container = styled.div`
  .header {
    padding-bottom: 2vh;
    text-align: center;
    font-weight: 500;
    font-size: 5vh;
  }
`;

const Registration = styled.div`
  text-align: center;

  .todo,
  .date {
    margin: 3vh;
  }
`;

const ListItem = styled.div`
  margin-top: 3vh;
  text-align: -webkit-center;

  .todo-item {
    width: 60vh;
    padding: 2vh;
    border: solid 0.7px;
    border-radius: 1vh;
    margin-bottom: 1vh;
    background-color: rgb(252, 247, 215);
  }

  .todo-name,
  .due-date,
  .status,
  .delete,
  .done {
    margin-right: 1vh;
  }
`;

const SearchItem = styled.div`
  margin-right: 2vh;
  margin-bottom: 3vh;
  text-align: right;

  .keyword {
    margin-right: 1vh;
  }
`;
