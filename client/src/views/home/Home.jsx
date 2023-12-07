/* eslint-disable no-unused-vars */
import React from "react";
import { IoTicket } from "react-icons/io5";
import PropTypes from "prop-types";
import Ticket from "../../components/ticket/Ticket.jsx";
import styles from "./Home.module.scss";

const Home = (props) => {
  Home.propTypes = {
    rol: PropTypes.string.isRequired,
    area: PropTypes.array.isRequired,
    category: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    priority: PropTypes.array.isRequired,
    responsable: PropTypes.array.isRequired,
    setArea: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
    setResponsable: PropTypes.func.isRequired,
  };

  return (
    <section className={styles.sectionHome}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Lista de Tickets</h2>
        <span className={styles.ticketIcon}>
          <IoTicket />
        </span>
      </div>
      <Ticket
        rol={props.rol}
        area={props.area}
        category={props.category}
        status={props.status}
        priority={props.priority}
        responsable={props.responsable}
        setArea={props.setArea}
        setCategory={props.setCategory}
        setStatus={props.setStatus}
        setPriority={props.setPriority}
        setResponsable={props.setResponsable}
      />
    </section>
  );
};

export default Home;
