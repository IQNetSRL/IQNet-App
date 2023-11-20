/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./TicketHistory.module.scss";

const TicketHistory = (props) => {
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);

  TicketHistory.propTypes = {
    TicketById: PropTypes.object.isRequired,
  };

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  return (
    <section className={styles.sectionTicketInfo}>
      <h1>Historial</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Operador</th>
              <th>Área</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Encargado</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Descripción</th>
              <th>Creación</th>
            </tr>
          </thead>
          <tbody>
            {props.TicketById.history &&
              props.TicketById.history.map((historyEntry) => (
                <tr key={historyEntry.id}>
                  <td>{historyEntry.user}</td>
                  <td>{getValueNameById(historyEntry.AreaId, allAreas)}</td>
                  <td>
                    {getValueNameById(historyEntry.CategoryId, allCategories)}
                  </td>
                  <td>{getValueNameById(historyEntry.StatusId, allStatus)}</td>
                  <td>
                    {getValueNameById(historyEntry.PriorityId, allPriorities)}
                  </td>
                  <td>{historyEntry.responsable}</td>
                  <td>{historyEntry.client}</td>
                  <td>{historyEntry.address}</td>
                  <td>{historyEntry.text}</td>
                  <td>{historyEntry.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TicketHistory;
