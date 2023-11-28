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
import L from "leaflet";
import TicketInfo from "./views/ticketInfo/TicketInfo.jsx";
import styles from "./App.module.scss";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth0();
  const isLogin = location.pathname === "/";
  const dispatch = useDispatch();
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [rol, setRol] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error.message);
        }
      );
    } else {
      console.error("Geolocalización no es compatible con este navegador");
    }
  }, []);

  const createCustomIcon = (color) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: ${color};" class="marker-pin"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -42],
    });
  };

  const handleNavigate = () => {
    navigate("/create");
  };

  return (
    <main>
      {!isLogin && (
        <section className={styles.sideBar}>
          <h2>IQNet</h2>
          <button onClick={handleNavigate}>Crear Nuevo Ticket</button>
          <LogoutButton />
          <ProfileButton />
        </section>
      )}
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile rol={rol} />} />
          <Route
            path="/home"
            element={<Home rol={rol} createCustomIcon={createCustomIcon} />}
          />
          {rol === "admin" && (
            <Route path="/admin" element={<Administrator />} />
          )}
          <Route path="/create" element={<CreateTickets rol={rol} />} />
          <Route
            path="/ticket-info"
            element={
              <TicketInfo
                rol={rol}
                currentLocation={currentLocation}
                createCustomIcon={createCustomIcon}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
