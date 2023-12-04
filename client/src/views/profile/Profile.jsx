/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoTicket } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import Ticket from "../../components/ticket/Ticket";
import styles from "./Profile.module.scss";

const Profile = (props) => {
  const { user, isLoading } = useAuth0();

  Profile.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  if (isLoading) {
    return <div>Cargando ...</div>;
  }

  return (
    <section className={styles.sectionProfile}>
      <h1>
        <span>
          <FaUser />
        </span>
        Perfil
      </h1>
      <div className={styles.infoSection}>
        <img src={user.picture} alt={user.name} />
        <div className={styles.nameSection}>
          <h2>{user.name}</h2>
          <h3>
            {props.rol === "support"
              ? "servicio tecnico"
              : props.rol === "admin"
              ? "administrador"
              : props.rol === "sales" && "ventas"}
          </h3>
          <h5>{user.email}</h5>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Tu lista de Tickets</h2>
        <span className={styles.ticketIcon}>
          <IoTicket />
        </span>
      </div>
      <Ticket />
    </section>
  );
};

export default Profile;
