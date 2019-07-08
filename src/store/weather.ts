import { Reducer } from "redux";
import { ThunkAction } from "../types.d";

const UPDATE_CURRENT_TEMPERATURE = "UPDATE_CURRENT_TEMPERATURE";
const UPDATE_FORECAST = "UPDATE_FORECAST";

export interface WeatherData {
  currentTemperature?: number;
  forecast?: [
    {
      date: Date;
      temperature: number;
      weather: string;
      icon: string;
    }
  ];
}

const reducer: Reducer<Map<string, WeatherData>> = (
  state = new Map<string, WeatherData>(),
  action
) => {
  const data: WeatherData = state.get(action.city) || {};

  switch (action.type) {
    case UPDATE_CURRENT_TEMPERATURE:
      return state.set(action.city, {
        ...data,
        currentTemperature: action.temperature
      });

    case UPDATE_FORECAST:
      return state.set(action.city, {
        ...data,
        forecast: action.forecast
      });
  }

  return state;
};

export default reducer;

export function updateTemperature(city: string, temperature: number) {
  return { type: UPDATE_CURRENT_TEMPERATURE, city, temperature };
}

export function updateForecast(city: string, forecast: []) {
  return { type: UPDATE_FORECAST, city, forecast };
}

export function requestTemperature(city: string): ThunkAction {
  return async function(dispatch) {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8017dd6ae1a83ac82c18d2b716939e48`
    );
    const data = await result.json();

    const temperature = data.main.temp;
    dispatch(updateTemperature(city, temperature));
  };
}

export function requestForecast(city: string): ThunkAction {
  return async function(dispatch) {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=8017dd6ae1a83ac82c18d2b716939e48`
    );
    const data = await result.json();

    const forecast = data.list.map((report: { [k: string]: any }) => ({
      date: new Date(report.dt * 1000),
      temperature: report.main.temp,
      weather: report.weather[0].description,
      icon: report.weather[0].icon
    }));

    dispatch(updateForecast(city, forecast));
  };
}
