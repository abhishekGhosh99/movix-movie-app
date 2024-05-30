import React, { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import {
  Header,
  Footer,
  Home,
  Details,
  Explore,
  PageNotFound,
  SearchResult,
} from "./index";

const App = () => {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      });
    };
    fetchApiConfig();

    const genresCall = async () => {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((endpoint) => {
        promises.push(fetchDataFromApi(`/genre/${endpoint}/list`));
      });

      const data = await Promise.all(promises);
      data.map(({ genres }) => {
        genres.map((item) => (allGenres[item.id] = item));
      });
      dispatch(getGenres(allGenres));
    };
    genresCall();
  }, []);

  return (
    <BrowserRouter basename="/movix-movie-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
