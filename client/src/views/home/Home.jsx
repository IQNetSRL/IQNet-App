/* eslint-disable no-unused-vars */
import React from "react";
import { IoTicket } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  postCustomers,
} from "../../redux/actions.js";
import PropTypes from "prop-types";
import Ticket from "../../components/ticket/Ticket.jsx";
import styles from "./Home.module.scss";

const Home = (props) => {
  const dispatch = useDispatch();

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

  const handleAPIInfo = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("api-key", "9ad4e9eb-ef39-4205-a3a2-d310bf713c6d");
    myHeaders.append("client-id", "774");
    myHeaders.append("login-type", "api");
    myHeaders.append("username", "api");
    myHeaders.append(
      "Authorization",
      "Bearer 7999|4oXKfrMgXIvB4D9whX6LldEXrykVraYu11vv4jDV"
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://iqnetcomunicaciones.com/api/customers/customers_list",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      dispatch(postCustomers(result));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <section className={styles.sectionHome}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Lista de Tickets</h2>
        <button onClick={handleAPIInfo}>TRAER CUSTOMERS A BASE DE DATOS</button>
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
