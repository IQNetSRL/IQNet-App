/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTickets } from "../../redux/actions.js";
import { FaList } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GrStatusInfo } from "react-icons/gr";
import { MdLowPriority } from "react-icons/md";
import PropTypes from "prop-types";
import styles from "./FiltersPage.module.scss";

const FiltersPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);

  FiltersPage.propTypes = {
    setArea: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
  };

  useEffect(() => {
    dispatch(getTickets());
    props.setArea([]);
    props.setCategory([]);
    props.setStatus([]);
    props.setPriority([]);
  }, []);

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
    areasWithNames[areaName] = [cantidad, areaId];
  });

  const categoriesWithNames = {};
  Object.entries(categories).forEach(([categoryId, cantidad]) => {
    const categoryName = getValueNameById(categoryId, allCategories);
    categoriesWithNames[categoryName] = [cantidad, categoryId];
  });

  const statusWithNames = {};
  Object.entries(status).forEach(([statusId, cantidad]) => {
    const statusName = getValueNameById(statusId, allStatus);
    statusWithNames[statusName] = [cantidad, statusId];
  });

  const prioritiesWithNames = {};
  Object.entries(priorities).forEach(([priorityId, cantidad]) => {
    const priorityName = getValueNameById(priorityId, allPriorities);
    prioritiesWithNames[priorityName] = [cantidad, priorityId];
  });

  const handleSetFilters = (name, value) => {
    name === "AreaId"
      ? props.setArea([name, value])
      : name === "CategoryId"
      ? props.setCategory([name, value])
      : name === "StatusId"
      ? props.setStatus([name, value])
      : name === "PriorityId" && props.setPriority([name, value]);
    navigate("/home");
  };

  return (
    <section className={styles.sectionFiltersPage}>
      <h1 className={styles.allTicketsTitle}>
        <span>
          <FaList />
        </span>
        Todos los tickets
      </h1>
      <div className={styles.allTickets}>
        <span className={styles.icon}>
          <IoTicket />
        </span>
        <p>{allTickets.length}</p>
      </div>
      <h1>
        <span>
          <FaUser />
        </span>
        Tickets asignados a
      </h1>
      {Object.entries(responsables).map(([propiedad, valor]) => (
        <div key={propiedad}>
          <h3>{`${propiedad}: `}</h3>
          <span>{valor}</span>
        </div>
      ))}
      <h1>
        <span>
          <MdOutlineSupportAgent />
        </span>
        Tickets asignados al área
      </h1>
      {Object.entries(areasWithNames).map(([areaName, cantidad]) => (
        <div
          key={areaName}
          onClick={() => handleSetFilters("AreaId", cantidad[1])}
        >
          <h3>{`${areaName}: `}</h3>
          <span>{cantidad[0]}</span>
        </div>
      ))}
      <h1>
        <span>
          <BiSolidCategoryAlt />
        </span>
        Tickets asignados a la categoría
      </h1>
      {Object.entries(categoriesWithNames).map(([categoryName, cantidad]) => (
        <div
          key={categoryName}
          onClick={() => handleSetFilters("CategoryId", cantidad[1])}
        >
          <h3>{`${categoryName}: `}</h3>
          <span>{cantidad[0]}</span>
        </div>
      ))}
      <h1>
        <span>
          <GrStatusInfo />
        </span>
        Tickets con estado
      </h1>
      {Object.entries(statusWithNames).map(([statusName, cantidad]) => (
        <div
          key={statusName}
          onClick={() => handleSetFilters("StatusId", cantidad[1])}
        >
          <h3>{`${statusName}: `}</h3>
          <span>{cantidad[0]}</span>
        </div>
      ))}
      <h1>
        <span>
          <MdLowPriority />
        </span>
        Tickets de prioridad
      </h1>
      {Object.entries(prioritiesWithNames).map(([priorityName, cantidad]) => (
        <div
          key={priorityName}
          onClick={() => handleSetFilters("PriorityId", cantidad[1])}
        >
          <h3>{`${priorityName}: `}</h3>
          <span>{cantidad[0]}</span>
        </div>
      ))}
    </section>
  );
};

export default FiltersPage;
