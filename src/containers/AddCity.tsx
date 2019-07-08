import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCityWithTemperature } from "../store/actions";
import { initialState } from "../store/configureStore";

const CITIES = [
  "Abu Dhabi",
  "Barcelona",
  "Beijing",
  "Berlin",
  "Bern",
  "Brussels",
  "Havana",
  "London",
  "Hong Kong",
  "Tokyo"
];

export const AddCity = () => {
  const availableCities = useSelector<typeof initialState, string[]>(state =>
    CITIES.filter(city => !state.cities.has(city))
  );

  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active && inputRef.current) inputRef.current.focus();
  }, [active, inputRef]);

  return (
    <>
      <form
        style={{ display: "flex" }}
        onSubmit={e => {
          e.preventDefault();
          if (!active) {
            setActive(true);
          } else {
            const value = e.currentTarget.city.value;
            if (availableCities.includes(value)) {
              dispatch(addCityWithTemperature(e.currentTarget.city.value));
              e.currentTarget.city.value = "";
              setActive(false);
              setError(false);
            } else {
              setError(true);
            }
          }
        }}
      >
        <input
          ref={inputRef}
          name="city"
          type="text"
          list="city-list"
          hidden={!active}
          style={{ borderColor: error ? "red" : "initial" }}
        />
        &nbsp;
        <button className="icon" type="submit">
          <span role="img" aria-label="Add">
            ➕
          </span>
        </button>
        <datalist id="city-list">
          {availableCities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </datalist>
      </form>
    </>
  );
};
