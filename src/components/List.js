import React, { useEffect, useState } from "react";
import api from "../service/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function List() {
  const today = format(new Date(), "yyyy-MM-dd");

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
      <Container>
        <Link to="/">앞으로</Link>
        <header className="header">TODO LIST⏳</header>
        <Registration>
          <div>할일 등록하기</div>
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
        <ListContainer>
          <div>할일</div>
          <div>끝나는 날짜</div>
          <div>상태</div>
        </ListContainer>
        <ListItem>
          {list.map((item) => (
            <div className="todo-item" key={item._id}>
              <span className="todo-name">{item.name}</span>
              <span className="due-date">{item.dueDate}</span>
              <span className="status">{item.status}</span>
              <button value={item._id} onClick={handleDelete}>
                삭제
              </button>
              <button value={item._id} onClick={handleUpdate}>
                완료
              </button>
            </div>
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

  .todo {
    margin: 3vh;
  }

  .date {
    margin: 3vh;
  }
`;

const ListContainer = styled.div`
  background-color: beige;
  display: flex;
  justify-content: center;

  .due-date {
    background-color: aliceblue;
  }
`;

const ListItem = styled.div`
  background-color: aliceblue;
  text-align: center;

  .todo-item {
    width: 60vh;
    padding: 2vh;
    border: solid 0.2px;
    border-radius: 1vh;
    margin-bottom: 1vh;
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
