/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postArea,
  postCategory,
  postStatus,
  postPriority,
  getAreas,
  getCategories,
  getStatus,
  getPriorities,
} from "../../redux/actions.js";
import styles from "./CreateTickets.module.scss";

const CreateTickets = () => {
  const dispatch = useDispatch();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const [newArea, setNewArea] = useState({ name: "" });

  useEffect(() => {
    dispatch(getAreas());
    dispatch(getCategories());
    dispatch(getStatus());
    dispatch(getPriorities());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newArea.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postArea(newArea));
      setNewArea({ name: "" });
    } catch (error) {
      console.error("Error al agregar la Area:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArea({ ...newArea, [name]: value });
  };

  const handleNavigateBack = () => {
    window.history.back();
  };

  return (
    <section className={styles.sectionHome}>
      <h1>Crear Ticket</h1>
      <button onClick={handleNavigateBack}>Volver</button>
      <div>
        <section>
          <h3>Areas</h3>
          {allAreas.length > 0 ? (
            <ol>
              {allAreas?.map((area, index) => (
                <li key={area.id || index}>{area.name}</li>
              ))}
            </ol>
          ) : (
            <p>Cargando areas...</p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="nueva area"
              onChange={handleInputChange}
              value={newArea.name}
            />
            <button type="submit">agregar</button>
          </form>
        </section>
        {/* <li>{allCategories.name}</li>
          <li>{allStatus.name}</li>
          <li>{allPriorities.name}</li> */}
      </div>
    </section>
  );
};

export default CreateTickets;
