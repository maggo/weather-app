import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content } from "../components/Content";
import { Header } from "../components/Header";
import { requestTemperature } from "../store/weather";
import { AddCity } from "./AddCity";
import { CityList } from "./CityList";

export const Overview = () => {
  const cities = useSelector<{ cities: Set<string> }, Set<string>>(
    state => state.cities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    cities.forEach(city => dispatch(requestTemperature(city)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Weather" action={<AddCity />} />
      <Content>
        <CityList />
      </Content>
    </>
  );
};
