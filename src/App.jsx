import React, { useState, useEffect } from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { fetchDataFromAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfigurations, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const getConfiguration = async () => {
    const data = await fetchDataFromAPI("/configuration");
    const urls = {
      backDrop: data.images.secure_base_url + "original",
      poster: data.images.secure_base_url + "original",
      profile: data.images.secure_base_url + "original",
    };
    dispatch(getApiConfigurations(urls));
  };

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    endpoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((genres) => (allGenres[genres.id] = genres));
    });
    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    getConfiguration();
    genresCall();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:mediaType/:id" element={<Details />} />
          <Route exact path="/search/:query" element={<SearchResult />} />
          <Route exact path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
