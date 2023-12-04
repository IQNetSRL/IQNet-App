/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import {
  getUsers,
  getCities,
  postCity,
  deleteCity,
  deleteUser,
  putAccount,
  getAccounts,
} from "../../redux/actions.js";
import * as XLSX from "xlsx";
import styles from "./Administrator.module.scss";

const Administrator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.someReducer.allUsers);
  const allCities = useSelector((state) => state.someReducer.allCities);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleNavigate = () => {
    navigate("/home");
  };

  const handleEdit = (id, level) => {
    setIsEditing(true);
    setLevel(level);
    setNewLevel({ ...newLevel, id: id });
  };

  const handleDeleteCity = (id) => {
    dispatch(deleteCity(id));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
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
      await dispatch(putAccount(newLevel));
      setNewLevel({ id: "", level: "" });
      dispatch(getAccounts());
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
          <span>
            <RiUserFollowFill />
          </span>
          Prospectos
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
                  <th>Consulta</th>
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
                    <td>{user.consult}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>
                        eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </section>
      <section>
        <h2>Localidades</h2>
        {allCities.length > 0 ? (
          <ol>
            {allCities?.map((city, index) => (
              <li key={city.id || index}>
                {city.name}
                <button onClick={() => handleDeleteCity(city.id)}>
                  eliminar
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p>Cargando ciudades...</p>
        )}
      </section>
      <section>
        <h3>Agregar Localidad</h3>
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
      </section>
      <section>
        <h2>Usuarios</h2>
        {allAccounts.length > 0 ? (
          <ol>
            {allAccounts?.map((account, index) => (
              <li key={account.id || index}>
                {account.name}
                <button onClick={() => handleEdit(account.id, account.level)}>
                  editar
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p>Cargando cuentas...</p>
        )}
        {isEditing && (
          <div>
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
              <option value="admin">Administrador</option>
              <option value="support">Técnico</option>
              <option value="sales">Ventas</option>
            </select>
            <button onClick={handleCancel}>cancelar</button>
            <button onClick={handleSubmitAccount}>aceptar</button>
          </div>
        )}
      </section>
      <button onClick={handleNavigate}>ir a home</button>
    </section>
  );
};

export default Administrator;
