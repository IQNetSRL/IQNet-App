/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./Loby.module.scss";

const Loby = () => {
  const handleReload = () => {
    window.location.reload();
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
          botón de abajo, o vuelva a iniciar sesión para ingresar al servicio.
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={handleReload}>Continuar</button>
        </div>
      </div>
    </section>
  );
};

export default Loby;
