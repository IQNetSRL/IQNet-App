/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import {
  deleteTicket,
  getTickets as getTicketsAction,
  getTicketById,
} from "../../redux/actions.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { IoAdd } from "react-icons/io5";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Ticket.module.scss";

const Ticket = (props) => {
  const optionsRef = useRef(null);
  const optionsButton = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth0();
  const { parent } = useAutoAnimate;
  const isProfile = location.pathname === "/profile";
  const isHome = location.pathname === "/home";
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
  const [rol, setRol] = useState("");
  const [showFilter, setShowFilter] = useState({
    responsable: false,
    area: false,
    category: false,
    status: false,
    priority: false,
  });

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
    area: PropTypes.array.isRequired,
    category: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    priority: PropTypes.array.isRequired,
    setArea: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !optionsButton.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isHome) {
      if (props.area.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [props.area[0]]: props.area[1],
        }));
      } else if (props.category.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [props.category[0]]: props.category[1],
        }));
      } else if (props.status.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [props.status[0]]: props.status[1],
        }));
      } else if (props.priority.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [props.priority[0]]: props.priority[1],
        }));
      }
    }
  }, [props.area, props.category, props.priority, props.status]);

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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

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

  const getValueColorById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.color : "";
  };

  const handleDeleteTicket = (id, e) => {
    e.stopPropagation();
    Swal.fire({
      title:
        "Esta seguro que desea eliminar este ticket? Esto no se podra deshacer!",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
      color: "#5a5a5a",
      confirmButtonColor: "#59A0FD",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Esta seguro?",
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
          color: "#5a5a5a",
          confirmButtonColor: "#59A0FD",
        }).then((result) => {
          if (result.isConfirmed) {
            Toast.fire({
              icon: "success",
              title: "Ticket eliminado!",
            });
            dispatch(deleteTicket(id));
          } else if (result.isDenied) {
            return;
          }
        });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleTicketInfo = (id) => {
    navigate("/ticket-info");
    dispatch(getTicketById(id));
  };

  const handleNavigate = () => {
    navigate("/create");
  };

  const handleResetFilters = () => {
    props.setArea([]);
    props.setCategory([]);
    props.setStatus([]);
    props.setPriority([]);
    dispatch(getTicketsAction());
    setFilters({});
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <section className={styles.sectionTicket}>
      <section className={styles.topOptions}>
        <div className={styles.dateContainer}>
          <div>
            <h3>Desde</h3>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div>
            <h3>Hasta</h3>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <div className={styles.reset}>
            <button onClick={handleResetFilters} title="Limpiar filtros">
              <TfiReload />
            </button>
          </div>
        </div>
        <section className={styles.leftSection}>
          <button
            className={styles.addButton}
            title="Nuevo ticket"
            onClick={handleNavigate}
          >
            <span>
              <IoAdd />
            </span>
          </button>
          <div className={styles.renderList} ref={parent}>
            <button
              ref={optionsButton}
              title="Añadir columna"
              className={`${styles.columnsButton} ${
                showOptions ? styles.selected : ""
              }`}
              onClick={handleShowOptions}
            >
              <MdFormatListBulletedAdd />
            </button>

            <div
              ref={optionsRef}
              className={`${styles.options} ${showOptions ? styles.show : ""}`}
            >
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
          </div>
          <button className={styles.excelButton} onClick={handleExportToExcel}>
            <span>
              <RiFileExcel2Fill />
            </span>
            Excel
          </button>
        </section>
      </section>
      <div className={styles.ticketList}>
        {isReady ? (
          <>
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
                          {showFilter.area ? <MdOutlineClose /> : <IoFilter />}
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
                    {visibleColumns.text.isVisible && <th>Descripción</th>}
                    {visibleColumns.elapsedTime.isVisible && (
                      <th>
                        Tiempo transcurrido
                        <button onClick={toggleSortOrder}>
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </button>
                      </th>
                    )}
                    {visibleColumns.actions.isVisible &&
                      props.rol === "admin" && (
                        <div className={styles.actions}>Acciones</div>
                      )}
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
                        style={{
                          border: `0.2rem solid ${
                            getValueColorById(ticket.StatusId, allStatus) ||
                            "black"
                          }`,
                          borderRight: "none",
                        }}
                      >
                        {visibleColumns.operator.isVisible && (
                          <td>{ticket.username}</td>
                        )}
                        {visibleColumns.responsable.isVisible && (
                          <td>{ticket.responsable}</td>
                        )}
                        {visibleColumns.area.isVisible && (
                          <td
                            style={{
                              color:
                                getValueColorById(ticket.AreaId, allAreas) ||
                                "black",
                            }}
                          >
                            {getValueNameById(ticket.AreaId, allAreas)}
                          </td>
                        )}
                        {visibleColumns.category.isVisible && (
                          <td
                            style={{
                              color:
                                getValueColorById(
                                  ticket.CategoryId,
                                  allCategories
                                ) || "black",
                            }}
                          >
                            {getValueNameById(ticket.CategoryId, allCategories)}
                          </td>
                        )}
                        {visibleColumns.status.isVisible && (
                          <td
                            style={{
                              color:
                                getValueColorById(ticket.StatusId, allStatus) ||
                                "black",
                            }}
                          >
                            {getValueNameById(ticket.StatusId, allStatus)}
                          </td>
                        )}
                        {visibleColumns.priority.isVisible && (
                          <td
                            style={{
                              color:
                                getValueColorById(
                                  ticket.PriorityId,
                                  allPriorities
                                ) || "black",
                            }}
                          >
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
                            <div
                              className={styles.actionsButtons}
                              style={{
                                border: `0.2rem solid ${
                                  getValueColorById(
                                    ticket.StatusId,
                                    allStatus
                                  ) || "black"
                                }`,
                              }}
                            >
                              <div>
                                <button
                                  className={styles.delete}
                                  onClick={(e) =>
                                    handleDeleteTicket(ticket.id, e)
                                  }
                                >
                                  <MdDelete />
                                </button>
                                <button
                                  className={styles.edit}
                                  onClick={() => handleTicketInfo(ticket.id)}
                                >
                                  <IoEye />
                                </button>
                              </div>
                            </div>
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
