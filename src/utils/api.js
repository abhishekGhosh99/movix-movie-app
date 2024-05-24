import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_APP_TMDB_AUTH_TOKEN;

const headers = {
  Authorization: "Bearer " + apiKey,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(baseUrl + url, { headers, params });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
