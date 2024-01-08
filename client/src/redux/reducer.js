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
  DELETE_STATUS,
  GET_STATUS,
  POST_STATUS,
  DELETE_PRIORITY,
  GET_PRIORITIES,
  POST_PRIORITY,
  GET_TICKETS,
  POST_TICKET,
  DELETE_TICKET,
  PUT_TICKET,
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

let initialState = {
  allUsers: [],
  allCities: [],
  allAccounts: [],
  allAreas: [],
  allStatus: [],
  allPriorities: [],
  allCategories: [],
  allTickets: [],
  allCustomers: [],
  TicketById: [],
};

let updatedCities;
let updatedUsers;
let updatedAreas;
let updatedCategories;
let updatedPriorities;
let updatedStatus;
let updatedInformation;
let updatedAccounts;
let updatedTickets;
let newUser;

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
    case GET_CUSTOMERS:
      return {
        ...state,
        allCustomers: action.payload,
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
      newUser = action.payload;
      if (!state.allAccounts.some((user) => user.id === newUser.id)) {
        return {
          ...state,
          allAccounts: [...state.allAccounts, newUser],
        };
      }
      return state;
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
    case GET_TICKETS:
      return {
        ...state,
        allTickets: action.payload,
      };
    case GET_TICKET_BY_ID:
      return {
        ...state,
        TicketById: action.payload,
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
    case POST_TICKET:
      return {
        ...state,
        allTickets: [...state.allTickets, action.payload],
      };
    case POST_CUSTOMERS:
      return {
        ...state,
        allCustomers: [...state.allCustomers, action.payload],
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
    case PUT_TICKET:
      updatedInformation = state.allTickets.map((info) => {
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
        allTickets: updatedInformation,
      };
    case PUT_AREA:
      updatedAreas = state.allAreas.map((info) => {
        if (info.id === action.payload.id) {
          return {
            ...info,
            color: action.payload.color,
            name: action.payload.name,
          };
        }
        return info;
      });

      return {
        ...state,
        allAreas: updatedAreas,
      };
    case PUT_CATEGORY:
      updatedCategories = state.allCategories.map((info) => {
        if (info.id === action.payload.id) {
          return {
            ...info,
            color: action.payload.color,
            name: action.payload.name,
          };
        }
        return info;
      });

      return {
        ...state,
        allCategories: updatedCategories,
      };
    case PUT_STATUS:
      updatedStatus = state.allStatus.map((info) => {
        if (info.id === action.payload.id) {
          return {
            ...info,
            color: action.payload.color,
            name: action.payload.name,
          };
        }
        return info;
      });

      return {
        ...state,
        allStatus: updatedStatus,
      };
    case PUT_PRIORITY:
      updatedPriorities = state.allPriorities.map((info) => {
        if (info.id === action.payload.id) {
          return {
            ...info,
            color: action.payload.color,
            name: action.payload.name,
          };
        }
        return info;
      });

      return {
        ...state,
        allPriorities: updatedPriorities,
      };
    case PUT_ACCOUNT:
      updatedAccounts = state.allAccounts.map((info) => {
        if (info.id === action.payload.id) {
          return {
            ...info,
            level: action.payload.level,
          };
        }
        return info;
      });

      return {
        ...state,
        allAccounts: updatedAccounts,
      };
    case DELETE_ACCOUNT:
      updatedAccounts = state.allAccounts.filter(
        (account) => account.id !== action.payload
      );
      return {
        ...state,
        allAccounts: updatedAccounts,
      };
    case DELETE_TICKET:
      updatedTickets = state.allTickets.filter(
        (ticket) => ticket.id !== action.payload
      );
      return {
        ...state,
        allTickets: updatedTickets,
      };
    default:
      return state;
  }
}

export default rootReducer;
