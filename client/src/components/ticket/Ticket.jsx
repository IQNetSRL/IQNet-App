/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteTicket } from "../../redux/actions.js";
import styles from "./Ticket.module.scss";

const Ticket = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading } = useAuth0();
  const isProfile = location.pathname === "/profile";
  const isHome = location.pathname === "/home";
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        setIsReady(true);
      }
    };

    fetchData();
  }, []);

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  const handleDeleteTicket = (id) => {
    dispatch(deleteTicket(id));
  };

  return (
    <section className={styles.sectionTicket}>
      <div className={styles.ticketList}>
        {isReady && isProfile ? (
          <ul>
            {allTickets
              .filter((ticket) => ticket.responsable === user.name)
              .map((ticket) => (
                <li key={ticket.id}>
                  <p>Área: {getValueNameById(ticket.AreaId, allAreas)}</p>
                  <p>
                    Categoría:{" "}
                    {getValueNameById(ticket.CategoryId, allCategories)}
                  </p>
                  <p>Estado: {getValueNameById(ticket.StatusId, allStatus)}</p>
                  <p>
                    Prioridad:{" "}
                    {getValueNameById(ticket.PriorityId, allPriorities)}
                  </p>
                  <p>Creador: {ticket.username}</p>
                  <p>Encargado: {ticket.responsable}</p>
                  <p>Cliente: {ticket.client}</p>
                  <p>Direccion: {ticket.address}</p>
                  <p>Descripcion: {ticket.text}</p>
                  <p>Comentarios: {ticket.comment}</p>
                  <button onClick={() => handleDeleteTicket(ticket.id)}>
                    Eliminar Ticket
                  </button>
                  <br />
                </li>
              ))}
          </ul>
        ) : isHome ? (
          <ul>
            {allTickets.map((ticket) => (
              <li key={ticket.id}>
                <p>Área: {getValueNameById(ticket.AreaId, allAreas)}</p>
                <p>
                  Categoría:{" "}
                  {getValueNameById(ticket.CategoryId, allCategories)}
                </p>
                <p>Estado: {getValueNameById(ticket.StatusId, allStatus)}</p>
                <p>
                  Prioridad:{" "}
                  {getValueNameById(ticket.PriorityId, allPriorities)}
                </p>
                <p>Creador: {ticket.username}</p>
                <p>Encargado: {ticket.responsable}</p>
                <p>Cliente: {ticket.client}</p>
                <p>Direccion: {ticket.address}</p>
                <p>Descripcion: {ticket.text}</p>
                <p>Comentarios: {ticket.comment}</p>
                <button onClick={() => handleDeleteTicket(ticket.id)}>
                  Eliminar Ticket
                </button>
                <br />
              </li>
            ))}
          </ul>
        ) : (
          <div>Cargando Tickets...</div>
        )}
      </div>
    </section>
  );
};

export default Ticket;
