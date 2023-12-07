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

  function countOccurrencesByProperty(arrayDeObjetos, value) {
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

  const responsables = countOccurrencesByProperty(allTickets, "responsables");
  const areas = countOccurrencesByProperty(allTickets, "areas");
  const categories = countOccurrencesByProperty(allTickets, "categories");
  const status = countOccurrencesByProperty(allTickets, "status");
  const priorities = countOccurrencesByProperty(allTickets, "priorities");

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
    <section className={styles.sectionFiltersPage}>
      <div>
        <h1>Todos los tickets</h1>
        <span>{allTickets.length}</span>
      </div>
      {Object.entries(responsables).map(([propiedad, valor]) => (
        <div key={propiedad}>
          <h1>
            {`Tickets asignados a ${propiedad}: `}
            <span>{valor}</span>
          </h1>
        </div>
      ))}
      {Object.entries(areasWithNames).map(([areaName, cantidad]) => (
        <div key={areaName}>
          <h1>
            {`Tickets asignados al área de ${areaName}: `}
            <span>{cantidad}</span>
          </h1>
        </div>
      ))}
      {Object.entries(categoriesWithNames).map(([categoryName, cantidad]) => (
        <div key={categoryName}>
          <h1>
            {`Tickets asignados a la categoría de ${categoryName}: `}
            <span>{cantidad}</span>
          </h1>
        </div>
      ))}
      {Object.entries(statusWithNames).map(([statusName, cantidad]) => (
        <div key={statusName}>
          <h1>
            {`Tickets con estado ${statusName}: `}
            <span>{cantidad}</span>
          </h1>
        </div>
      ))}
      {Object.entries(prioritiesWithNames).map(([priorityName, cantidad]) => (
        <div key={priorityName}>
          <h1>
            {`Tickets de prioridad ${priorityName}: `}
            <span>{cantidad}</span>
          </h1>
        </div>
      ))}
    </section>
  );
};

export default FiltersPage;
