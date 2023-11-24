/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
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

  const handleNavigate = () => {
    window.history.back();
  };

  return (
    <section className={styles.sectionProfile}>
      <h1>Perfil</h1>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h2>
          Rol:{" "}
          {props.rol === "support"
            ? "servicio tecnico"
            : props.rol === "admin"
            ? "administrador"
            : props.rol === "sales" && "ventas"}
        </h2>
      </div>
      <button onClick={handleNavigate}>volver</button>
      <h2>Lista de Tickets</h2>
      <Ticket />
    </section>
  );
};

export default Profile;
