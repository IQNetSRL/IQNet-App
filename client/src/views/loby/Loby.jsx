/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Loby.module.scss";

const Loby = (props) => {
  const navigate = useNavigate();

  Loby.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <section className={styles.sectionLogin}>
      <div>
        <h1>Gracias por registrarte</h1>
        <h4>Usuario creado con exito!</h4>
        <p>
          Por favor espere a que un administrador habilite su cuenta y le sea
          asignado un rol.
        </p>
        <p>
          Cuando su cuenta sea habilitada presione &quot;Continuar&quot; en el
          boton de abajo para ingresar al servicio.
        </p>
        <button
          onClick={handleNavigate}
          disabled={`${props.rol === null ? true : false}`}
        >
          Continuar
        </button>
      </div>
    </section>
  );
};

export default Loby;
