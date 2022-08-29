import React, { useEffect, useState } from "react";
import api from "../service/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import TodoItem from "./TodoItem";

export default function List() {
  const today = format(new Date(), "yyyy-MM-dd");

  const [list, setList] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [date, setDate] = useState(null);
  const [keyword, setKeyword] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(list);

  const fetchData = async () => {
    const result = await api.get("/");

    setList(result.data.result);
  };

  const handleList = (event) => {
    setNewValue(event.target.value);
  };

  const handleInsertList = async () => {
    if (!newValue) {
      alert("할 일을 입력해주세요");
      return;
    }

    const result = await api.post("/", { name: newValue, date: date });

    setList((prev) => prev.concat(result.data.result));
    setNewValue("");
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleSearch = async () => {
    const result = await api.post("/search", { keyword });

    setList(result.data.result);
  };

  const handleKeyword = (evnet) => {
    setKeyword(evnet.target.value);
  };

  return (
    <>
      <Container>
        <Link to="/">🏠</Link>
        <header className="header">TODO LIST⏳</header>
        <Registration>
          <span>할일 등록하기</span>
          <input className="todo" value={newValue} onChange={handleList} />
          <input
            className="date"
            type="date"
            min={today}
            onChange={handleDate}
          />
          <button onClick={handleInsertList}>등록</button>
        </Registration>
        <SearchItem>
          <input className="keyword" onChange={handleKeyword} />
          <button onClick={handleSearch}>검색</button>
        </SearchItem>
        <ListItem>
          {list.map((item) => (
            <TodoItem item={item} handleList={setList} today={today} />
          ))}
        </ListItem>
      </Container>
    </>
  );
}

const Container = styled.div`
  .header {
    text-align: center;
    font-weight: 500;
    font-size: 5vh;
    padding-bottom: 2vh;
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
