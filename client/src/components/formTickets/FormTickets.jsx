/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { postTicket } from "../../redux/actions.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./FormTickets.module.scss";

const FormTickets = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const { user, isLoading } = useAuth0();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [map, setMap] = useState(null);
  const [newTicket, setNewTicket] = useState({
    username: "",
    AreaId: "",
    CategoryId: "",
    StatusId: "",
    PriorityId: "",
    client: "",
    address: "",
    text: "",
    responsable: "",
    coordinates: "",
  });

  useEffect(() => {
    if (mapRef.current && map) {
      map.invalidateSize();
    }
    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        const userAccount = allAccounts.find(
          (account) => account.name === user.name
        );
        if (userAccount) {
          setNewTicket((prevTicket) => ({
            ...prevTicket,
            username: userAccount.name,
          }));
        }
      }
    };

    fetchData();
  }, [isLoading, user, allAccounts, map]);

  const handleSelectChange = (field, value) => {
    setNewTicket({
      ...newTicket,
      [field]: value,
    });
  };

  const handleCoordinatesChange = (value) => {
    const coordinatesArray = value.split(/,\s*/).map(Number);

    if (coordinatesArray.length === 2 && !coordinatesArray.some(isNaN)) {
      setNewTicket({
        ...newTicket,
        coordinates: coordinatesArray.join(","),
      });
    } else {
      console.error("Formato de coordenadas incorrecto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        postTicket({
          username: newTicket.username,
          AreaId: newTicket.AreaId,
          CategoryId: newTicket.CategoryId,
          StatusId: newTicket.StatusId,
          PriorityId: newTicket.PriorityId,
          client: newTicket.client,
          address: newTicket.address,
          text: newTicket.text,
          responsable: newTicket.responsable,
          coordinates: newTicket.coordinates,
        })
      );
      setNewTicket((prevTicket) => ({
        ...prevTicket,
        username: "",
        AreaId: "",
        CategoryId: "",
        StatusId: "",
        PriorityId: "",
        client: "",
        address: "",
        text: "",
        responsable: "",
        coordinates: "",
      }));
    } catch (error) {
      console.error("Error al agregar un ticket:", error);
    }
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  return (
    <section className={styles.sectionFormTickets}>
      <h1>Crear Ticket</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="areas"
          value={newTicket.AreaId}
          onChange={(e) => handleSelectChange("AreaId", e.target.value)}
        >
          <option value="">Ninguna</option>
          {allAreas?.map((area, index) => (
            <option key={area.id || index} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          name="categories"
          value={newTicket.CategoryId}
          onChange={(e) => handleSelectChange("CategoryId", e.target.value)}
        >
          <option value="">Ninguna</option>
          {allCategories?.map((category, index) => (
            <option key={category.id || index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={newTicket.StatusId}
          onChange={(e) => handleSelectChange("StatusId", e.target.value)}
        >
          <option value="">Ninguno</option>
          {allStatus?.map((status, index) => (
            <option key={status.id || index} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        <select
          name="priorities"
          value={newTicket.PriorityId}
          onChange={(e) => handleSelectChange("PriorityId", e.target.value)}
        >
          <option value="">Ninguna</option>
          {allPriorities?.map((priority, index) => (
            <option key={priority.id || index} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>
        <select
          name="responsable"
          value={newTicket.responsable}
          onChange={(e) => handleSelectChange("responsable", e.target.value)}
        >
          <option value="">Ninguno</option>
          {allAccounts?.map((aaccount, index) => (
            <option key={aaccount.id || index} value={aaccount.name}>
              {aaccount.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="text"
          placeholder="descripcion"
          value={newTicket.text}
          onChange={(e) => handleSelectChange("text", e.target.value)}
        />
        <input
          type="text"
          name="client"
          placeholder="cliente"
          value={newTicket.client}
          onChange={(e) => handleSelectChange("client", e.target.value)}
        />
        <input
          type="text"
          name="address"
          placeholder="direccion"
          value={newTicket.address}
          onChange={(e) => handleSelectChange("address", e.target.value)}
        />
        <input
          type="text"
          name="coordinates"
          placeholder="Coordenadas"
          value={newTicket.coordinates}
          onChange={(e) => handleCoordinatesChange(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>
      <div style={{ height: "400px", width: "100%" }}>
        <MapContainer
          center={
            newTicket.coordinates
              ? newTicket.coordinates.split(",").map(Number)
              : [-27.20789114815453, -54.975951133931545]
          }
          zoom={9}
          style={{ height: "100%", width: "100%" }}
          whenCreated={handleMapLoad}
          onLoad={() =>
            mapRef.current && mapRef.current.leafletElement.invalidateSize()
          }
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {newTicket.coordinates && (
            <Marker
              position={newTicket.coordinates.split(",").map(Number)}
              draggable={true}
            >
              <Popup>Tu ubicación ingresada aquí.</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default FormTickets;
