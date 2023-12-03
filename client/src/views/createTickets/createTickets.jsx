/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HexColorPicker } from "react-colorful";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
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
  const [newArea, setNewArea] = useState({ name: "", color: "" });
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [newStatus, setNewStatus] = useState({ name: "" });
  const [newPriority, setNewPriority] = useState({ name: "" });
  const [color, setColor] = useState("#000000");
  const [creatingArea, setCreatingArea] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingStatus, setCreatingStatus] = useState(false);
  const [creatingPriority, setCreatingPriority] = useState(false);
  const [isOpen, setIsOpen] = useState({
    area: false,
    category: false,
    status: false,
    priority: false,
  });

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
      setNewArea({ name: "", color: "" });
    } catch (error) {
      console.error("Error al agregar el Area:", error);
    }
  };

  const handleAdd = (value) => {
    value === "area"
      ? setCreatingArea(!creatingArea)
      : value === "category"
      ? setCreatingCategory(!creatingCategory)
      : value === "status"
      ? setCreatingStatus(!creatingStatus)
      : value === "priority" && setCreatingPriority(!creatingPriority);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (newCategory.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postCategory(newCategory));
      setNewCategory({ name: "", color: "" });
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
      setNewStatus({ name: "", color: "" });
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
      setNewPriority({ name: "", color: "" });
    } catch (error) {
      console.error("Error al agregar la Prioridad:", error);
    }
  };

  const handleColorChangeArea = (newColor) => {
    setColor(newColor);
    setNewArea((prevArea) => ({ ...prevArea, color: newColor }));
  };

  const handleColorChangeCategory = (newColor) => {
    setColor(newColor);
    setNewCategory((prevCategory) => ({ ...prevCategory, color: newColor }));
  };

  const handleColorChangeStatus = (newColor) => {
    setColor(newColor);
    setNewStatus((prevStatus) => ({ ...prevStatus, color: newColor }));
  };

  const handleColorChangePriority = (newColor) => {
    setColor(newColor);
    setNewPriority((prevPriority) => ({ ...prevPriority, color: newColor }));
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

  const handleOpen = (value) => {
    setIsOpen((prevIsOpen) => ({ ...prevIsOpen, [value]: !prevIsOpen[value] }));
  };

  const handleRenderHeader = (value) => {
    return (
      <h2 onClick={() => handleOpen(value)}>
        {value === "area"
          ? "Area"
          : value === "category"
          ? "Categoria"
          : value === "status"
          ? "Estatus"
          : value === "priority" && "Prioridad"}
        <span>{!isOpen[value] ? <RiEdit2Fill /> : <MdOutlineClose />}</span>
      </h2>
    );
  };

  return (
    <section className={styles.sectionCreateTickets}>
      {props.rol === "admin" && (
        <section className={styles.accordionSection}>
          <Accordion className={styles.area}>
            <AccordionItem
              header={() => handleRenderHeader("area")}
              className={`${styles.accordionArea} ${
                isOpen.area && styles.open
              }`}
              style={{ zIndex: 999 }}
            >
              {allAreas.length > 0 ? (
                <ol>
                  {allAreas?.map((area, index) => (
                    <li
                      key={area.id || index}
                      style={{ color: area.color || "black" }}
                    >
                      {area.name}
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(area.id, "area")}
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <button
                      className={styles.addButton}
                      onClick={() => handleAdd("area")}
                    >
                      {creatingArea ? (
                        "cancelar"
                      ) : (
                        <>
                          <span>añadir area</span> <IoAdd />
                        </>
                      )}
                    </button>
                    <form onSubmit={handleSubmitArea}>
                      {creatingArea && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva area"
                            style={{ color: color }}
                            onChange={handleInputChangeArea}
                            value={newArea.name}
                          />
                          <div>
                            <HexColorPicker
                              color={color}
                              onChange={handleColorChangeArea}
                            />
                          </div>
                          <button type="submit">agregar</button>
                        </>
                      )}
                    </form>
                  </li>
                </ol>
              ) : (
                <p>Cargando areas...</p>
              )}
            </AccordionItem>
          </Accordion>
          <Accordion className={styles.area}>
            <AccordionItem
              header={() => handleRenderHeader("category")}
              className={`${styles.accordionArea} ${
                isOpen.category && styles.open
              }`}
              style={{ zIndex: 998 }}
            >
              {allCategories.length > 0 ? (
                <ol>
                  {allCategories?.map((category, index) => (
                    <li
                      key={category.id || index}
                      style={{ color: category.color || "black" }}
                    >
                      {category.name}
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(category.id, "category")}
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <button
                      className={styles.addButton}
                      onClick={() => handleAdd("category")}
                    >
                      {creatingCategory ? (
                        "cancelar"
                      ) : (
                        <>
                          <span>añadir categoria</span> <IoAdd />
                        </>
                      )}
                    </button>
                    <form onSubmit={handleSubmitCategory}>
                      {creatingCategory && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva categoria"
                            onChange={handleInputChangeCategory}
                            value={newCategory.name}
                          />
                          <div>
                            <HexColorPicker
                              color={color}
                              onChange={handleColorChangeCategory}
                            />
                          </div>
                          <button type="submit">agregar</button>
                        </>
                      )}
                    </form>
                  </li>
                </ol>
              ) : (
                <p>Cargando categorias...</p>
              )}
            </AccordionItem>
          </Accordion>
          <Accordion className={styles.area}>
            <AccordionItem
              header={() => handleRenderHeader("status")}
              className={`${styles.accordionArea} ${
                isOpen.status && styles.open
              }`}
              style={{ zIndex: 997 }}
            >
              {allStatus.length > 0 ? (
                <ol>
                  {allStatus?.map((status, index) => (
                    <li
                      key={status.id || index}
                      style={{ color: status.color || "black" }}
                    >
                      {status.name}
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(status.id, "status")}
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <button
                      className={styles.addButton}
                      onClick={() => handleAdd("status")}
                    >
                      {creatingStatus ? (
                        "cancelar"
                      ) : (
                        <>
                          <span>añadir estatus</span> <IoAdd />
                        </>
                      )}
                    </button>
                    <form onSubmit={handleSubmitStatus}>
                      {creatingStatus && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nuevo estatus"
                            onChange={handleInputChangeStatus}
                            value={newStatus.name}
                          />
                          <div>
                            <HexColorPicker
                              color={color}
                              onChange={handleColorChangeStatus}
                            />
                          </div>
                          <button type="submit">agregar</button>
                        </>
                      )}
                    </form>
                  </li>
                </ol>
              ) : (
                <p>Cargando estatus...</p>
              )}
            </AccordionItem>
          </Accordion>
          <Accordion className={styles.area}>
            <AccordionItem
              header={() => handleRenderHeader("priority")}
              className={`${styles.accordionArea} ${
                isOpen.priority && styles.open
              }`}
              style={{ zIndex: 996 }}
            >
              {allPriorities.length > 0 ? (
                <ol>
                  {allPriorities?.map((priority, index) => (
                    <li
                      key={priority.id || index}
                      style={{ color: priority.color || "black" }}
                    >
                      {priority.name}
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(priority.id, "priority")}
                      >
                        <MdDelete />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <button
                      className={styles.addButton}
                      onClick={() => handleAdd("priority")}
                    >
                      {creatingPriority ? (
                        "cancelar"
                      ) : (
                        <>
                          <span>añadir prioridad</span> <IoAdd />
                        </>
                      )}
                    </button>
                    <form onSubmit={handleSubmitPriority}>
                      {creatingPriority && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva prioridad"
                            onChange={handleInputChangePriority}
                            value={newPriority.name}
                          />
                          <div>
                            <HexColorPicker
                              color={color}
                              onChange={handleColorChangePriority}
                            />
                          </div>
                          <button type="submit">agregar</button>
                        </>
                      )}
                    </form>
                  </li>
                </ol>
              ) : (
                <p>Cargando prioridades...</p>
              )}
            </AccordionItem>
          </Accordion>
        </section>
      )}
      <FormTickets />
    </section>
  );
};

export default CreateTickets;
