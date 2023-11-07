import axios from "axios";
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
  PUT_INFORMATION,
  GET_INFORMATION,
  POST_INFORMATION,
  DELETE_STATUS,
  GET_STATUS,
  POST_STATUS,
  DELETE_PRIORITY,
  GET_PRIORITIES,
  POST_PRIORITY,
  GET_TICKETS,
  POST_TICKET,
  DELETE_TICKET,
} from "./actionTypes.js";

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
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postArea(name, color) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/areas`, {
        name: name.name,
        color: color,
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

export function postPriority(name, color) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/priorities`, {
        name: name,
        color: color,
      });
      return dispatch({
        type: POST_PRIORITY,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function postCategory(name, color) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/categories`, {
        name: name.name,
        color: color,
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

export function postStatus(name, color) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/values/status`, {
        name: name.name,
        color: color,
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

export function postInformation(client, address, text, comment) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/information`, {
        client: client,
        address: address,
        text: text,
        comment: comment,
      });
      return dispatch({
        type: POST_INFORMATION,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
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

export function getInformation(informationId) {
  return async function (dispatch) {
    try {
      let url = "/information";
      if (informationId) {
        url += `?informationId=${informationId}`;
      }

      const response = await axios.get(url);
      dispatch({
        type: GET_INFORMATION,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putInformation(id, client, address, text, comment) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/information/${id}`, {
        client,
        address,
        text,
        comment,
      });

      dispatch({
        type: PUT_INFORMATION,
        payload: response.data,
      });
    } catch (error) {
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

export function postTicket(ticketData) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/tickets", ticketData);
      dispatch({
        type: POST_TICKET,
        payload: response.data[0],
      });
    } catch (error) {
      console.error("Error al agregar un ticket:", error);
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
