/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
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
    <section className={styles.sectionHistory}>
      <div className={styles.tableContainerTwo}>
        <section className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Operador</th>
                <th>Encargado</th>
                <th>Area</th>
                <th>Categoria</th>
                <th>Estado</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {props.TicketById.history &&
                props.TicketById.history.map((historyEntry) => (
                  <tr key={historyEntry.id}>
                    <td>
                      {format(new Date(historyEntry.createdAt), "dd/MM/yyyy")}
                    </td>
                    <td>{format(new Date(historyEntry.createdAt), "HH:mm")}</td>
                    <td>{historyEntry.user}</td>
                    <td>{historyEntry.responsable}</td>
                    <td>{getValueNameById(historyEntry.AreaId, allAreas)}</td>
                    <td>
                      {getValueNameById(historyEntry.CategoryId, allCategories)}
                    </td>
                    <td>
                      {getValueNameById(historyEntry.StatusId, allStatus)}
                    </td>
                    <td>
                      {getValueNameById(historyEntry.PriorityId, allPriorities)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
};

export default TicketHistory;
