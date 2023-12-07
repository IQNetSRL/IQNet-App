/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import styles from "./FiltersPage.module.scss";

const FiltersPage = () => {
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  function contarRepeticionesPorNombre(arrayDeObjetos, value) {
    const contadorNombres = {};

    value === "responsables"
      ? arrayDeObjetos.forEach((objeto) => {
          const nombre = objeto.responsable;
          contadorNombres[nombre] = (contadorNombres[nombre] || 0) + 1;
        })
      : value === "areas"
      ? arrayDeObjetos.forEach((objeto) => {
          const nombre = objeto.AreaId;
          contadorNombres[nombre] = (contadorNombres[nombre] || 0) + 1;
        })
      : value === "categories"
      ? arrayDeObjetos.forEach((objeto) => {
          const nombre = objeto.CategoryId;
          contadorNombres[nombre] = (contadorNombres[nombre] || 0) + 1;
        })
      : value === "status"
      ? arrayDeObjetos.forEach((objeto) => {
          const nombre = objeto.StatusId;
          contadorNombres[nombre] = (contadorNombres[nombre] || 0) + 1;
        })
      : value === "priorities" &&
        arrayDeObjetos.forEach((objeto) => {
          const nombre = objeto.PriorityId;
          contadorNombres[nombre] = (contadorNombres[nombre] || 0) + 1;
        });

    return contadorNombres;
  }

  const responsables = contarRepeticionesPorNombre(allTickets, "responsables");
  const areas = contarRepeticionesPorNombre(allTickets, "areas");
  const categories = contarRepeticionesPorNombre(allTickets, "categories");
  const status = contarRepeticionesPorNombre(allTickets, "status");
  const priorities = contarRepeticionesPorNombre(allTickets, "priorities");

  const areasWithNames = {};
  Object.entries(areas).forEach(([areaId, cantidad]) => {
    const areaName = getValueNameById(areaId, allAreas);
    areasWithNames[areaName] = cantidad;
  });

  const categoriesWithNames = {};
  Object.entries(categories).forEach(([categoryId, cantidad]) => {
    const categoryName = getValueNameById(categoryId, allCategories);
    categoriesWithNames[categoryName] = cantidad;
  });

  const statusWithNames = {};
  Object.entries(status).forEach(([statusId, cantidad]) => {
    const statusName = getValueNameById(statusId, allStatus);
    statusWithNames[statusName] = cantidad;
  });

  const prioritiesWithNames = {};
  Object.entries(priorities).forEach(([priorityId, cantidad]) => {
    const priorityName = getValueNameById(priorityId, allPriorities);
    prioritiesWithNames[priorityName] = cantidad;
  });

  return (
    <section className={styles.sectionLoby}>
      <div>
        <h1>Todos los tickets</h1>
        <span>{allTickets.length}</span>
      </div>
      {Object.entries(responsables).map(([propiedad, valor]) => (
        <div key={propiedad}>
          <h1>Tickets asignados a {propiedad}</h1>
          <span>{valor}</span>
        </div>
      ))}
      {Object.entries(areasWithNames).map(([areaName, cantidad]) => (
        <div key={areaName}>
          <h1>Tickets asignados al area de {areaName}</h1>
          <span>{cantidad}</span>
        </div>
      ))}
      {Object.entries(categoriesWithNames).map(([areaName, cantidad]) => (
        <div key={areaName}>
          <h1>Tickets asignados a la categoria de {areaName}</h1>
          <span>{cantidad}</span>
        </div>
      ))}
      {Object.entries(statusWithNames).map(([areaName, cantidad]) => (
        <div key={areaName}>
          <h1>Tickets con estado {areaName}</h1>
          <span>{cantidad}</span>
        </div>
      ))}
      {Object.entries(prioritiesWithNames).map(([areaName, cantidad]) => (
        <div key={areaName}>
          <h1>Tickets de prioridad {areaName}</h1>
          <span>{cantidad}</span>
        </div>
      ))}
    </section>
  );
};

export default FiltersPage;
