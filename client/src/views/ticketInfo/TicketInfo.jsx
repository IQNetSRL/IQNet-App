/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { differenceInDays } from "date-fns";
import { deleteTicket, putTicket, getTicketById } from "../../redux/actions.js";
import { GET_TICKET_BY_ID } from "../../redux/actionTypes.js";
import styles from "./TicketInfo.module.scss";
import TicketHistory from "../../components/ticketHistory/TicketHistory.jsx";

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
    commentText: "",
    responsable: "",
    AreaId: "",
    PriorityId: "",
    CategoryId: "",
    StatusId: "",
    user: "",
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

  const handleSelectChange = (field, value) => {
    setNewTicket({
      ...newTicket,
      [field]: value,
    });
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
      <div>
        {isReady && TicketById.comments ? (
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
              <tr key={TicketById.id}>
                <td>{TicketById.username}</td>
                {!isEditing ? (
                  <>
                    <td>{getValueNameById(TicketById.AreaId, allAreas)}</td>
                    <td>
                      {getValueNameById(TicketById.CategoryId, allCategories)}
                    </td>
                    <td>{getValueNameById(TicketById.StatusId, allStatus)}</td>
                    <td>
                      {getValueNameById(TicketById.PriorityId, allPriorities)}
                    </td>
                    <td>{TicketById.responsable}</td>
                    <td>{TicketById.client}</td>
                    <td>{TicketById.address}</td>
                    <td>{TicketById.text}</td>
                    <td>
                      {TicketById.comments.map((comment) => (
                        <div key={comment.id}>
                          {comment.text} - {comment.user} - {comment.createdAt}
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
                        name="commentText"
                        placeholder="comentario"
                        value={newTicket.commentText}
                        onChange={(e) =>
                          handleSelectChange("commentText", e.target.value)
                        }
                      />
                    </td>
                  </>
                )}
                <td>{calculateDaysSinceCreation(TicketById.createdAt)} días</td>
                <td>{TicketById.createdAt}</td>
                <td>
                  <button onClick={() => handleDeleteTicket(TicketById.id)}>
                    Eliminar Ticket
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div>Cargando Tickets...</div>
        )}
        {isReady && !isEditing ? (
          <TicketHistory TicketById={TicketById} />
        ) : (
          <div>Cargando Historial...</div>
        )}
      </div>
    </section>
  );
};

export default TicketInfo;
