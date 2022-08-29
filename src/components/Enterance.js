import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Enterance() {
  return (
    <Home>
      <Enter>
        <Link to="/list">🚪</Link>
      </Enter>
    </Home>
  );
}

const Home = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Enter = styled.div`
  background-color: aliceblue;
  padding: 10vh;
  border-radius: 2vh;
  text-decoration: none;
  font-size: 10vh;
`;
