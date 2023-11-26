import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";
import "./App.css";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
