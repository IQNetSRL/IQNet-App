/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HexColorPicker } from "react-colorful";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
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
  putArea,
  putCategory,
  putStatus,
  putPriority,
} from "../../redux/actions.js";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import FormTickets from "../../components/formTickets/FormTickets.jsx";
import styles from "./createTickets.module.scss";

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
  const [colorArea, setColorArea] = useState("#000000");
  const [colorPriority, setColorPriority] = useState("#000000");
  const [colorStatus, setColorStatus] = useState("#000000");
  const [colorCategory, setColorCategory] = useState("#000000");
  const [creatingArea, setCreatingArea] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [creatingStatus, setCreatingStatus] = useState(false);
  const [creatingPriority, setCreatingPriority] = useState(false);
  const [isEditingArea, setIsEditingArea] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [dataArea, setDataArea] = useState({ id: "", name: "", color: "" });
  const [dataCategory, setDataCategory] = useState({
    id: "",
    name: "",
    color: "",
  });
  const [dataStatus, setDataStatus] = useState({ id: "", name: "", color: "" });
  const [dataPriority, setDataPriority] = useState({
    id: "",
    name: "",
    color: "",
  });
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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleSubmitArea = async (e) => {
    e.preventDefault();
    if (newArea.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postArea(newArea));
      setNewArea({ name: "", color: "" });
      setCreatingArea(false);
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
      setCreatingCategory(false);
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
      setCreatingStatus(false);
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
      setCreatingPriority(false);
    } catch (error) {
      console.error("Error al agregar la Prioridad:", error);
    }
  };

  const handleColorChangeArea = (newColor) => {
    setColorArea(newColor);
    setNewArea((prevArea) => ({ ...prevArea, color: newColor }));
  };

  const handleColorChangeEditingArea = (newColor) => {
    setColorArea(newColor);
    setDataArea((prevData) => ({ ...prevData, color: newColor }));
  };

  const handleColorChangeEditingCategory = (newColor) => {
    setColorCategory(newColor);
    setDataCategory((prevData) => ({ ...prevData, color: newColor }));
  };

  const handleColorChangeEditingStatus = (newColor) => {
    setColorStatus(newColor);
    setDataStatus((prevData) => ({ ...prevData, color: newColor }));
  };

  const handleColorChangeEditingPriority = (newColor) => {
    setColorPriority(newColor);
    setDataPriority((prevData) => ({ ...prevData, color: newColor }));
  };

  const handleColorChangeCategory = (newColor) => {
    setColorCategory(newColor);
    setNewCategory((prevCategory) => ({ ...prevCategory, color: newColor }));
  };

  const handleColorChangeStatus = (newColor) => {
    setColorStatus(newColor);
    setNewStatus((prevStatus) => ({ ...prevStatus, color: newColor }));
  };

  const handleColorChangePriority = (newColor) => {
    setColorPriority(newColor);
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

  const handleInputChangeEditingArea = (e) => {
    const { name, value } = e.target;
    setDataArea({ ...dataArea, [name]: value });
  };

  const handleInputChangeEditingCategory = (e) => {
    const { name, value } = e.target;
    setDataCategory({ ...dataCategory, [name]: value });
  };

  const handleInputChangeEditingStatus = (e) => {
    const { name, value } = e.target;
    setDataStatus({ ...dataStatus, [name]: value });
  };

  const handleInputChangeEditingPriority = (e) => {
    const { name, value } = e.target;
    setDataPriority({ ...dataPriority, [name]: value });
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
      Swal.fire({
        title:
          "Esta seguro que desea eliminar esta area? Esto no se podra deshacer y el area se eliminara con todos los tickets asociados!",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
        color: "#5a5a5a",
        confirmButtonColor: "#59A0FD",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Esta seguro?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
            color: "#5a5a5a",
            confirmButtonColor: "#59A0FD",
          }).then((result) => {
            if (result.isConfirmed) {
              Toast.fire({
                icon: "success",
                title: "Area Eliminada!",
              });
              dispatch(deleteArea(id));
              setIsEditingArea(false);
            } else if (result.isDenied) {
              return;
            }
          });
        } else if (result.isDenied) {
          return;
        }
      });
    }
    if (value === "category") {
      Swal.fire({
        title:
          "Esta seguro que desea eliminar esta categoria? Esto no se podra deshacer y la categoria se eliminara con todos los tickets asociados!",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
        color: "#5a5a5a",
        confirmButtonColor: "#59A0FD",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Esta seguro?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
            color: "#5a5a5a",
            confirmButtonColor: "#59A0FD",
          }).then((result) => {
            if (result.isConfirmed) {
              Toast.fire({
                icon: "success",
                title: "Categoria Eliminada!",
              });
              dispatch(deleteCategory(id));
              setIsEditingCategory(false);
            } else if (result.isDenied) {
              return;
            }
          });
        } else if (result.isDenied) {
          return;
        }
      });
    }
    if (value === "status") {
      Swal.fire({
        title:
          "Esta seguro que desea eliminar este estatus? Esto no se podra deshacer y el estado se eliminara con todos los tickets asociados!",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
        color: "#5a5a5a",
        confirmButtonColor: "#59A0FD",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Esta seguro?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
            color: "#5a5a5a",
            confirmButtonColor: "#59A0FD",
          }).then((result) => {
            if (result.isConfirmed) {
              Toast.fire({
                icon: "success",
                title: "Estado Eliminado!",
              });
              dispatch(deleteStatus(id));
              setIsEditingStatus(false);
            } else if (result.isDenied) {
              return;
            }
          });
        } else if (result.isDenied) {
          return;
        }
      });
    }
    if (value === "priority") {
      Swal.fire({
        title:
          "Esta seguro que desea eliminar esta prioridad? Esto no se podra deshacer y la prioridad se eliminara con todos los tickets asociados!",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
        color: "#5a5a5a",
        confirmButtonColor: "#59A0FD",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Esta seguro?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
            color: "#5a5a5a",
            confirmButtonColor: "#59A0FD",
          }).then((result) => {
            if (result.isConfirmed) {
              Toast.fire({
                icon: "success",
                title: "Prioridad Eliminada!",
              });
              dispatch(deletePriority(id));
              setIsEditingPriority(false);
            } else if (result.isDenied) {
              return;
            }
          });
        } else if (result.isDenied) {
          return;
        }
      });
    }
  };

  const handleEdit = (id, name, color, value) => {
    if (value === "area") {
      setIsEditingArea(!isEditingArea);
      setDataArea({ id: id, name: name, color: color });
    }
    if (value === "category") {
      setIsEditingCategory(!isEditingCategory);
      setDataCategory({ id: id, name: name, color: color });
    }
    if (value === "status") {
      setIsEditingStatus(!isEditingStatus);
      setDataStatus({ id: id, name: name, color: color });
    }
    if (value === "priority") {
      setIsEditingPriority(!isEditingPriority);
      setDataPriority({ id: id, name: name, color: color });
    }
  };

  const handleCancel = (value) => {
    if (value === "area") {
      setIsEditingArea(false);
    }
    if (value === "category") {
      setIsEditingCategory(false);
    }
    if (value === "status") {
      setIsEditingStatus(false);
    }
    if (value === "priority") {
      setIsEditingPriority(false);
    }
  };

  const handleEditArea = async (e) => {
    e.preventDefault();
    if (dataArea.name.trim() === "") {
      return;
    }

    try {
      await dispatch(putArea(dataArea));
      setDataArea({ id: "", name: "", color: "" });
      setIsEditingArea(false);
    } catch (error) {
      console.error("Error al editar el Area:", error);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (dataCategory.name.trim() === "") {
      return;
    }

    try {
      await dispatch(putCategory(dataCategory));
      setDataCategory({ id: "", name: "", color: "" });
      setIsEditingCategory(false);
    } catch (error) {
      console.error("Error al editar el Categoria:", error);
    }
  };

  const handleEditStatus = async (e) => {
    e.preventDefault();
    if (dataStatus.name.trim() === "") {
      return;
    }

    try {
      await dispatch(putStatus(dataStatus));
      setDataStatus({ id: "", name: "", color: "" });
      setIsEditingStatus(false);
    } catch (error) {
      console.error("Error al editar el estado:", error);
    }
  };

  const handleEditPriority = async (e) => {
    e.preventDefault();
    if (dataPriority.name.trim() === "") {
      return;
    }

    try {
      await dispatch(putPriority(dataPriority));
      setDataPriority({ id: "", name: "", color: "" });
      setIsEditingPriority(false);
    } catch (error) {
      console.error("Error al editar la Prioridad:", error);
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
                        onClick={() =>
                          handleEdit(area.id, area.name, area.color, "area")
                        }
                      >
                        <MdModeEdit />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <form>
                      {isEditingArea && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva area"
                            style={{ color: dataArea.color }}
                            onChange={handleInputChangeEditingArea}
                            value={dataArea.name}
                          />
                          <div>
                            <HexColorPicker
                              color={dataArea.color}
                              onChange={handleColorChangeEditingArea}
                            />
                          </div>
                          <button onClick={handleEditArea}>Aceptar</button>
                          <button
                            className={styles.cancel}
                            onClick={() => handleCancel("area")}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </form>
                    {isEditingArea && (
                      <button
                        className={styles.delete}
                        onClick={() => handleDelete(dataArea.id, "area")}
                      >
                        Eliminar
                      </button>
                    )}
                  </li>
                  <li className={styles.liForm}>
                    {!isEditingArea && (
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
                    )}
                    <form onSubmit={handleSubmitArea}>
                      {creatingArea && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva area"
                            style={{ color: colorArea }}
                            onChange={handleInputChangeArea}
                            value={newArea.name}
                          />
                          <div>
                            <HexColorPicker
                              color={colorArea}
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
                        onClick={() =>
                          handleEdit(
                            category.id,
                            category.name,
                            category.color,
                            "category"
                          )
                        }
                      >
                        <MdModeEdit />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <form>
                      {isEditingCategory && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva categoria"
                            style={{ color: dataCategory.color }}
                            onChange={handleInputChangeEditingCategory}
                            value={dataCategory.name}
                          />
                          <div>
                            <HexColorPicker
                              color={dataCategory.color}
                              onChange={handleColorChangeEditingCategory}
                            />
                          </div>
                          <button onClick={handleEditCategory}>Aceptar</button>
                          <button
                            className={styles.cancel}
                            onClick={() => handleCancel("category")}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </form>
                    {isEditingCategory && (
                      <button
                        className={styles.delete}
                        onClick={() =>
                          handleDelete(dataCategory.id, "category")
                        }
                      >
                        Eliminar
                      </button>
                    )}
                  </li>
                  <li className={styles.liForm}>
                    {!isEditingCategory && (
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
                    )}
                    <form onSubmit={handleSubmitCategory}>
                      {creatingCategory && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva categoria"
                            style={{ color: colorCategory }}
                            onChange={handleInputChangeCategory}
                            value={newCategory.name}
                          />
                          <div>
                            <HexColorPicker
                              color={colorCategory}
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
                        onClick={() =>
                          handleEdit(
                            status.id,
                            status.name,
                            status.color,
                            "status"
                          )
                        }
                      >
                        <MdModeEdit />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <form>
                      {isEditingStatus && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nuevo estado"
                            style={{ color: dataStatus.color }}
                            onChange={handleInputChangeEditingStatus}
                            value={dataStatus.name}
                          />
                          <div>
                            <HexColorPicker
                              color={dataStatus.color}
                              onChange={handleColorChangeEditingStatus}
                            />
                          </div>
                          <button onClick={handleEditStatus}>Aceptar</button>
                          <button
                            className={styles.cancel}
                            onClick={() => handleCancel("status")}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </form>
                    {isEditingStatus && (
                      <button
                        className={styles.delete}
                        onClick={() => handleDelete(dataStatus.id, "status")}
                      >
                        Eliminar
                      </button>
                    )}
                  </li>
                  <li className={styles.liForm}>
                    {!isEditingStatus && (
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
                    )}
                    <form onSubmit={handleSubmitStatus}>
                      {creatingStatus && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nuevo estatus"
                            style={{ color: colorStatus }}
                            onChange={handleInputChangeStatus}
                            value={newStatus.name}
                          />
                          <div>
                            <HexColorPicker
                              color={colorStatus}
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
                        onClick={() =>
                          handleEdit(
                            priority.id,
                            priority.name,
                            priority.color,
                            "priority"
                          )
                        }
                      >
                        <MdModeEdit />
                      </button>
                    </li>
                  ))}
                  <li className={styles.liForm}>
                    <form>
                      {isEditingPriority && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva prioridad"
                            style={{ color: dataPriority.color }}
                            onChange={handleInputChangeEditingPriority}
                            value={dataPriority.name}
                          />
                          <div>
                            <HexColorPicker
                              color={dataPriority.color}
                              onChange={handleColorChangeEditingPriority}
                            />
                          </div>
                          <button onClick={handleEditPriority}>Aceptar</button>
                          <button
                            className={styles.cancel}
                            onClick={() => handleCancel("priority")}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </form>
                    {isEditingPriority && (
                      <button
                        className={styles.delete}
                        onClick={() =>
                          handleDelete(dataPriority.id, "priority")
                        }
                      >
                        Eliminar
                      </button>
                    )}
                  </li>
                  <li className={styles.liForm}>
                    {!isEditingPriority && (
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
                    )}
                    <form onSubmit={handleSubmitPriority}>
                      {creatingPriority && (
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="nueva prioridad"
                            style={{ color: colorPriority }}
                            onChange={handleInputChangePriority}
                            value={newPriority.name}
                          />
                          <div>
                            <HexColorPicker
                              color={colorPriority}
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
