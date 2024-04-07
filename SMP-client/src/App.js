import logo from "./logo.svg";
import "./App.css";
import Authentication from "./authentication/Authentication";
// import Counter from "./Counter";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import { useEffect } from "react";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
