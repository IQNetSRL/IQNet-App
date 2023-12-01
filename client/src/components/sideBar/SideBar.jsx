/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import PropTypes from "prop-types";
import styles from "./SideBar.module.scss";

const SideBar = (props) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <section
      className={`${styles.sectionSideBar} ${isSidebarOpen ? styles.open : ""}`}
    >
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      <button
        className={styles.newTicketButton}
        onClick={() => handleNavigate("create")}
      >
        <span>
          <IoTicket />
        </span>
        Nuevo Ticket
      </button>
      <button
        className={styles.homeButton}
        onClick={() => handleNavigate("home")}
      >
        <span>
          <IoIosHome />
        </span>
        Home
      </button>
      {props.rol === "admin" && (
        <button
          className={styles.adminButton}
          onClick={() => handleNavigate("admin")}
        >
          <span>
            <RiAdminFill />
          </span>
          Administracion
        </button>
      )}
    </section>
  );
};

export default SideBar;
