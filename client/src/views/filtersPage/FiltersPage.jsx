/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import styles from "./FiltersPage.module.scss";

const FiltersPage = () => {
  const allTickets = useSelector((state) => state.someReducer.allTickets);
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);

  return (
    <section className={styles.sectionLoby}>
      <div>
        <h1>Todos los tickets</h1>
        <span>{allTickets.length}</span>
      </div>
    </section>
  );
};

export default FiltersPage;
