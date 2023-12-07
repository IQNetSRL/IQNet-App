/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  getTickets,
  getAreas,
  getCategories,
  getStatus,
  getPriorities,
  getAccounts,
  postAccount,
} from "./redux/actions.js";
import Login from "./views/login/Login.jsx";
import LogoutButton from "./components/logoutButton/LogoutButton.jsx";
import Profile from "./views/profile/Profile.jsx";
import ProfileButton from "./components/profileButton/ProfileButton.jsx";
import Home from "./views/home/Home.jsx";
import Administrator from "./views/administrator/Administrator.jsx";
import CreateTickets from "./views/createTickets/createTickets.jsx";
import TicketInfo from "./views/ticketInfo/TicketInfo.jsx";
import Loby from "./views/loby/Loby.jsx";
import L from "leaflet";
import styles from "./App.module.scss";
import SideBar from "./components/sideBar/SideBar.jsx";
import FiltersPage from "./views/filtersPage/FiltersPage.jsx";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const location = useLocation();
  const { user, isLoading, isAuthenticated } = useAuth0();
  const isLogin = location.pathname === "/";
  const dispatch = useDispatch();
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [rol, setRol] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [area, setArea] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [responsable, setResponsable] = useState([]);

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
        await dispatch(postAccount(user.name));
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

  return (
    <main>
      {!isLogin && rol !== "" && rol !== null && (
        <section className={styles.navBar}>
          <h2>IQNet</h2>
          <div className={styles.profileContainer}>
            <LogoutButton />
            <ProfileButton />
          </div>
        </section>
      )}
      {(!isLogin && rol === "") || rol === null ? (
        <section>
          <Loby rol={rol} />
        </section>
      ) : (
        <div className={styles.mainContainer}>
          {!isLogin && rol !== "" && rol !== null && <SideBar rol={rol} />}
          <section className={styles.mainSection}>
            <Routes>
              <Route path="/" element={<Login rol={rol} />} />
              {rol && (
                <>
                  {rol === "admin" && (
                    <Route
                      path="/filters"
                      element={
                        <FiltersPage
                          setArea={setArea}
                          setCategory={setCategory}
                          setStatus={setStatus}
                          setPriority={setPriority}
                          setResponsable={setResponsable}
                        />
                      }
                    />
                  )}
                  <Route path="/profile" element={<Profile rol={rol} />} />
                  <Route
                    path="/home"
                    element={
                      <Home
                        rol={rol}
                        createCustomIcon={createCustomIcon}
                        area={area}
                        category={category}
                        status={status}
                        priority={priority}
                        responsable={responsable}
                        setArea={setArea}
                        setCategory={setCategory}
                        setStatus={setStatus}
                        setPriority={setPriority}
                        setResponsable={setResponsable}
                      />
                    }
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
                </>
              )}
            </Routes>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
