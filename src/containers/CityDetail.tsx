import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content } from "../components/Content";
import { ForecastGrid } from "../components/ForecastGrid";
import { Header } from "../components/Header";
import { Notes } from "../components/Notes";
import { initialState } from "../store/configureStore";
import { addNote, removeNote } from "../store/notes";
import { requestForecast, WeatherData } from "../store/weather";

interface Props {
  city: string;
}

export const CityDetail: FunctionComponent<Props> = ({ city }) => {
  const forecast = useSelector<typeof initialState, WeatherData["forecast"]>(
    state => {
      const data = state.weather.get(city);
      return data ? data.forecast : undefined;
    }
  );
  const notes = useSelector<typeof initialState, string[]>(state =>
    state.notes.get(city)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestForecast(city));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title={city} showBack />
      <Content>
        <ForecastGrid forecast={forecast} />
        <Notes
          notes={notes}
          onAdd={note => dispatch(addNote(city, note))}
          onDelete={index => dispatch(removeNote(city, index))}
        />
      </Content>
    </>
  );
};
