import Enterance from "./components/Enterance";
import { Route, Routes } from "react-router-dom";
import List from "./components/List";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Enterance />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}

export default App;
