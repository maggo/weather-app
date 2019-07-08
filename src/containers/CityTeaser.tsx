import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../store/configureStore";
import { WeatherData } from "../store/weather";
import styles from "./CityTeaser.module.css";
import { removeCity } from "../store/cities";

interface Props {
  city: string;
}

export const CityTeaser: FunctionComponent<Props> = ({ city }) => {
  const weather = useSelector<typeof initialState, WeatherData>(state =>
    state.weather.get(city)
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <a href={`#${city}`} className={styles.title}>
        {city}
      </a>
      <div>
        {weather ? `${Math.round(weather.currentTemperature || 0)} C` : "…"}
      </div>
      <button className="icon" onClick={() => dispatch(removeCity(city))}>
        <span role="img" aria-label="Delete">
          🗑
        </span>
      </button>
    </div>
  );
};
