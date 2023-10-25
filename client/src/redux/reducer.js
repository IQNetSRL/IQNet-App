import {
  GET_USERS,
  DELETE_USER,
  GET_CITIES,
  POST_CITY,
  DELETE_CITY,
} from "./actionTypes.js";

let initialState = {
  allUsers: [],
  allCities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
      };
    case GET_CITIES:
      return {
        ...state,
        allCities: action.payload,
      };
    case POST_CITY:
      return {
        ...state,
        allCities: [...state.allCities, action.payload],
      };
    case DELETE_CITY:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
