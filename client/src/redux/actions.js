import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_USERS,
  DELETE_USER,
  GET_CITIES,
  POST_CITY,
  DELETE_CITY,
  GET_ACCOUNTS,
  POST_ACCOUNT,
  DELETE_AREA,
  GET_AREAS,
  POST_AREA,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  POST_CATEGORY,
  PUT_TICKET,
  DELETE_STATUS,
  GET_STATUS,
  POST_STATUS,
  DELETE_PRIORITY,
  GET_PRIORITIES,
  POST_PRIORITY,
  GET_TICKETS,
  POST_TICKET,
  DELETE_TICKET,
  GET_TICKET_BY_ID,
  PUT_ACCOUNT,
  GET_CUSTOMERS,
  POST_CUSTOMERS,
  PUT_AREA,
  PUT_CATEGORY,
  PUT_STATUS,
  PUT_PRIORITY,
  DELETE_ACCOUNT,
} from "./actionTypes.js";

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

export function getUsers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/users");
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      // alert("Error al obtener usuarios");
    }
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };
}

export function getCities() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/cities");
      dispatch({
        type: GET_CITIES,
        payload: response.data,
      });
    } catch (error) {
      // alert("Error al obtener usuarios");
    }
  };
}

export function getCustomers() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/customers");
      dispatch({
        type: GET_CUSTOMERS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postCity(name) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/cities`, {
        name: name.name,
      });
      return dispatch({
        type: POST_CITY,
        payload: response.data[0],
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function deleteCity(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/cities/${id}`);
      dispatch({
        type: DELETE_CITY,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar la ciudad:", error);
    }
  };
}

export function getAccounts() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/accounts");
      dispatch({
        type: GET_ACCOUNTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postAccount(name) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/accounts`, {
        name: name,
      });
      return dispatch({
        type: POST_ACCOUNT,
        payload: response.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteAccount(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/accounts/${id}`);
      dispatch({
        type: DELETE_ACCOUNT,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar el cuenta:", error);
    }
  };
}

export function postArea(newArea) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/areas`, {
        name: newArea.name,
        color: newArea.color,
      });
      return dispatch({
        type: POST_AREA,
        payload: response.data[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function putArea(newArea) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/values/areas/${newArea.id}`, {
        name: newArea.name,
        color: newArea.color,
      });
      return dispatch({
        type: PUT_AREA,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function putCategory(newCategory) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/values/categories/${newCategory.id}`, {
        name: newCategory.name,
        color: newCategory.color,
      });
      return dispatch({
        type: PUT_CATEGORY,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function putStatus(newStatus) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/values/status/${newStatus.id}`, {
        name: newStatus.name,
        color: newStatus.color,
      });
      return dispatch({
        type: PUT_STATUS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function putPriority(newPriority) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/values/priorities/${newPriority.id}`, {
        name: newPriority.name,
        color: newPriority.color,
      });
      return dispatch({
        type: PUT_PRIORITY,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function postPriority(newPriority) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/priorities`, {
        name: newPriority.name,
        color: newPriority.color,
      });
      return dispatch({
        type: POST_PRIORITY,
        payload: response.data[0],
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function postCategory(newCategory) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/categories`, {
        name: newCategory.name,
        color: newCategory.color,
      });
      return dispatch({
        type: POST_CATEGORY,
        payload: response.data[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function postStatus(newStatus) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/status`, {
        name: newStatus.name,
        color: newStatus.color,
      });
      return dispatch({
        type: POST_STATUS,
        payload: response.data[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteArea(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/values/areas/${id}`);
      dispatch({
        type: DELETE_AREA,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar el area:", error);
    }
  };
}

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/values/categories/${id}`);
      dispatch({
        type: DELETE_CATEGORY,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
    }
  };
}

export function deleteStatus(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/values/status/${id}`);
      dispatch({
        type: DELETE_STATUS,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar el estatus:", error);
    }
  };
}

export function deletePriority(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/values/priorities/${id}`);
      dispatch({
        type: DELETE_PRIORITY,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar la prioridad:", error);
    }
  };
}

export function getAreas(areaId) {
  return async function (dispatch) {
    try {
      let url = "/values/areas";
      if (areaId) {
        url += `?areaId=${areaId}`;
      }

      const response = await axios.get(url);
      dispatch({
        type: GET_AREAS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories(categoryId) {
  return async function (dispatch) {
    try {
      let url = "/values/categories";
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
      }

      const response = await axios.get(url);
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getStatus(statusId) {
  return async function (dispatch) {
    try {
      let url = "/values/status";
      if (statusId) {
        url += `?statusId=${statusId}`;
      }

      const response = await axios.get(url);
      dispatch({
        type: GET_STATUS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPriorities(priorityId) {
  return async function (dispatch) {
    try {
      let url = "/values/priorities";
      if (priorityId) {
        url += `?priorityId=${priorityId}`;
      }

      const response = await axios.get(url);
      dispatch({
        type: GET_PRIORITIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putAccount(accountInfo) {
  const level = accountInfo.level;
  return async function (dispatch) {
    try {
      const response = await axios.put(`/accounts/${accountInfo.id}`, {
        level,
      });

      dispatch({
        type: PUT_ACCOUNT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putTicket(ticketInfo) {
  const address = ticketInfo.address;
  const text = ticketInfo.text;
  const commentText = ticketInfo.commentText;
  const responsable = ticketInfo.responsable;
  const AreaId = ticketInfo.AreaId;
  const PriorityId = ticketInfo.PriorityId;
  const CategoryId = ticketInfo.CategoryId;
  const StatusId = ticketInfo.StatusId;
  const coordinates = ticketInfo.coordinates;
  const secondAddress = ticketInfo.secondAddress;
  const user = ticketInfo.user;

  return async function (dispatch) {
    try {
      const response = await axios.put(`/tickets/${ticketInfo.id}`, {
        address,
        text,
        commentText,
        responsable,
        AreaId,
        PriorityId,
        CategoryId,
        StatusId,
        coordinates,
        secondAddress,
        user,
      });

      dispatch({
        type: PUT_TICKET,
        payload: response.data,
      });

      Toast.fire({
        icon: "success",
        title: "Ticket Actualizado!",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Ocurrio un error!",
      });
      console.log(error);
    }
  };
}

export function getTickets(filters) {
  return async function (dispatch) {
    try {
      const url = "/tickets?" + new URLSearchParams(filters).toString();
      const response = await axios.get(url);
      dispatch({
        type: GET_TICKETS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener los tickets:", error);
    }
  };
}

export function getTicketById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/tickets?Id=${id}`);
      const ticket = response.data[0];

      localStorage.setItem("TicketById", JSON.stringify(ticket));
      dispatch({
        type: GET_TICKET_BY_ID,
        payload: ticket,
      });
    } catch (error) {
      console.error("Error al obtener ticket:", error);
    }
  };
}

export function postTicket(ticketData) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/tickets", ticketData);
      dispatch({
        type: POST_TICKET,
        payload: response.data[0],
      });
      Toast.fire({
        icon: "success",
        title: "Ticket Creado!",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Ocurrio un error!",
      });
      console.error("Error al agregar un ticket:", error);
    }
  };
}

export function postCustomers(result) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/customers/post", result);
      dispatch({
        type: POST_CUSTOMERS,
        payload: response.data[0],
      });
    } catch (error) {
      console.error("Error al agregar customers:", error);
    }
  };
}

export function deleteTicket(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/tickets/${id}`);
      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });
    } catch (error) {
      console.error("Error al eliminar la ticket:", error);
    }
  };
}
