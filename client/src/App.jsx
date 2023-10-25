/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./views/home/Home.jsx";
import Administrator from "./views/administrator/Administrator.jsx";
import "./App.module.scss";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <main>
      <section>
        <h2>sidebar</h2>
      </section>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Administrator />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
