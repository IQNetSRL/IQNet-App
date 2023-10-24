/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home/Home.jsx";
import Administrator from "./views/administrator/Administrator.jsx";
import "./App.module.scss";

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
