import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import cities from "./cities";
import notes from "./notes";
import weather from "./weather";

const reducers = combineReducers({
  cities,
  weather,
  notes
});

export const initialState = {
  cities: new Set(["Berlin", "London", "Havana", "Hong Kong", "Tokyo"]),
  weather: new Map(),
  notes: new Map()
};

export const configureStore = (state: Object = initialState) => {
  return createStore(reducers, state, applyMiddleware(thunk));
};
