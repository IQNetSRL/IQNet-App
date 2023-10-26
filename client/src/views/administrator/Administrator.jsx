/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, getCities, postCity } from "../../redux/actions.js";
import styles from "./Administrator.module.scss";

const Administrator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.someReducer.allUsers);
  const allCities = useSelector((state) => state.someReducer.allCities);
  const [newCity, setNewCity] = useState({ name: "" });

  useEffect(() => {
    dispatch(getCities());
    dispatch(getUsers());
  }, []);

  const handleNavigate = () => {
    navigate("/");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCity({ ...newCity, [name]: value });
  };
  console.log(allCities);
  return (
    <section className={styles.sectionAdministrator}>
      <h1>Administrator</h1>
      <section>
        <h2>Usuarios</h2>
        <ol>
          {allUsers?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ol>
      </section>
      <section>
        <h2>Localidades</h2>
        {allCities.length > 0 ? (
          <ol>
            {allCities?.map((city, index) => (
              <li key={city.id || index}>{city.name}</li>
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
      <button onClick={handleNavigate}>ir a home</button>
    </section>
  );
};

export default Administrator;
