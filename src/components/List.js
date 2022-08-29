import React, { useEffect, useState } from "react";
import api from "../service/api";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function List() {
  const [list, setList] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [date, setDate] = useState(null);
  const [keyword, setKeyword] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await api.get("/");

    setList(result.data.result);
  };

  const handleList = (event) => {
    setNewValue(event.target.value);
  };

  const handleInsertList = async () => {
    const result = await api.post("/", { name: newValue, date: date });

    setList((prev) => prev.concat(result.data.result));
    setNewValue("");
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleDelete = async (event) => {
    const result = await api.delete("/", {
      headers: { id: event.target.value },
    });

    setList(result.data.result);
  };

  const handleUpdate = async (event) => {
    const result = await api.patch("/", { id: event.target.value });

    setList(result.data.result);
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
      <Link to="/">앞으로</Link>
      <header>TODOLIST</header>
      <input value={newValue} onChange={handleList} />
      <input type="date" onChange={handleDate} />
      <button onClick={handleInsertList}>등록</button>
      <ListItem>
        <div>할일</div>
        <div>끝나는 날짜</div>
        <div>상태</div>
      </ListItem>
      <SearchItem>
        <input onChange={handleKeyword} />
        <button onClick={handleSearch}>검색</button>
      </SearchItem>
      <ListContainer>
        {list.map((item) => (
          <div key={item._id}>
            {item.name}
            {item.dueDate}
            {item.status}
            <button value={item._id} onClick={handleDelete}>
              삭제
            </button>
            <button value={item._id} onClick={handleUpdate}>
              완료
            </button>
          </div>
        ))}
      </ListContainer>
    </>
  );
}

const ListItem = styled.div`
  background-color: beige;
  display: flex;

  .due-date {
    background-color: aliceblue;
  }
`;

const ListContainer = styled.div`
  background-color: aliceblue;
`;

const SearchItem = styled.div`
  background-color: blanchedalmond;
`;
