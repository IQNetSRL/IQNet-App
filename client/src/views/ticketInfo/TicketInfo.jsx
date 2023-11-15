/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./TicketInfo.module.scss";

const TicketInfo = () => {
  const handleNavigate = () => {
    window.history.back();
  };

  return (
    <section className={styles.sectionProfileButton}>
      <h1>Ticket</h1>
      <button onClick={handleNavigate}>volver</button>
    </section>
  );
};

export default TicketInfo;
