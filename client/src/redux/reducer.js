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

let updatedCities;
let updatedUsers;

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case DELETE_USER:
      updatedUsers = state.allUsers.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        allUsers: updatedUsers,
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
      updatedCities = state.allCities.filter(
        (city) => city.id !== action.payload
      );
      return {
        ...state,
        allCities: updatedCities,
      };
    default:
      return state;
  }
}

export default rootReducer;
