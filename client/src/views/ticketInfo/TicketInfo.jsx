/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import { deleteTicket, putTicket, getTicketById } from "../../redux/actions.js";
import { GET_TICKET_BY_ID } from "../../redux/actionTypes.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import TicketHistory from "../../components/ticketHistory/TicketHistory.jsx";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./TicketInfo.module.scss";

const TicketInfo = (props) => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const { user, isLoading } = useAuth0();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const TicketById = useSelector((state) => state.someReducer.TicketById);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [isReady, setIsReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [map, setMap] = useState(null);
  const [viewMap, setViewMap] = useState(false);
  const [newTicket, setNewTicket] = useState({
    client: "",
    address: "",
    text: "",
    commentText: "",
    responsable: "",
    AreaId: "",
    PriorityId: "",
    CategoryId: "",
    StatusId: "",
    coordinates: "",
    user: "",
  });

  TicketInfo.propTypes = {
    rol: PropTypes.string.isRequired,
    currentLocation: PropTypes.array,
  };

  useEffect(() => {
    if (mapRef.current && map) {
      map.invalidateSize();
    }

    const fetchData = async () => {
      if (!isLoading && user && user.name) {
        setIsReady(true);
      }
    };

    fetchData();

    const storedTicket = localStorage.getItem("TicketById");
    if (storedTicket) {
      dispatch({
        type: GET_TICKET_BY_ID,
        payload: JSON.parse(storedTicket),
      });
    }

    return () => localStorage.removeItem("TicketById");
  }, [user, isLoading, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (TicketById.client) {
        setNewTicket({
          client: TicketById.client,
          address: TicketById.address,
          text: TicketById.text,
          commentText: "",
          responsable: TicketById.responsable,
          AreaId: TicketById.AreaId,
          PriorityId: TicketById.PriorityId,
          CategoryId: TicketById.CategoryId,
          StatusId: TicketById.StatusId,
          coordinates: TicketById.coordinates,
          user: user.name,
        });
        if (TicketById.comment) {
          setNewTicket((prevTicket) => ({
            ...prevTicket,
            commentText: TicketById.comment,
          }));
        }
      }
    };

    fetchData();
  }, [TicketById]);

  const customIcon = new L.Icon({
    iconUrl: "../../../dist/images/actualLocation.svg",
    iconSize: [20, 20],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

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
    setIsEditing(false);
    setViewMap(false);

    try {
      await dispatch(
        putTicket({
          id: TicketById.id,
          client: newTicket.client,
          address: newTicket.address,
          text: newTicket.text,
          commentText: newTicket.commentText,
          responsable: newTicket.responsable,
          AreaId: newTicket.AreaId,
          PriorityId: newTicket.PriorityId,
          CategoryId: newTicket.CategoryId,
          StatusId: newTicket.StatusId,
          coordinates: newTicket.coordinates,
          user: newTicket.user,
        })
      );
      setNewTicket((prevTicket) => ({
        ...prevTicket,
        client: "",
        address: "",
        text: "",
        commentText: "",
        responsable: "",
        AreaId: "",
        PriorityId: "",
        CategoryId: "",
        StatusId: "",
        coordinates: "",
        user: "",
      }));
      dispatch(getTicketById(TicketById.id));
    } catch (error) {
      console.error("Error al agregar un ticket:", error);
    }
  };

  const calculateDaysSinceCreation = (createdAt) => {
    const now = new Date();
    const creationDate = new Date(createdAt);
    return differenceInDays(now, creationDate);
  };

  const getValueNameById = (id, state) => {
    const value = state.find((priority) => priority.id === id);
    return value ? value.name : "";
  };

  const handleDeleteTicket = (id) => {
    dispatch(deleteTicket(id));
    window.history.back();
  };

  const handleNavigate = () => {
    window.history.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleViewMap = () => {
    setViewMap(!viewMap);
  };

  return (
    <section className={styles.sectionTicketInfo}>
      <h1>Ticket</h1>
      <button onClick={handleNavigate}>volver</button>
      <button onClick={handleEdit}>Editar</button>
      {/* borrar esto */}
      <br />
      {isEditing && (
        <>
          <button onClick={handleSubmit}>Aceptar</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </>
      )}
      <div className={styles.ticketList}>
        {isReady && TicketById.comments ? (
          <>
            <section className={styles.tableSection}>
              <table>
                <thead>
                  <tr>
                    <th>Operador</th>
                    <th>Área</th>
                    <th>Categoría</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                    <th>Encargado</th>
                    <th>Cliente</th>
                    <th>Dirección</th>
                    <th>Descripción</th>
                    <th>Comentarios</th>
                    {isEditing && <th>Coordenadas</th>}
                    <th>Tiempo transcurrido</th>
                    <th>Creación</th>
                    {props.rol === "admin" && <th>Acciones</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr key={TicketById.id}>
                    <td>{TicketById.username}</td>
                    {!isEditing ? (
                      <>
                        <td>{getValueNameById(TicketById.AreaId, allAreas)}</td>
                        <td>
                          {getValueNameById(
                            TicketById.CategoryId,
                            allCategories
                          )}
                        </td>
                        <td>
                          {getValueNameById(TicketById.StatusId, allStatus)}
                        </td>
                        <td>
                          {getValueNameById(
                            TicketById.PriorityId,
                            allPriorities
                          )}
                        </td>
                        <td>{TicketById.responsable}</td>
                        <td>{TicketById.client}</td>
                        <td>{TicketById.address}</td>
                        <td>{TicketById.text}</td>
                        <td>
                          {TicketById.comments.map((comment) => (
                            <div key={comment.id}>
                              {comment.text} - {comment.user} -{" "}
                              {comment.createdAt}
                            </div>
                          ))}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <select
                            name="areas"
                            value={newTicket.AreaId}
                            onChange={(e) =>
                              handleSelectChange("AreaId", e.target.value)
                            }
                          >
                            <option value="">Ninguna</option>
                            {allAreas?.map((area, index) => (
                              <option key={area.id || index} value={area.id}>
                                {area.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            name="categories"
                            value={newTicket.CategoryId}
                            onChange={(e) =>
                              handleSelectChange("CategoryId", e.target.value)
                            }
                          >
                            <option value="">Ninguna</option>
                            {allCategories?.map((category, index) => (
                              <option
                                key={category.id || index}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            name="status"
                            value={newTicket.StatusId}
                            onChange={(e) =>
                              handleSelectChange("StatusId", e.target.value)
                            }
                          >
                            <option value="">Ninguno</option>
                            {allStatus?.map((status, index) => (
                              <option
                                key={status.id || index}
                                value={status.id}
                              >
                                {status.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            name="priorities"
                            value={newTicket.PriorityId}
                            onChange={(e) =>
                              handleSelectChange("PriorityId", e.target.value)
                            }
                          >
                            <option value="">Ninguna</option>
                            {allPriorities?.map((priority, index) => (
                              <option
                                key={priority.id || index}
                                value={priority.id}
                              >
                                {priority.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            name="responsable"
                            value={newTicket.responsable}
                            onChange={(e) =>
                              handleSelectChange("responsable", e.target.value)
                            }
                          >
                            <option value="">Ninguno</option>
                            {allAccounts?.map((aaccount, index) => (
                              <option
                                key={aaccount.id || index}
                                value={aaccount.name}
                              >
                                {aaccount.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            name="client"
                            placeholder="cliente"
                            value={newTicket.client}
                            onChange={(e) =>
                              handleSelectChange("client", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="address"
                            placeholder="direccion"
                            value={newTicket.address}
                            onChange={(e) =>
                              handleSelectChange("address", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="text"
                            placeholder="descripcion"
                            value={newTicket.text}
                            onChange={(e) =>
                              handleSelectChange("text", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="commentText"
                            placeholder="comentario"
                            value={newTicket.commentText}
                            onChange={(e) =>
                              handleSelectChange("commentText", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="coordinates"
                            placeholder="Coordenadas"
                            value={newTicket.coordinates}
                            onChange={(e) =>
                              handleCoordinatesChange(e.target.value)
                            }
                          />
                        </td>
                      </>
                    )}
                    <td>
                      {calculateDaysSinceCreation(TicketById.createdAt)} días
                    </td>
                    <td>{TicketById.createdAt}</td>
                    {props.rol === "admin" && (
                      <td>
                        <button
                          onClick={() => handleDeleteTicket(TicketById.id)}
                        >
                          Eliminar Ticket
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        ) : (
          <div>Cargando Tickets...</div>
        )}
      </div>
      {isReady && !isEditing ? (
        <TicketHistory TicketById={TicketById} />
      ) : (
        <div>Cargando Historial...</div>
      )}
      <button onClick={handleViewMap}>Ver Mapa</button>
      {isReady && viewMap && (
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer
            center={newTicket.coordinates.split(",").map(Number)}
            zoom={13}
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
              <>
                {props.currentLocation && (
                  <Marker
                    position={props.currentLocation}
                    draggable={false}
                    icon={customIcon}
                  >
                    <Popup>Tu ubicación actual</Popup>
                  </Marker>
                )}
                <Marker
                  position={newTicket.coordinates.split(",").map(Number)}
                  draggable={false}
                >
                  <Popup>Tu destino aqui</Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>
      )}
    </section>
  );
};

export default TicketInfo;
