/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { postTicket } from "../../redux/actions.js";
import { IoTicket } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
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
  const [selectedArea, setSelectedArea] = useState("Ninguna");
  const [isSelected, setIsSelected] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
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
    if (field === "AreaId" && value) {
      let area = allAreas.find((area) => area.id === value);
      setSelectedArea(area.name);
      setIsSelected(true);
    } else if (field === "AreaId" && !value) {
      setIsSelected(false);
      setSelectedArea("Ninguna");
    }
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

  const handleAdd = () => {
    setIsAdding(!isAdding);
  };

  return (
    <section className={styles.sectionFormTickets}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Ticket</h2>
        <span className={styles.ticketIcon}>
          <IoTicket />
        </span>
      </div>
      <section>
        <button onClick={handleAdd}>
          {isAdding ? "Cancelar" : "Cargar Ticket"}
        </button>
        {isAdding && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>-Seleccionar Area</label>
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
            </div>
            <div>
              <label>-Seleccionar Categoria</label>
              <select
                name="categories"
                value={newTicket.CategoryId}
                onChange={(e) =>
                  handleSelectChange("CategoryId", e.target.value)
                }
              >
                <option value="">Ninguna</option>
                {allCategories?.map((category, index) => (
                  <option key={category.id || index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>-Seleccionar Estado</label>
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
            </div>
            <div>
              <label>-Seleccionar Prioridad</label>
              <select
                name="priorities"
                value={newTicket.PriorityId}
                onChange={(e) =>
                  handleSelectChange("PriorityId", e.target.value)
                }
              >
                <option value="">Ninguna</option>
                {allPriorities?.map((priority, index) => (
                  <option key={priority.id || index} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>-Asignar a</label>
              <select
                name="responsable"
                value={newTicket.responsable}
                disabled={isSelected ? false : true}
                onChange={(e) =>
                  handleSelectChange("responsable", e.target.value)
                }
              >
                <option value="">Ninguno</option>
                {selectedArea === "administracion" &&
                  allAccounts
                    .filter((account) => account.level === "admin")
                    .map((adminAccount, index) => (
                      <option
                        key={adminAccount.id || index}
                        value={adminAccount.name}
                      >
                        {adminAccount.name}
                      </option>
                    ))}
                {selectedArea === "ventas" &&
                  allAccounts
                    .filter((account) => account.level === "sales")
                    .map((adminAccount, index) => (
                      <option
                        key={adminAccount.id || index}
                        value={adminAccount.name}
                      >
                        {adminAccount.name}
                      </option>
                    ))}
                {selectedArea === "servicio técnico" &&
                  allAccounts
                    .filter((account) => account.level === "support")
                    .map((adminAccount, index) => (
                      <option
                        key={adminAccount.id || index}
                        value={adminAccount.name}
                      >
                        {adminAccount.name}
                      </option>
                    ))}
              </select>
            </div>
            <div>
              <label>-Descripcion</label>
              <input
                type="text"
                name="text"
                placeholder="descripcion"
                value={newTicket.text}
                onChange={(e) => handleSelectChange("text", e.target.value)}
              />
            </div>
            <div>
              <label>-Cliente</label>
              <input
                type="text"
                name="client"
                placeholder="cliente"
                value={newTicket.client}
                onChange={(e) => handleSelectChange("client", e.target.value)}
              />
            </div>
            <div>
              <label>-Direccion</label>
              <input
                type="text"
                name="address"
                placeholder="direccion"
                value={newTicket.address}
                onChange={(e) => handleSelectChange("address", e.target.value)}
              />
            </div>
            <div>
              <label>-Coordenadas</label>
              <input
                type="text"
                name="coordinates"
                placeholder="Coordenadas"
                value={newTicket.coordinates}
                onChange={(e) => handleCoordinatesChange(e.target.value)}
              />
            </div>
            <div className={styles.createButtonContainer}>
            <button className={styles.createButton} type="submit">Crear</button>
            </div>
          </form>
        )}
      </section>
      <div style={{ height: "400px", width: "100%" }}>
        <button>Ver Mapa</button>
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
              draggable={false}
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
