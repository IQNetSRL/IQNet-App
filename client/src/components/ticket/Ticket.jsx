/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket } from "../../redux/actions.js";
import styles from "./Ticket.module.scss";

const Ticket = () => {
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);

  const getAreaNameById = (id, allAreas) => {
    const area = allAreas.find((area) => area.id === id);
    return area ? area.name : "";
  };

  const getCategoryNameById = (id, allCategories) => {
    const category = allCategories.find((category) => category.id === id);
    return category ? category.name : "";
  };

  const getStatusNameById = (id, allStatus) => {
    const status = allStatus.find((status) => status.id === id);
    return status ? status.name : "";
  };

  const getPriorityNameById = (id, allPriorities) => {
    const priority = allPriorities.find((priority) => priority.id === id);
    return priority ? priority.name : "";
  };

  const handleDeleteTicket = (id) => {
    dispatch(deleteTicket(id));
  };

  return (
    <section className={styles.sectionTicket}>
      <div className={styles.ticketList}>
        <ul>
          {allTickets.map((ticket) => (
            <li key={ticket.id}>
              <p>Área: {getAreaNameById(ticket.AreaId, allAreas)}</p>
              <p>
                Categoría:{" "}
                {getCategoryNameById(ticket.CategoryId, allCategories)}
              </p>
              <p>Estado: {getStatusNameById(ticket.StatusId, allStatus)}</p>
              <p>
                Prioridad:{" "}
                {getPriorityNameById(ticket.PriorityId, allPriorities)}
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
      </div>
    </section>
  );
};

export default Ticket;
