/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin");
  };
  
  return (
    <section className={styles.sectionHome}>
      <h1>Home</h1>
      <button onClick={handleNavigate}>ir a administrador</button>
    </section>
  );
};

export default Home;
