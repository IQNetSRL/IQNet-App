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
  }, [user]);

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
        {isReady && (isProfile || isHome) ? (
          <table>
            <thead>
              <tr>
                <th>Área</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Creador</th>
                <th>Encargado</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Descripción</th>
                <th>Comentarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allTickets
                .filter((ticket) => (isProfile ? ticket.responsable === user.name : true))
                .map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{getValueNameById(ticket.AreaId, allAreas)}</td>
                    <td>{getValueNameById(ticket.CategoryId, allCategories)}</td>
                    <td>{getValueNameById(ticket.StatusId, allStatus)}</td>
                    <td>{getValueNameById(ticket.PriorityId, allPriorities)}</td>
                    <td>{ticket.username}</td>
                    <td>{ticket.responsable}</td>
                    <td>{ticket.client}</td>
                    <td>{ticket.address}</td>
                    <td>{ticket.text}</td>
                    <td>{ticket.comment}</td>
                    <td>
                      <button onClick={() => handleDeleteTicket(ticket.id)}>
                        Eliminar Ticket
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div>Cargando Tickets...</div>
        )}
      </div>
    </section>
  );
};

export default Ticket;
