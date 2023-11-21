/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
import TicketInfo from "./views/ticketInfo/TicketInfo.jsx";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth0();
  const isLogin = location.pathname === "/";
  const dispatch = useDispatch();
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [rol, setRol] = useState("");

  useEffect(() => {
    dispatch(getTickets());
    dispatch(getAreas());
    dispatch(getCategories());
    dispatch(getStatus());
    dispatch(getPriorities());
    dispatch(getAccounts());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        const currentUser = allAccounts.find(
          (account) => account.name === user.name
        );
        if (currentUser) {
          setRol(currentUser.level);
        } else {
          console.log("Usuario no encontrado en allAccounts");
        }
      }
    };

    fetchData();
  }, [user, isLoading]);

  const handleNavigate = () => {
    navigate("/create");
  };

  return (
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
          <Route path="/home" element={<Home rol={rol}/>} />
          {rol === "admin" && <Route path="/admin" element={<Administrator />} />}
          <Route path="/create" element={<CreateTickets />} />
          <Route path="/ticket-info" element={<TicketInfo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
