/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import { deleteTicket, putTicket } from "../../redux/actions.js";
import { GET_TICKET_BY_ID } from "../../redux/actionTypes.js";
import styles from "./TicketInfo.module.scss";

const TicketInfo = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth0();
  const allAreas = useSelector((state) => state.someReducer.allAreas);
  const allCategories = useSelector((state) => state.someReducer.allCategories);
  const allStatus = useSelector((state) => state.someReducer.allStatus);
  const allPriorities = useSelector((state) => state.someReducer.allPriorities);
  const TicketById = useSelector((state) => state.someReducer.TicketById);
  const allAccounts = useSelector((state) => state.someReducer.allAccounts);
  const [isReady, setIsReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTicket, setNewTicket] = useState({
    client: "",
    address: "",
    text: "",
    comment: "",
    responsable: "",
    AreaId: "",
    PriorityId: "",
    CategoryId: "",
    StatusId: "",
  });

  useEffect(() => {
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

    setNewTicket({
      client: TicketById[0].client,
      address: TicketById[0].address,
      text: TicketById[0].text,
      comment: "",
      responsable: TicketById[0].responsable,
      AreaId: TicketById[0].AreaId,
      PriorityId: TicketById[0].PriorityId,
      CategoryId: TicketById[0].CategoryId,
      StatusId: TicketById[0].StatusId,
    });
    if (TicketById[0].comment) {
      setNewTicket((prevTicket) => ({
        ...prevTicket,
        comment: TicketById[0].comment,
      }));
    }

    return () => localStorage.removeItem("TicketById");
  }, [user, isLoading]);

  const handleSelectChange = (field, value) => {
    setNewTicket({
      ...newTicket,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        putTicket({
          id: TicketById[0].id,
          client: newTicket.client,
          address: newTicket.address,
          text: newTicket.text,
          comment: newTicket.comment,
          responsable: newTicket.responsable,
          AreaId: newTicket.AreaId,
          PriorityId: newTicket.PriorityId,
          CategoryId: newTicket.CategoryId,
          StatusId: newTicket.StatusId,
        })
      );
      setNewTicket((prevTicket) => ({
        ...prevTicket,
        client: "",
        address: "",
        text: "",
        comment: "",
        responsable: "",
        AreaId: "",
        PriorityId: "",
        CategoryId: "",
        StatusId: "",
      }));
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
  };

  const handleNavigate = () => {
    window.history.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <section className={styles.sectionTicketInfo}>
      <h1>Ticket</h1>
      <button onClick={handleNavigate}>volver</button>
      <button onClick={handleEdit}>Editar</button>
      <div>
        {isReady ? (
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
                <th>Tiempo transcurrido</th>
                <th>Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {TicketById.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.username}</td>
                  {!isEditing ? (
                    <>
                      <td>{getValueNameById(ticket.AreaId, allAreas)}</td>
                      <td>
                        {getValueNameById(ticket.CategoryId, allCategories)}
                      </td>
                      <td>{getValueNameById(ticket.StatusId, allStatus)}</td>
                      <td>
                        {getValueNameById(ticket.PriorityId, allPriorities)}
                      </td>
                      <td>{ticket.responsable}</td>
                      <td>{ticket.client}</td>
                      <td>{ticket.address}</td>
                      <td>{ticket.text}</td>
                      <td>{ticket.comment}</td>
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
                            <option key={status.id || index} value={status.id}>
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
                          name="comment"
                          placeholder="comentario"
                          value={newTicket.comment}
                          onChange={(e) =>
                            handleSelectChange("comment", e.target.value)
                          }
                        />
                      </td>
                    </>
                  )}
                  <td>{calculateDaysSinceCreation(ticket.createdAt)} días</td>
                  <td>{ticket.createdAt}</td>
                  <td>
                    <button onClick={() => handleDeleteTicket(ticket.id)}>
                      Eliminar Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Cargando Tickets...</div>
        )}
      </div>
    </section>
  );
};

export default TicketInfo;
