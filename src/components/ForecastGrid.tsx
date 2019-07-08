import React, { FunctionComponent } from "react";
import { WeatherData } from "../store/weather";
import styles from "./ForecastGrid.module.css";

interface Props {
  forecast?: WeatherData["forecast"];
}

export const ForecastGrid: FunctionComponent<Props> = ({ forecast }) => {
  return (
    <div className={styles.container}>
      {!!forecast && forecast.length ? (
        forecast.map(item => (
          <div key={item.date.getTime()} className={styles.item}>
            <div className={styles.date}>
              {Intl.DateTimeFormat([], {
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "numeric"
              }).format(item.date)}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.weather}
              title={item.weather}
              width={50}
              height={50}
              className={styles.icon}
            />
            <div>{`${Math.round(item.temperature)} C`}</div>
          </div>
        ))
      ) : (
        <>
          <div className={styles.item}>&nbsp;</div>
          <div className={styles.item}>&nbsp;</div>
          <div className={styles.item}>&nbsp;</div>
          <div className={styles.item}>&nbsp;</div>
        </>
      )}
    </div>
  );
};
