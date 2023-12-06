/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaCity } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import {
  getUsers,
  getCities,
  postCity,
  deleteCity,
  deleteUser,
  putAccount,
  getAccounts,
} from "../../redux/actions.js";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import styles from "./Administrator.module.scss";

const Administrator = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.someReducer.allUsers);
  const allCities = useSelector((state) => state.someReducer.allCities);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newCity, setNewCity] = useState({ name: "" });
  const [level, setLevel] = useState("");
  const [newLevel, setNewLevel] = useState({
    id: "",
    level: "",
  });

  useEffect(() => {
    dispatch(getCities());
    dispatch(getUsers());
  }, [dispatch]);

  const handleExportToExcel = () => {
    const sheetData = allUsers.map((user) => [
      user.name,
      user.lastName,
      user.city,
      user.phoneNumber,
      user.emailAddress,
      user.address,
      user.consult,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headerRow, ...sheetData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    XLSX.writeFile(wb, "usuarios.xlsx");
  };

  const headerRow = [
    "Nombre",
    "Apellido",
    "Localidad",
    "Número telefónico",
    "Email",
    "Dirección",
    "Consulta",
  ];

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

  const handleEdit = (id, name, level) => {
    setIsEditing(true);
    setName(name);
    setLevel(level);
    setNewLevel({ ...newLevel, id: id });
  };

  const handleDeleteCity = (id) => {
    Swal.fire({
      title:
        "Esta seguro que desea eliminar esta localidad del formulario de prospectos? Esto no se podra deshacer!",
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
              title: "Localidad Eliminada!",
            });
            dispatch(deleteCity(id));
          } else if (result.isDenied) {
            return;
          }
        });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title:
        "Esta seguro que desea eliminar la información de este prospecto? Esto no se podra deshacer!",
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
              title: "Prospecto Eliminado!",
            });
            dispatch(deleteUser(id));
          } else if (result.isDenied) {
            return;
          }
        });
      } else if (result.isDenied) {
        return;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCity.name.trim() === "") {
      return;
    }

    try {
      await dispatch(postCity(newCity));
      setNewCity({ name: "" });
    } catch (error) {
      console.error("Error al agregar la ciudad:", error);
    }
  };

  const handleSubmitAccount = async (e) => {
    e.preventDefault();
    try {
      await Swal.fire({
        title: "Esta seguro que desea cambiar el rol de este usuario?",
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
                title: "Rol actualizado!",
              });
              dispatch(putAccount(newLevel));
              setNewLevel({ id: "", level: "" });
              dispatch(getAccounts());
              setIsEditing(false);
            } else if (result.isDenied) {
              return;
            }
          });
        } else if (result.isDenied) {
          return;
        }
      });
    } catch (error) {
      console.error("Error al cambiar de nivel:", error);
    }
  };

  const handleLevelChange = (value) => {
    setNewLevel({
      ...newLevel,
      level: value,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCity({ ...newCity, [name]: value });
  };

  const handleShowCities = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCities = () => {
    setIsAdding(!isAdding);
  };

  return (
    <section className={styles.sectionAdministrator}>
      <h1>
        <span>
          <MdAdminPanelSettings />
        </span>
        Administración
      </h1>
      <section className={styles.clients}>
        <h2>
          Prospectos
          <span>
            <RiUserFollowFill />
          </span>
        </h2>
        <div>
          <button className={styles.excelButton} onClick={handleExportToExcel}>
            <span>
              <RiFileExcel2Fill />
            </span>
            Excel
          </button>
        </div>
        <div className={styles.tableContainerTwo}>
          <section className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Localidad</th>
                  <th>Número telefonico</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th className={styles.consult}>Consulta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.city}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.emailAddress}</td>
                    <td>{user.address}</td>
                    <td className={styles.consult}>{user.consult}</td>
                    <td>
                      <div>
                        <button onClick={() => handleDeleteUser(user.id)}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </section>
      <section className={styles.citiesSection}>
        <h2>
          Localidades
          <span>
            <FaCity />
          </span>
        </h2>
        <div>
          <button
            className={styles.showCitiesButton}
            onClick={handleShowCities}
          >
            {isOpen ? "Ocultar" : "Mostrar"}
            <span>
              <IoEye />
            </span>
          </button>
        </div>
        {isOpen && (
          <div className={styles.olContainer}>
            {allCities.length > 0 ? (
              <ol>
                {allCities?.map((city, index) => (
                  <li key={city.id || index}>
                    {city.name}
                    <button onClick={() => handleDeleteCity(city.id)}>
                      <MdDelete />
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p>Cargando ciudades...</p>
            )}
          </div>
        )}
      </section>
      <section className={styles.addCitySection}>
        <div>
          <button
            className={`${styles.addCityButton} ${isAdding && styles.cancel}`}
            onClick={handleAddCities}
          >
            {isAdding ? "Cancelar" : "Agregar"}
            {!isAdding && (
              <span>
                <IoAdd />
              </span>
            )}
          </button>
        </div>
        {isAdding && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="localidad"
              onChange={handleInputChange}
              value={newCity.name}
            />
            <button type="submit">agregar</button>
          </form>
        )}
      </section>
      <section className={styles.usersSection}>
        <h2>
          Usuarios
          <span>
            <FaUserGear />
          </span>
        </h2>
        <div className={styles.editRolContainer}>
          {allAccounts.length > 0 ? (
            <ol>
              {allAccounts?.map((account, index) => (
                <li key={account.id || index}>
                  {account.name}
                  <button
                    onClick={() =>
                      handleEdit(account.id, account.name, account.level)
                    }
                  >
                    <MdModeEdit />
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p>Cargando cuentas...</p>
          )}
          {isEditing && (
            <div className={styles.editContainer}>
              <label>{name}</label>
              <select
                name="level"
                onChange={(e) => handleLevelChange(e.target.value)}
              >
                <option value={level}>
                  {level === "admin"
                    ? "Administrador"
                    : level === "sales"
                    ? "Ventas"
                    : level === "support" && "Técnico"}
                </option>
                {level !== "admin" && (
                  <option value="admin">Administrador</option>
                )}
                {level !== "support" && (
                  <option value="support">Técnico</option>
                )}
                {level !== "sales" && <option value="sales">Ventas</option>}
              </select>
              <div className={styles.buttons}>
                <button className={styles.cancel} onClick={handleCancel}>
                  cancelar
                </button>
                <button onClick={handleSubmitAccount}>aceptar</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Administrator;
