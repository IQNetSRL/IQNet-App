/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getTickets,
  getAreas,
  getCategories,
  getStatus,
  getPriorities,
  getAccounts,
} from "./redux/actions.js";
import Login from "./views/login/Login.jsx";
import LogoutButton from "./components/logoutButton/LogoutButton.jsx";
import Profile from "./views/profile/Profile.jsx";
import ProfileButton from "./components/profileButton/ProfileButton.jsx";
import Home from "./views/home/Home.jsx";
import Administrator from "./views/administrator/Administrator.jsx";
import CreateTickets from "./views/createTickets/createTickets.jsx";
import "./App.module.scss";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
    dispatch(getAreas());
    dispatch(getCategories());
    dispatch(getStatus());
    dispatch(getPriorities());
    dispatch(getAccounts());
  }, [dispatch]);

  const handleNavigate = () => {
    navigate("/create");
  };

  return (
    <Auth0Provider
      domain="dev-turz1d4jnq1ljebe.us.auth0.com"
      clientId="bcoMdxZEYC3Z00LTKJ2df7sPHWzXNyJU"
      redirectUri={window.location.origin}
    >
      <main>
        {!isLogin && (
          <section>
            <h2>sidebar</h2>
            <button onClick={handleNavigate}>Crear Nuevo Ticket</button>
            <LogoutButton />
            <ProfileButton />
          </section>
        )}
        <section>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Administrator />} />
            <Route path="/create" element={<CreateTickets />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </section>
      </main>
    </Auth0Provider>
  );
}

export default App;
