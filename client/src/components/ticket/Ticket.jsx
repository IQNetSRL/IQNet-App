/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import {
  deleteTicket,
  getTickets as getTicketsAction,
  getTicketById,
} from "../../redux/actions.js";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Ticket.module.scss";

const Ticket = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth0();
  const isProfile = location.pathname === "/profile";
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [isReady, setIsReady] = useState(false);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showFilter, setShowFilter] = useState({
    responsable: false,
    area: false,
    category: false,
    status: false,
    priority: false,
  });
  const [rol, setRol] = useState("");

  const [visibleColumns, setVisibleColumns] = useState({
    area: { name: "Área", isVisible: true },
    category: { name: "Categoría", isVisible: true },
    status: { name: "Estado", isVisible: true },
    priority: { name: "Prioridad", isVisible: true },
    operator: { name: "Operador", isVisible: true },
    responsable: { name: "Encargado", isVisible: true },
    client: { name: "Cliente", isVisible: false },
    address: { name: "Dirección", isVisible: false },
    text: { name: "Descripción", isVisible: false },
    elapsedTime: { name: "Tiempo transcurrido", isVisible: false },
    actions: { name: "Acciones", isVisible: true },
  });

  Ticket.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        setIsReady(true);

        const userFilter = isProfile ? { Responsable: user.name } : {};
        const finalFilters = { ...userFilter, ...filters };

        dispatch(getTicketsAction(finalFilters));

        const currentUser = allAccounts.find(
          (account) => account.name === user.name
        );

        if (currentUser) {
          setRol(currentUser.level);
        } else {
          console.log("Usuario no encontrado en allAccounts");
        }
      }
    };

    fetchData();
  }, [user, filters, isLoading, dispatch, isProfile, allAccounts]);

  useEffect(() => {
    const fetchData = async () => {
      if (rol) {
        if (rol === "admin") {
          const sorted = [...allTickets].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          });
          setSortedTickets(sorted);
        } else {
          const areaName =
            (rol === "admin" && "administracion") ||
            (rol === "support" && "servicio técnico") ||
            (rol === "sales" && "ventas");

          const area = allAreas.find((a) => a.name === areaName);

          if (area) {
            const filteredTickets = allTickets.filter(
              (ticket) => ticket.AreaId === area.id
            );

            const sorted = [...filteredTickets].sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });

            setSortedTickets(sorted);
          } else {
            console.log("Área no encontrada para el rol", rol);
          }
        }
      }
    };

    fetchData();
  }, [rol, allTickets, allAreas, sortOrder]);

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prevVisibleColumns) => {
      const updatedColumns = { ...prevVisibleColumns };
      updatedColumns[column] = {
        ...updatedColumns[column],
        isVisible: !updatedColumns[column].isVisible,
      };
      return updatedColumns;
    });
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleShowFilter = (column) => {
    setShowFilter((prevShowFilter) => ({
      ...prevShowFilter,
      [column]: !prevShowFilter[column],
    }));
  };

  const handleExportToExcel = () => {
    const sheetData = sortedTickets.map((ticket) => [
      getValueNameById(ticket.AreaId, allAreas),
      getValueNameById(ticket.CategoryId, allCategories),
      getValueNameById(ticket.StatusId, allStatus),
      getValueNameById(ticket.PriorityId, allPriorities),
      ticket.username,
      ticket.responsable,
      ticket.client,
      ticket.address,
      ticket.text,
      calculateDaysSinceCreation(ticket.createdAt) + " días",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headerRow, ...sheetData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tickets");
    XLSX.writeFile(wb, "tickets.xlsx");
  };
  console.log(visibleColumns);
  const headerRow = [
    "Área",
    "Categoría",
    "Estado",
    "Prioridad",
    "Operador",
    "Encargado",
    "Cliente",
    "Dirección",
    "Descripción",
    "Tiempo transcurrido",
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateDaysSinceCreation = (createdAt) => {
    const now = new Date();
    const creationDate = new Date(createdAt);
    return differenceInDays(now, creationDate);
  };

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  const handleDeleteTicket = (id, e) => {
    e.stopPropagation();
    dispatch(deleteTicket(id));
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleTicketInfo = (id) => {
    navigate("/ticket-info");
    dispatch(getTicketById(id));
  };

  return (
    <section className={styles.sectionTicket}>
      <div className={styles.ticketList}>
        <div>
          Desde
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div>
          Hasta
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        {isReady ? (
          <>
            <button onClick={handleExportToExcel}>Exportar a Excel</button>
            <div className={styles.renderList}>
              <button onClick={handleShowOptions}>Columnas</button>
              {showOptions && (
                <div>
                  {Object.keys(visibleColumns).map((column) => (
                    <div key={column} className={styles.list}>
                      {visibleColumns[column].isVisible ? (
                        <span>
                          <MdCheckBox />
                        </span>
                      ) : (
                        <span>
                          <MdCheckBoxOutlineBlank />
                        </span>
                      )}
                      <button
                        onClick={() => toggleColumnVisibility(column)}
                        style={{
                          fontWeight: visibleColumns[column].isVisible
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {visibleColumns[column].name}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <section className={styles.tableSection}>
              <table>
                <thead>
                  <tr>
                    {visibleColumns.responsable.isVisible && <th>Operador</th>}
                    {visibleColumns.operator.isVisible && (
                      <th>
                        {showFilter.responsable ? (
                          <select
                            name="Responsable"
                            value={filters.Responsable || ""}
                            onChange={handleFilterChange}
                          >
                            <option value="">Todos</option>
                            {allAccounts.map((account) => (
                              <option key={account.id} value={account.name}>
                                {account.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          "Encargado"
                        )}
                        <button onClick={() => handleShowFilter("responsable")}>
                          {showFilter.responsable ? (
                            <MdOutlineClose />
                          ) : (
                            <IoFilter />
                          )}
                        </button>
                      </th>
                    )}
                    {visibleColumns.area.isVisible && (
                      <th>
                        {showFilter.area && rol === "admin" ? (
                          <select
                            name="AreaId"
                            value={filters.AreaId || ""}
                            onChange={handleFilterChange}
                          >
                            <option value="">Todas</option>
                            {allAreas.map((area) => (
                              <option key={area.id} value={area.id}>
                                {area.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          "Área"
                        )}
                        <button onClick={() => handleShowFilter("area")}>
                          {showFilter.area ? (
                            <MdOutlineClose />
                          ) : (
                            <IoFilter />
                          )}
                        </button>
                      </th>
                    )}
                    {visibleColumns.category.isVisible && (
                      <th>
                        {showFilter.category ? (
                          <select
                            name="CategoryId"
                            value={filters.CategoryId || ""}
                            onChange={handleFilterChange}
                          >
                            <option value="">Todas</option>
                            {allCategories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          "Categoría"
                        )}
                        <button onClick={() => handleShowFilter("category")}>
                          {showFilter.category ? (
                            <MdOutlineClose />
                          ) : (
                            <IoFilter />
                          )}
                        </button>
                      </th>
                    )}
                    {visibleColumns.status.isVisible && (
                      <th>
                        {showFilter.status ? (
                          <select
                            name="StatusId"
                            value={filters.StatusId || ""}
                            onChange={handleFilterChange}
                          >
                            <option value="">Todos</option>
                            {allStatus.map((status) => (
                              <option key={status.id} value={status.id}>
                                {status.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          "Estado"
                        )}
                        <button onClick={() => handleShowFilter("status")}>
                          {showFilter.status ? (
                            <MdOutlineClose />
                          ) : (
                            <IoFilter />
                          )}
                        </button>
                      </th>
                    )}
                    {visibleColumns.priority.isVisible && (
                      <th>
                        {showFilter.priority ? (
                          <select
                            name="PriorityId"
                            value={filters.PriorityId || ""}
                            onChange={handleFilterChange}
                          >
                            <option value="">Todas</option>
                            {allPriorities.map((priority) => (
                              <option key={priority.id} value={priority.id}>
                                {priority.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          "Prioridad"
                        )}
                        <button onClick={() => handleShowFilter("priority")}>
                          {showFilter.priority ? (
                            <MdOutlineClose />
                          ) : (
                            <IoFilter />
                          )}
                        </button>
                      </th>
                    )}
                    {visibleColumns.client.isVisible && <th>Cliente</th>}
                    {visibleColumns.address.isVisible && <th>Direccion</th>}
                    {visibleColumns.text.isVisible && <th>Comentarios</th>}
                    {visibleColumns.elapsedTime.isVisible && (
                      <th>
                        Tiempo transcurrido
                        <button onClick={toggleSortOrder}>
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </button>
                      </th>
                    )}
                    {visibleColumns.actions.isVisible &&
                      props.rol === "admin" && <th>Acciones</th>}
                  </tr>
                </thead>
                <tbody className={styles.ticketInfo}>
                  {sortedTickets
                    .filter((ticket) =>
                      isProfile ? ticket.responsable === user.name : true
                    )
                    .filter((ticket) => {
                      const ticketDate = new Date(ticket.createdAt);

                      return (
                        (!startDate || ticketDate >= startDate) &&
                        (!endDate || ticketDate <= endDate)
                      );
                    })
                    .map((ticket) => (
                      <tr
                        key={ticket.id}
                        onClick={() => handleTicketInfo(ticket.id)}
                      >
                        {visibleColumns.operator.isVisible && (
                          <td>{ticket.username}</td>
                        )}
                        {visibleColumns.responsable.isVisible && (
                          <td>{ticket.responsable}</td>
                        )}
                        {visibleColumns.area.isVisible && (
                          <td>{getValueNameById(ticket.AreaId, allAreas)}</td>
                        )}
                        {visibleColumns.category.isVisible && (
                          <td>
                            {getValueNameById(ticket.CategoryId, allCategories)}
                          </td>
                        )}
                        {visibleColumns.status.isVisible && (
                          <td>
                            {getValueNameById(ticket.StatusId, allStatus)}
                          </td>
                        )}
                        {visibleColumns.priority.isVisible && (
                          <td>
                            {getValueNameById(ticket.PriorityId, allPriorities)}
                          </td>
                        )}
                        {visibleColumns.client.isVisible && (
                          <td>{ticket.client}</td>
                        )}
                        {visibleColumns.address.isVisible && (
                          <td>{ticket.address}</td>
                        )}
                        {visibleColumns.text.isVisible && (
                          <td>{ticket.text}</td>
                        )}
                        {visibleColumns.elapsedTime.isVisible && (
                          <td>
                            {calculateDaysSinceCreation(ticket.createdAt)} días
                          </td>
                        )}
                        {visibleColumns.actions.isVisible &&
                          props.rol === "admin" && (
                            <td>
                              <button
                                onClick={(e) =>
                                  handleDeleteTicket(ticket.id, e)
                                }
                              >
                                Eliminar Ticket
                              </button>
                            </td>
                          )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <div>Cargando Tickets...</div>
        )}
      </div>
    </section>
  );
};

export default Ticket;
