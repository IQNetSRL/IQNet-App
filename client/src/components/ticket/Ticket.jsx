/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import { deleteTicket, getTickets as getTicketsAction } from "../../redux/actions.js";
import styles from "./Ticket.module.scss";

const Ticket = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        setIsReady(true);

        const userFilter = isProfile ? { Responsable: user.name } : {};
        const finalFilters = { ...userFilter, ...filters };

        dispatch(getTicketsAction(finalFilters));
      }
    };

    fetchData();
  }, [user, filters, isLoading, dispatch, isProfile]);

  useEffect(() => {
    const sorted = [...allTickets].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedTickets(sorted);
  }, [allTickets, sortOrder]);

  const calculateDaysSinceCreation = (createdAt) => {
    const now = new Date();
    const creationDate = new Date(createdAt);
    return differenceInDays(now, creationDate);
  };

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  const handleDeleteTicket = (id) => {
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
    dispatch(getTicketsAction(id));
  };

  return (
    <section className={styles.sectionTicket}>
      <div className={styles.ticketList}>
        {isReady ? (
          <table>
            <thead>
              <tr>
                <th>
                  Área
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
                </th>
                <th>
                  Categoría
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
                </th>
                <th>
                  Estado
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
                </th>
                <th>
                  Prioridad
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
                </th>
                <th>Operador</th>
                <th>
                  Encargado
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
                </th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Descripción</th>
                <th>
                  Tiempo transcurrido
                  <button onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? "↓" : "↑"}
                  </button>
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets
                .filter((ticket) =>
                  isProfile ? ticket.responsable === user.name : true
                )
                .map((ticket) => (
                  <tr key={ticket.id} onClick={() => handleTicketInfo(ticket.id)}>
                    <td>{getValueNameById(ticket.AreaId, allAreas)}</td>
                    <td>
                      {getValueNameById(ticket.CategoryId, allCategories)}
                    </td>
                    <td>{getValueNameById(ticket.StatusId, allStatus)}</td>
                    <td>
                      {getValueNameById(ticket.PriorityId, allPriorities)}
                    </td>
                    <td>{ticket.username}</td>
                    <td>{ticket.responsable}</td>
                    <td>{ticket.client}</td>
                    <td>{ticket.address}</td>
                    <td>{ticket.text}</td>
                    <td>{calculateDaysSinceCreation(ticket.createdAt)} días</td>
                    <td>
                      <button onClick={() => handleDeleteTicket(ticket.id)}>
                        Eliminar Ticket
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div>Cargando Tickets...</div>
        )}
      </div>
    </section>
  );
};

export default Ticket;
