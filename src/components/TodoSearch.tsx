import React from "react";

type TodoSearchType = {
  handleKeyword: React.ChangeEventHandler<HTMLInputElement>;
  handleSearch: React.MouseEventHandler<HTMLButtonElement>;
};

export default function TodoSearch({
  handleKeyword,
  handleSearch,
}: TodoSearchType) {
  return (
    <>
      <input className="keyword" onChange={handleKeyword} />
      <button onClick={handleSearch}>검색</button>
    </>
  );
}
