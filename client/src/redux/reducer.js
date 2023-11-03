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
} from "./actionTypes.js";

let initialState = {
  allUsers: [],
  allCities: [],
  allAccounts: [],
  allAreas: [],
  allStatus: [],
  allPriorities: [],
  allInformation: [],
  allCategories: [],
  allTickets: [],
};

let updatedCities;
let updatedUsers;
let updatedAreas;
let updatedCategories;
let updatedPriorities;
let updatedStatus;
let updatedInformation;

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
    case GET_ACCOUNTS:
      return {
        ...state,
        allAccounts: action.payload,
      };
    case POST_ACCOUNT:
      return {
        ...state,
        allAccounts: [...state.allAccounts, action.payload],
      };
    case GET_AREAS:
      return {
        ...state,
        allAreas: action.payload,
      };
    case GET_STATUS:
      return {
        ...state,
        allStatus: action.payload,
      };
    case GET_PRIORITIES:
      return {
        ...state,
        allPriorities: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case GET_INFORMATION:
      return {
        ...state,
        allInformation: action.payload,
      };
    case GET_TICKETS:
      return {
        ...state,
        allTickets: action.payload,
      };
    case POST_AREA:
      return {
        ...state,
        allAreas: [...state.allAreas, action.payload],
      };
    case POST_STATUS:
      return {
        ...state,
        allStatus: [...state.allStatus, action.payload],
      };
    case POST_PRIORITY:
      return {
        ...state,
        allPriorities: [...state.allPriorities, action.payload],
      };
    case POST_CATEGORY:
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload],
      };
    case POST_INFORMATION:
      return {
        ...state,
        allInformation: [...state.allInformation, action.payload],
      };
    case POST_TICKET:
      return {
        ...state,
        allTickets: [...state.allTickets, action.payload],
      };
    case DELETE_AREA:
      updatedAreas = state.allAreas.filter(
        (area) => area.id !== action.payload
      );
      return {
        ...state,
        allAreas: updatedAreas,
      };
    case DELETE_CATEGORY:
      updatedCategories = state.allCategories.filter(
        (category) => category.id !== action.payload
      );
      return {
        ...state,
        allCategories: updatedCategories,
      };
    case DELETE_STATUS:
      updatedStatus = state.allStatus.filter(
        (status) => status.id !== action.payload
      );
      return {
        ...state,
        allStatus: updatedStatus,
      };
    case DELETE_PRIORITY:
      updatedPriorities = state.allPriorities.filter(
        (priority) => priority.id !== action.payload
      );
      return {
        ...state,
        allPriorities: updatedPriorities,
      };
    case PUT_INFORMATION:
      updatedInformation = state.allInformation.map((info) => {
        if (info.id === action.payload.id) {
          return {
            ...info,
            client: action.payload.client,
            address: action.payload.address,
            text: action.payload.text,
            comment: action.payload.comment,
          };
        }
        return info;
      });

      return {
        ...state,
        allInformation: updatedInformation,
      };
    default:
      return state;
  }
}

export default rootReducer;
