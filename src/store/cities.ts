import { Reducer } from "redux";

const ADD_CITY = "ADD_CITY";
const REMOVE_CITY = "REMOVE_CITY";

const reducer: Reducer<Set<string>> = (state = new Set(), action) => {
  switch (action.type) {
    case ADD_CITY:
      return new Set(state).add(action.city);
    case REMOVE_CITY:
      let newState = new Set(state);
      newState.delete(action.city);
      return newState;
  }

  return state;
};

export default reducer;

export function addCity(city: string) {
  return { type: ADD_CITY, city };
}

export function removeCity(city: string) {
  return { type: REMOVE_CITY, city };
}
