/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SideBar.module.scss";

const SideBar = (props) => {
  const navigate = useNavigate();

  SideBar.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  const handleNavigate = (dir) => {
    dir === "create"
      ? navigate("/create")
      : dir === "home"
      ? navigate("/home")
      : dir === "admin" && navigate("/admin");
  };

  return (
    <section className={styles.sectionSideBar}>
      <button onClick={() => handleNavigate("create")}>
        Crear Nuevo Ticket
      </button>
      <button onClick={() => handleNavigate("home")}>Home</button>
      {props.rol === "admin" && (
        <button onClick={() => handleNavigate("admin")}>Administracion</button>
      )}
    </section>
  );
};

export default SideBar;
