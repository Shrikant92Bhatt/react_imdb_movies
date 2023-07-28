import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfigurations, getGenres } from "./store/homeSlice";
function App() {
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const apiTestting = async () => {
    const data = await fetchDataFromAPI("/movie/popular");
    console.log(data);
    dispatch(getApiConfigurations(data));
  };

  useEffect(() => {
    apiTestting();
  }, []);

  return (
    <React.Fragment>
      <div>{home.url.total_pages}</div>
    </React.Fragment>
  );
}

export default App;
