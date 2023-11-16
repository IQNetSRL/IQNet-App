/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import { deleteTicket } from "../../redux/actions.js";
import { GET_TICKET_BY_ID } from "../../redux/actionTypes.js";
import styles from "./TicketInfo.module.scss";

const TicketInfo = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const TicketById = useSelector((state) => state.someReducer.TicketById);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        setIsReady(true);
      }
    };

    fetchData();

    const storedTicket = localStorage.getItem("TicketById");
    if (storedTicket) {
      dispatch({
        type: GET_TICKET_BY_ID,
        payload: JSON.parse(storedTicket),
      });
    }

    return () => localStorage.removeItem("TicketById");
  }, [user, isLoading]);

  const calculateDaysSinceCreation = (createdAt) => {
    const now = new Date();
    const creationDate = new Date(createdAt);
    return differenceInDays(now, creationDate);
  };

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  const handleDeleteTicket = (id) => {
    dispatch(deleteTicket(id));
  };

  const handleNavigate = () => {
    window.history.back();
  };

  return (
    <section className={styles.sectionTicketInfo}>
      <h1>Ticket</h1>
      <button onClick={handleNavigate}>volver</button>
      <div>
        {isReady ? (
          <table>
            <thead>
              <tr>
                <th>Área</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Operador</th>
                <th>Encargado</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Descripción</th>
                <th>Comentarios</th>
                <th>Tiempo transcurrido</th>
                <th>Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {TicketById.map((ticket) => (
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
                  <td>{calculateDaysSinceCreation(ticket.createdAt)} días</td>
                  <td>{ticket.createdAt}</td>
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

export default TicketInfo;
