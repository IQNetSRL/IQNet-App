/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FormTickets.module.scss";

const FormTickets = () => {
  const dispatch = useDispatch();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const [newForm, setNewForm] = useState({
    
  });

  return (
    <section className={styles.sectionFormTickets}>
      <h1>Crear Ticket</h1>
      <form>
        <select name="areas">
          {allAreas?.map((area, index) => (
            <option key={area.id || index} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        <select name="categories">
          {allCategories?.map((category, index) => (
            <option key={category.id || index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <select name="status">
          {allStatus?.map((status, index) => (
            <option key={status.id || index} value={status.name}>
              {status.name}
            </option>
          ))}
        </select>
        <select name="priorities">
          {allPriorities?.map((priority, index) => (
            <option key={priority.id || index} value={priority.name}>
              {priority.name}
            </option>
          ))}
        </select>
        <input type="text" name="description" placeholder="descripcion" />
        <input type="text" name="client" placeholder="cliente" />
        <input type="text" name="address" placeholder="direccion" />
      </form>
    </section>
  );
};

export default FormTickets;
