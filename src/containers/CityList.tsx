import React from "react";
import { useSelector } from "react-redux";
import { CityTeaser } from "./CityTeaser";

export const CityList = () => {
  const cities = useSelector<{ cities: Set<string> }, Set<string>>(
    state => state.cities
  );

  return (
    <div>
      {Array.from(cities).map(city => (
        <div key={city}>
          <CityTeaser city={city} />
        </div>
      ))}
    </div>
  );
};
