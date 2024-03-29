/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { FaList } from "react-icons/fa6";
import PropTypes from "prop-types";
import styles from "./SideBar.module.scss";

const SideBar = (props) => {
  const sideBar = useRef(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  SideBar.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBar.current && !sideBar.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (dir) => {
    navigate(dir);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = (e) => {
    e.stopPropagation()
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <section
        ref={sideBar}
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
            onClick={() => handleNavigate("/home")}
          >
            <span>
              <IoIosHome />
            </span>
            <p>Home</p>
          </button>
          <button
            className={styles.newTicketButton}
            onClick={() => handleNavigate("/create")}
          >
            <span>
              <IoTicket />
            </span>
            <p>Nuevo Ticket</p>
          </button>
          {props.rol === "admin" && (
            <button
              className={styles.adminButton}
              onClick={() => handleNavigate("/admin")}
            >
              <span>
                <RiAdminFill />
              </span>
              <p>Administracion</p>
            </button>
          )}
          {props.rol === "admin" && (
            <button
              className={styles.adminButton}
              title="filtros"
              onClick={() => handleNavigate("/filters")}
            >
              <span>
                <FaList />
              </span>
              <p>Filtros</p>
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
            title="Home"
            onClick={() => handleNavigate("/home")}
          >
            <span>
              <IoIosHome />
            </span>
          </button>
          <button
            className={styles.newTicketButton}
            title="Nuevo ticket"
            onClick={() => handleNavigate("/create")}
          >
            <span>
              <IoTicket />
            </span>
          </button>
          {props.rol === "admin" && (
            <button
              className={styles.adminButton}
              title="Administrador"
              onClick={() => handleNavigate("/admin")}
            >
              <span>
                <RiAdminFill />
              </span>
            </button>
          )}
          {props.rol === "admin" && (
            <button
              className={styles.adminButton}
              title="filtros"
              onClick={() => handleNavigate("/filters")}
            >
              <span>
                <FaList />
              </span>
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default SideBar;
