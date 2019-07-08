import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { CityDetail } from "./containers/CityDetail";
import { Overview } from "./containers/Overview";
import { configureStore } from "./store/configureStore";

const store = configureStore();

function getCityFromUrl() {
  return decodeURI(window.location.hash.substr(1));
}

const App: React.FC = () => {
  const [currentCity, setCurrentCity] = useState(getCityFromUrl());
  useEffect(() => {
    const onHashChange = (e: HashChangeEvent) => {
      setCurrentCity(getCityFromUrl());
    };

    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <Provider store={store}>
      {currentCity ? <CityDetail city={currentCity} /> : <Overview />}
    </Provider>
  );
};

export default App;
