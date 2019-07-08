import { Reducer } from "redux";

const ADD_NOTE = "ADD_NOTE";
const REMOVE_NOTE = "REMOVE_NOTE";

const reducer: Reducer<Map<string, string[]>> = (state = new Map(), action) => {
  const notes = state.get(action.city) || [];

  switch (action.type) {
    case ADD_NOTE:
      return new Map(state).set(action.city, [...notes, action.note]);
    case REMOVE_NOTE:
      return new Map(state).set(action.city, [
        ...notes.slice(0, action.index),
        ...notes.slice(action.index + 1)
      ]);
  }

  return state;
};

export default reducer;

export function addNote(city: string, note: string) {
  return { type: ADD_NOTE, city, note };
}

export function removeNote(city: string, index: number) {
  return { type: REMOVE_NOTE, city, index };
}
