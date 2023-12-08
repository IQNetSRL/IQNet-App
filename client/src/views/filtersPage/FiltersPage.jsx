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
    setResponsable: PropTypes.func.isRequired,
  };

  useEffect(() => {
    dispatch(getTickets());
    props.setArea([]);
    props.setCategory([]);
    props.setStatus([]);
    props.setPriority([]);
    props.setResponsable([]);
  }, []);

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    const color = value.color;
    const data = [value.name, color];
    return value ? data : "";
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
    areasWithNames[areaName[0]] = [cantidad, areaId, areaName[1]];
  });

  const categoriesWithNames = {};
  Object.entries(categories).forEach(([categoryId, cantidad]) => {
    const categoryName = getValueNameById(categoryId, allCategories);
    categoriesWithNames[categoryName[0]] = [
      cantidad,
      categoryId,
      categoryName[1],
    ];
  });

  const statusWithNames = {};
  Object.entries(status).forEach(([statusId, cantidad]) => {
    const statusName = getValueNameById(statusId, allStatus);
    statusWithNames[statusName[0]] = [cantidad, statusId, statusName[1]];
  });

  const prioritiesWithNames = {};
  Object.entries(priorities).forEach(([priorityId, cantidad]) => {
    const priorityName = getValueNameById(priorityId, allPriorities);
    prioritiesWithNames[priorityName[0]] = [
      cantidad,
      priorityId,
      priorityName[1],
    ];
  });

  const handleSetFilters = (name, value) => {
    name === "AreaId"
      ? props.setArea([name, value])
      : name === "CategoryId"
      ? props.setCategory([name, value])
      : name === "StatusId"
      ? props.setStatus([name, value])
      : name === "PriorityId"
      ? props.setPriority([name, value])
      : name === "Responsable" && props.setResponsable([name, value]);
    navigate("/home");
  };

  const handleAllTickets = () => {
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
      <div className={styles.allTickets} onClick={handleAllTickets}>
        <span className={styles.icon}>
          <IoTicket />
        </span>
        <p>{allTickets.length}</p>
      </div>
      <section>
        <div>
          <h1>
            <span>
              <FaUser />
            </span>
            Tickets asignados a
          </h1>
          <section>
            {Object.entries(responsables).map(([propiedad, valor]) => (
              <div
                key={propiedad}
                className={styles.allAccounts}
                onClick={() => handleSetFilters("Responsable", propiedad)}
              >
                <h3>{`${propiedad} `}</h3>
                <p>{valor}</p>
              </div>
            ))}
          </section>
        </div>
        <div>
          <h1>
            <span>
              <MdOutlineSupportAgent />
            </span>
            Tickets área
          </h1>
          <section>
            {Object.entries(areasWithNames).map(([areaName, cantidad]) => (
              <div
                style={{ border: `0.2rem solid ${cantidad[2]}` }}
                key={areaName}
                onClick={() => handleSetFilters("AreaId", cantidad[1])}
                className={styles.allAccounts}
              >
                <h3>{`${areaName} `}</h3>
                <p>{cantidad[0]}</p>
              </div>
            ))}
          </section>
        </div>
        <div>
          <h1>
            <span>
              <BiSolidCategoryAlt />
            </span>
            Tickets categoría
          </h1>
          <section>
            {Object.entries(categoriesWithNames).map(
              ([categoryName, cantidad]) => (
                <div
                  style={{ border: `0.2rem solid ${cantidad[2]}` }}
                  key={categoryName}
                  onClick={() => handleSetFilters("CategoryId", cantidad[1])}
                  className={styles.allAccounts}
                >
                  <h3>{`${categoryName} `}</h3>
                  <p>{cantidad[0]}</p>
                </div>
              )
            )}
          </section>
        </div>
        <div>
          <h1>
            <span>
              <GrStatusInfo />
            </span>
            Tickets estado
          </h1>
          <section>
            {Object.entries(statusWithNames).map(([statusName, cantidad]) => (
              <div
                style={{ border: `0.2rem solid ${cantidad[2]}` }}
                key={statusName}
                onClick={() => handleSetFilters("StatusId", cantidad[1])}
                className={styles.allAccounts}
              >
                <h3>{`${statusName} `}</h3>
                <p>{cantidad[0]}</p>
              </div>
            ))}
          </section>
        </div>
        <div>
          <h1>
            <span>
              <MdLowPriority />
            </span>
            Tickets prioridad
          </h1>
          <section>
            {Object.entries(prioritiesWithNames).map(
              ([priorityName, cantidad]) => (
                <div
                  style={{ border: `0.2rem solid ${cantidad[2]}` }}
                  key={priorityName}
                  onClick={() => handleSetFilters("PriorityId", cantidad[1])}
                  className={styles.allAccounts}
                >
                  <h3>{`${priorityName}: `}</h3>
                  <p>{cantidad[0]}</p>
                </div>
              )
            )}
          </section>
        </div>
      </section>
    </section>
  );
};

export default FiltersPage;
