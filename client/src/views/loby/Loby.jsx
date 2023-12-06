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
    <section className={styles.sectionLoby}>
      <div className={styles.info}>
        <h1>¡Gracias por registrarte!</h1>
        <h4>Usuario creado con éxito</h4>
        <p>
          Por favor, espere a que un administrador habilite su cuenta y le
          asigne un rol.
        </p>
        <p>
          Cuando su cuenta esté habilitada, presione &quot;Continuar&quot; en el
          botón de abajo para ingresar al servicio.
        </p>
        <div className={styles.buttonContainer}>
        <button
          onClick={handleNavigate}
          disabled={`${props.rol === null ? true : false}`}
        >
          Continuar
        </button>
        </div>

      </div>
    </section>
  );
};

export default Loby;
