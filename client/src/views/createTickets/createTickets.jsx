/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  postArea,
  postCategory,
  postStatus,
  postPriority,
} from "../../redux/actions.js";
import styles from "./CreateTickets.module.scss";

const CreateTickets = () => {
  const dispatch = useDispatch();

  const handleNavigateBack = () => {
    window.history.back();
  };

  return (
    <section className={styles.sectionHome}>
      <h1>Crear Ticket</h1>
      <button onClick={handleNavigateBack}>Volver</button>
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
};

export default CreateTickets;
