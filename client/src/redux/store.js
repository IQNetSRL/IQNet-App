import { applyMiddleware, compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import rootReducer from "./reducer.js";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  someReducer: rootReducer,
});

const Store = configureStore(
  {
    reducer: combinedReducers,
  },
  composeEnhancer(applyMiddleware(ThunkMiddleware))
);

export default Store;
