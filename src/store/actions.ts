import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { addCity } from "./cities";
import { initialState } from "./configureStore";
import { requestTemperature } from "./weather";

export function addCityWithTemperature(
  city: string
): ThunkAction<void, typeof initialState, {}, Action<string>> {
  return function(dispatch) {
    dispatch(addCity(city));
    dispatch(requestTemperature(city));
  };
}
