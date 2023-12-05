/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import { putTicket, getTicketById } from "../../redux/actions.js";
import { GET_TICKET_BY_ID } from "../../redux/actionTypes.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { format } from "date-fns";
import { IoTicket } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CgDetailsMore } from "react-icons/cg";
import { FaUserGear } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
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
  const [view, setView] = useState({
    detail: true,
    client: false,
    map: false,
    description: false,
    history: false,
  });
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleSelectView = (value) => {
    value === "detail" &&
      !view.detail &&
      setView((prev) => ({
        ...prev,
        detail: true,
        client: false,
        map: false,
        description: false,
        history: false,
      }));
    value === "client" &&
      !view.client &&
      setView((prev) => ({
        ...prev,
        detail: false,
        client: true,
        map: false,
        description: false,
        history: false,
      }));
    value === "map" &&
      !view.map &&
      setView((prev) => ({
        ...prev,
        detail: false,
        client: false,
        map: true,
        description: false,
        history: false,
      }));
    value === "description" &&
      !view.description &&
      setView((prev) => ({
        ...prev,
        detail: false,
        client: false,
        map: false,
        description: true,
        history: false,
      }));
    value === "history" &&
      !view.history &&
      setView((prev) => ({
        ...prev,
        detail: false,
        client: false,
        map: false,
        description: false,
        history: true,
      }));
  };

  return (
    <section className={styles.sectionTicketInfo}>
      <h1>
        <span>
          <IoTicket />
        </span>
        Ticket
      </h1>
      <div className={styles.editContainer}>
        <>
          <button
            onClick={handleEdit}
            className={`${styles.editButton} ${isEditing && styles.cancel}`}
          >
            {isEditing ? "Cancelar" : "Editar"}
            <span>{!isEditing && <MdModeEdit />}</span>
          </button>
          {isEditing && (
            <button className={styles.aceptButton} onClick={handleSubmit}>
              Aceptar
            </button>
          )}
        </>
      </div>
      {isEditing && (
        <section className={styles.formEditSection}>
          <form>
            <div>
              <label>-Area:</label>
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
              <label>-Categoria:</label>
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
              <label>-Estatus:</label>
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
              <label>-Prioridad:</label>
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
              <label>-Encargado:</label>
              <select
                name="responsable"
                value={newTicket.responsable}
                onChange={(e) =>
                  handleSelectChange("responsable", e.target.value)
                }
              >
                <option value="">Ninguno</option>
                {allAccounts?.map((aaccount, index) => (
                  <option key={aaccount.id || index} value={aaccount.name}>
                    {aaccount.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>-Cliente:</label>
              <input
                type="text"
                name="client"
                placeholder="cliente"
                value={newTicket.client}
                onChange={(e) => handleSelectChange("client", e.target.value)}
              />
            </div>
            <div>
              <label>-Direccion:</label>
              <input
                type="text"
                name="address"
                placeholder="direccion"
                value={newTicket.address}
                onChange={(e) => handleSelectChange("address", e.target.value)}
              />
            </div>
            <div>
              <label>Descripcion</label>
              <input
                type="text"
                name="text"
                placeholder="descripcion"
                value={newTicket.text}
                onChange={(e) => handleSelectChange("text", e.target.value)}
              />
            </div>
            <div>
              <label>-Comentario:</label>
              <input
                type="text"
                name="commentText"
                placeholder="comentario"
                value={newTicket.commentText}
                onChange={(e) =>
                  handleSelectChange("commentText", e.target.value)
                }
              />
            </div>
            <div>
              <label>-Coordenadas:</label>
              <input
                type="text"
                name="coordinates"
                placeholder="Coordenadas"
                value={newTicket.coordinates}
                onChange={(e) => handleCoordinatesChange(e.target.value)}
              />
            </div>
          </form>
        </section>
      )}
      {isReady && TicketById.comments ? (
        <section className={styles.infoTicketSection}>
          <section className={styles.topInfoSection}>
            <ul>
              <li>
                <p>Operador: </p>
                {TicketById.username}
              </li>
              <li>
                <p>Encargado: </p>
                {TicketById.responsable}
              </li>
              <li>
                <p>Estado: </p>
                {getValueNameById(TicketById.StatusId, allStatus)}
              </li>
              <li>
                <p>Creado: </p>
                {format(new Date(TicketById.createdAt), "dd/MM/yyyy")}
              </li>
            </ul>
          </section>
          <section className={styles.infoSection}>
            <div className={styles.buttonsContainer}>
              <button
                onClick={() => handleSelectView("detail")}
                className={`${view.detail ? styles.selected : ""}`}
              >
                Detalle
              </button>
              <button
                onClick={() => handleSelectView("client")}
                className={`${view.client ? styles.selected : ""}`}
              >
                Cliente
              </button>
              <button
                onClick={() => handleSelectView("map")}
                className={`${view.map ? styles.selected : ""}`}
              >
                Mapa
              </button>
              <button
                onClick={() => handleSelectView("description")}
                className={`${view.description ? styles.selected : ""}`}
              >
                Descripcion
              </button>
              <button
                onClick={() => handleSelectView("history")}
                className={`${view.history ? styles.selected : ""}`}
              >
                Historial
              </button>
            </div>
            {view.detail && (
              <>
                <h3 className={styles.detailTitle}>
                  Detalle
                  <span>
                    <CgDetailsMore />
                  </span>
                </h3>
                <section className={styles.detailSection}>
                  <div className={styles.detailContainer}>
                    <h4>
                      Comentarios
                      <span>
                        <BiCommentDetail />
                      </span>
                    </h4>
                    <div className={styles.commentSection}>
                      {TicketById.comments.map((comment) => (
                        <div key={comment.id}>
                          <div>
                            <span className={styles.dateComments}>
                              {format(
                                new Date(comment.createdAt),
                                ">dd/MM/yyyy (HH:mm) "
                              )}
                            </span>
                            <span className={styles.dateComments}>
                              - {comment.user}:
                            </span>
                          </div>
                          {comment.text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.informationContainer}>
                    <h4>
                      Informacion
                      <span>
                        <IoMdInformationCircleOutline />
                      </span>
                    </h4>
                    <div>
                      <p>
                        <span>Area: </span>
                        {getValueNameById(TicketById.AreaId, allAreas)}
                      </p>
                      <p>
                        <span>Categoria: </span>
                        {getValueNameById(TicketById.CategoryId, allCategories)}
                      </p>
                      <p>
                        <span>Prioridad: </span>
                        {getValueNameById(TicketById.AreaId, allAreas)}
                      </p>
                      <p>
                        <span>Creado hace: </span>
                        {calculateDaysSinceCreation(TicketById.createdAt)} días
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}
            {view.client && (
              <section className={styles.clientSection}>
                <h3>
                  Cliente
                  <span>
                    <FaUserGear />
                  </span>
                </h3>
                <div>
                  <p>
                    <span>Nombre: </span>
                    {TicketById.client}
                  </p>
                  <p>
                    <span>Direccion: </span> {TicketById.address}
                  </p>
                </div>
              </section>
            )}
            {view.map && (
              <section className={styles.mapSection}>
                <div className={styles.mapContainer}>
                  <h3>
                    Mapa
                    <span>
                      <IoLocationSharp />
                    </span>
                  </h3>
                  {isReady && view.map && (
                    <div style={{ height: "400px", width: "100%" }}>
                      <MapContainer
                        center={newTicket.coordinates.split(",").map(Number)}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                        whenCreated={handleMapLoad}
                        onLoad={() =>
                          mapRef.current &&
                          mapRef.current.leafletElement.invalidateSize()
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
                              position={newTicket.coordinates
                                .split(",")
                                .map(Number)}
                              draggable={false}
                            >
                              <Popup>Tu destino aqui</Popup>
                            </Marker>
                          </>
                        )}
                      </MapContainer>
                    </div>
                  )}
                </div>
              </section>
            )}
            {view.description && (
              <section className={styles.descriptionSection}>
                <h3>
                  Descripción
                  <span>
                    <MdOutlineDescription />
                  </span>
                </h3>
                <div>
                  <p>{TicketById.text}</p>
                </div>
              </section>
            )}
            {view.history && (
              <section className={styles.historySection}>
                <h3>Historial</h3>
                <div>
                  {isReady ? (
                    <TicketHistory TicketById={TicketById} />
                  ) : (
                    <div>Cargando Historial...</div>
                  )}
                </div>
              </section>
            )}
          </section>
        </section>
      ) : (
        <div>Cargando Tickets...</div>
      )}
    </section>
  );
};

export default TicketInfo;
