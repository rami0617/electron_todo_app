import React, { useState } from "react";
import api from "../service/api";

export default function List() {
  const [list, setList] = useState(["1"]);
  const [newValue, setNewValue] = useState("");

  const handleList = (event) => {
    setNewValue(event.target.value);
  };

  const handleInsertList = async () => {
    setList(list.concat(newValue));

    const result = await api.post("/", { name: newValue });
  };

  return (
    <>
      <input value={newValue} onChange={handleList}></input>
      <button onClick={handleInsertList}>등록</button>
      <div>
        {list.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
}
