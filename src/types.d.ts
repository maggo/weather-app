import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { initialState } from "./store/configureStore";
import { Action } from "redux";

export type ThunkAction = ReduxThunkAction<
  void,
  typeof initialState,
  {},
  Action<string>
>;
