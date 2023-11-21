/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Ticket from "../../components/ticket/Ticket.jsx";
import styles from "./Home.module.scss";

const Home = (props) => {
  const navigate = useNavigate();

  Home.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  const handleNavigate = () => {
    navigate("/admin");
  };

  return (
    <section className={styles.sectionHome}>
      <h1>Home</h1>
      {props.rol === "administrador" && (
        <button onClick={handleNavigate}>ir a administrador</button>
      )}
      <h2>Lista de Tickets</h2>
      <Ticket />
    </section>
  );
};

export default Home;
