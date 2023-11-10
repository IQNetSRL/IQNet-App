/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  postAccount,
  getTickets,
  getAreas,
  getCategories,
  getStatus,
  getPriorities,
} from "../../redux/actions.js";
import styles from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);

  useEffect(() => {
    dispatch(getTickets());
    dispatch(getAreas());
    dispatch(getCategories());
    dispatch(getStatus());
    dispatch(getPriorities());
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        await dispatch(postAccount(user.name));
      }
    };
    fetchData();
  }, [isLoading, dispatch]);

  const handleNavigate = () => {
    navigate("/admin");
  };

  const getAreaNameById = (id, allAreas) => {
    const area = allAreas.find((area) => area.id === id);
    return area ? area.name : "";
  };

  const getCategoryNameById = (id, allCategories) => {
    const category = allCategories.find((category) => category.id === id);
    return category ? category.name : "";
  };

  const getStatusNameById = (id, allStatus) => {
    const status = allStatus.find((status) => status.id === id);
    return status ? status.name : "";
  };

  const getPriorityNameById = (id, allPriorities) => {
    const priority = allPriorities.find((priority) => priority.id === id);
    return priority ? priority.name : "";
  };

  return (
    <section className={styles.sectionHome}>
      <h1>Home</h1>
      <button onClick={handleNavigate}>ir a administrador</button>
      <div className={styles.ticketList}>
        <h2>Lista de Tickets</h2>
        <ul>
          {allTickets.map((ticket) => (
            <li key={ticket.id}>
              <p>Área: {getAreaNameById(ticket.AreaId, allAreas)}</p>
              <p>
                Categoría:{" "}
                {getCategoryNameById(ticket.CategoryId, allCategories)}
              </p>
              <p>Estado: {getStatusNameById(ticket.StatusId, allStatus)}</p>
              <p>
                Prioridad:{" "}
                {getPriorityNameById(ticket.PriorityId, allPriorities)}
              </p>
              <p>Creador: {ticket.username}</p>
              <p>Encargado: {ticket.responsable}</p>
              <p>Cliente: {ticket.client}</p>
              <p>Direccion: {ticket.address}</p>
              <p>Descripcion: {ticket.text}</p>
              <p>Comentarios: {ticket.comment}</p>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
