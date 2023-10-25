import axios from "axios";
import {
  GET_USERS,
  DELETE_USER,
  GET_CITIES,
  POST_CITY,
  DELETE_CITY,
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
      const response = await axios.delete(`/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
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

export function postUsers(name) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/cities`, {
        name: name,
      });
      return dispatch({
        type: POST_CITY,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}

export function deleteCity(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/cities/${id}`);
      dispatch({
        type: DELETE_CITY,
        payload: response.data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
}
