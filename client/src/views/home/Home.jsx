/* eslint-disable no-unused-vars */
import React from "react";
import { IoTicket } from "react-icons/io5";
import PropTypes from "prop-types";
import Ticket from "../../components/ticket/Ticket.jsx";
import styles from "./Home.module.scss";

const Home = (props) => {
  Home.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  return (
    <section className={styles.sectionHome}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Lista de Tickets</h2>
        <span className={styles.ticketIcon}>
          <IoTicket />
        </span>
      </div>
      <Ticket rol={props.rol} />
    </section>
  );
};

export default Home;
