/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./FiltersPage.module.scss";

const FiltersPage = () => {
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const [areas, setAreas] = useState(0);

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  function contarRepeticionesPorNombre(arrayDeObjetos) {
    const contadorNombres = {};

    arrayDeObjetos.forEach((objeto) => {
      const nombre = objeto.responsable;
      contadorNombres[nombre] = (contadorNombres[nombre] || 0) + 1;
    });

    return contadorNombres;
  }

  const responsables = contarRepeticionesPorNombre(allTickets);
  console.log(responsables);

  return (
    <section className={styles.sectionLoby}>
      <div>
        <h1>Todos los tickets</h1>
        <span>{allTickets.length}</span>
      </div>
      <div>
        <h1>Tickets abiertos</h1>
        <span>
          {
            allTickets
              .map((ticket) => getValueNameById(ticket.StatusId, allStatus))
              .filter((e) => e === "abierto").length
          }
        </span>
      </div>
      <div>
        <h1>Tickets cerrados</h1>
        <span>
          {
            allTickets
              .map((ticket) => getValueNameById(ticket.StatusId, allStatus))
              .filter((e) => e === "cerrado").length
          }
        </span>
      </div>
      <div>
        <h1>Tickets pendientes</h1>
        <span>
          {
            allTickets
              .map((ticket) => getValueNameById(ticket.StatusId, allStatus))
              .filter((e) => e === "pendiente").length
          }
        </span>
      </div>
      {Object.entries(responsables).map(([propiedad, valor]) => (
        <div key={propiedad}>
          <h1>Tickets asignados a {propiedad}</h1>
          <span>{valor}</span>
        </div>
      ))}
    </section>
  );
};

export default FiltersPage;
