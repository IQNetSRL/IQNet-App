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
  getAccounts,
  deleteArea,
  deleteCategory,
  deleteStatus,
  deletePriority,
} from "../../redux/actions.js";
import PropTypes from "prop-types";
import FormTickets from "../../components/formTickets/FormTickets.jsx";
import styles from "./CreateTickets.module.scss";

const CreateTickets = (props) => {
  const dispatch = useDispatch();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const [newArea, setNewArea] = useState({ name: "" });
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [newStatus, setNewStatus] = useState({ name: "" });
  const [newPriority, setNewPriority] = useState({ name: "" });

  CreateTickets.propTypes = {
    rol: PropTypes.string.isRequired,
  };

  useEffect(() => {
    dispatch(getAreas());
    dispatch(getCategories());
    dispatch(getStatus());
    dispatch(getPriorities());
    dispatch(getAccounts());
  }, []);

  const handleSubmitArea = async (e) => {
    e.preventDefault();
    if (newArea.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postArea(newArea));
      setNewArea({ name: "" });
    } catch (error) {
      console.error("Error al agregar el Area:", error);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (newCategory.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postCategory(newCategory));
      setNewCategory({ name: "" });
    } catch (error) {
      console.error("Error al agregar la Categoria:", error);
    }
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    if (newStatus.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postStatus(newStatus));
      setNewStatus({ name: "" });
    } catch (error) {
      console.error("Error al agregar el Estatus:", error);
    }
  };

  const handleSubmitPriority = async (e) => {
    e.preventDefault();
    if (newPriority.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postPriority(newPriority));
      setNewPriority({ name: "" });
    } catch (error) {
      console.error("Error al agregar la Prioridad:", error);
    }
  };

  const handleInputChangeCategory = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleInputChangeArea = (e) => {
    const { name, value } = e.target;
    setNewArea({ ...newArea, [name]: value });
  };

  const handleInputChangeStatus = (e) => {
    const { name, value } = e.target;
    setNewStatus({ ...newStatus, [name]: value });
  };

  const handleInputChangePriority = (e) => {
    const { name, value } = e.target;
    setNewPriority({ ...newPriority, [name]: value });
  };

  const handleNavigateBack = () => {
    window.history.back();
  };

  const handleDelete = (id, value) => {
    if (value === "area") {
      dispatch(deleteArea(id));
    }
    if (value === "category") {
      dispatch(deleteCategory(id));
    }
    if (value === "status") {
      dispatch(deleteStatus(id));
    }
    if (value === "priority") {
      dispatch(deletePriority(id));
    }
  };

  return (
    <section className={styles.sectionCreateTickets}>
      <button onClick={handleNavigateBack}>Volver</button>
      {props.rol === "admin" && (
        <>
          <div>
            <section>
              <div>
                <h3>Areas</h3>
                {allAreas.length > 0 ? (
                  <ol>
                    {allAreas?.map((area, index) => (
                      <li key={area.id || index}>
                        {area.name}
                        <button onClick={() => handleDelete(area.id, "area")}>
                          eliminar
                        </button>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>Cargando areas...</p>
                )}
                <form onSubmit={handleSubmitArea}>
                  <input
                    type="text"
                    name="name"
                    placeholder="nueva area"
                    onChange={handleInputChangeArea}
                    value={newArea.name}
                  />
                  <button type="submit">agregar</button>
                </form>
              </div>
              <div>
                <h3>Categorias</h3>
                {allCategories.length > 0 ? (
                  <ol>
                    {allCategories?.map((category, index) => (
                      <li key={category.id || index}>
                        {category.name}
                        <button
                          onClick={() => handleDelete(category.id, "category")}
                        >
                          eliminar
                        </button>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>Cargando categorias...</p>
                )}
                <form onSubmit={handleSubmitCategory}>
                  <input
                    type="text"
                    name="name"
                    placeholder="nueva categoria"
                    onChange={handleInputChangeCategory}
                    value={newCategory.name}
                  />
                  <button type="submit">agregar</button>
                </form>
              </div>
            </section>
          </div>
          <div>
            <h3>Estatus</h3>
            {allStatus.length > 0 ? (
              <ol>
                {allStatus?.map((status, index) => (
                  <li key={status.id || index}>
                    {status.name}
                    <button onClick={() => handleDelete(status.id, "status")}>
                      eliminar
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p>Cargando estatus...</p>
            )}
            <form onSubmit={handleSubmitStatus}>
              <input
                type="text"
                name="name"
                placeholder="nuevo estatus"
                onChange={handleInputChangeStatus}
                value={newStatus.name}
              />
              <button type="submit">agregar</button>
            </form>
          </div>
          <div>
            <h3>Prioridades</h3>
            {allPriorities.length > 0 ? (
              <ol>
                {allPriorities?.map((priority, index) => (
                  <li key={priority.id || index}>
                    {priority.name}
                    <button
                      onClick={() => handleDelete(priority.id, "priority")}
                    >
                      eliminar
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p>Cargando prioridades...</p>
            )}
            <form onSubmit={handleSubmitPriority}>
              <input
                type="text"
                name="name"
                placeholder="nueva prioridad"
                onChange={handleInputChangePriority}
                value={newPriority.name}
              />
              <button type="submit">agregar</button>
            </form>
          </div>
        </>
      )}
      <FormTickets />
    </section>
  );
};

export default CreateTickets;
