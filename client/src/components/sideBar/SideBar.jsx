/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
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
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <section
        className={`${styles.hiddeBar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <span>
            <TbLayoutSidebarLeftExpandFilled />
          </span>
        </button>
        <div className={styles.navigateButtons}>
          <button
            className={styles.homeButton}
            onClick={() => handleNavigate("home")}
          >
            <span>
              <IoIosHome />
            </span>
            <p>Home</p>
          </button>
          <button
            className={styles.newTicketButton}
            onClick={() => handleNavigate("create")}
          >
            <span>
              <IoTicket />
            </span>
            <p>Nuevo Ticket</p>
          </button>
          {props.rol === "admin" && (
            <button
              className={styles.adminButton}
              onClick={() => handleNavigate("admin")}
            >
              <span>
                <RiAdminFill />
              </span>
              <p>Administracion</p>
            </button>
          )}
        </div>
      </section>
      <section className={styles.sectionSideBar}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <span>
            <TbLayoutSidebarLeftExpandFilled />
          </span>
        </button>
        <div className={styles.navigateButtons}>
          <button
            className={styles.homeButton}
            onClick={() => handleNavigate("home")}
          >
            <span>
              <IoIosHome />
            </span>
            <p>Home</p>
          </button>
          <button
            className={styles.newTicketButton}
            onClick={() => handleNavigate("create")}
          >
            <span>
              <IoTicket />
            </span>
            <p>Nuevo Ticket</p>
          </button>
          {props.rol === "admin" && (
            <button
              className={styles.adminButton}
              onClick={() => handleNavigate("admin")}
            >
              <span>
                <RiAdminFill />
              </span>
              <p>Administracion</p>
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default SideBar;
