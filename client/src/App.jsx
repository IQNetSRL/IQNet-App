/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";
import Login from "./views/login/Login.jsx";
import Home from "./views/home/Home.jsx";
import Administrator from "./views/administrator/Administrator.jsx";
import "./App.module.scss";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <Auth0Provider
      domain="dev-turz1d4jnq1ljebe.us.auth0.com"
      clientId="bcoMdxZEYC3Z00LTKJ2df7sPHWzXNyJU"
      redirectUri={window.location.origin}
    >
      <main>
        <section>
          <h2>sidebar</h2>
        </section>
        <section>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Administrator />} />
          </Routes>
        </section>
      </main>
    </Auth0Provider>
  );
}

export default App;
