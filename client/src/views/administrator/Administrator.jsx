/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Administrator.module.scss";

const Administrator = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <section className={styles.sectionAdministrator}>
      <h1>Administrator</h1>
      <button onClick={handleNavigate}>ir a home</button>
    </section>
  );
};

export default Administrator;