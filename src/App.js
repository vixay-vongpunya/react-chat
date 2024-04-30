import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
