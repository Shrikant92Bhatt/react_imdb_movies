import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN_KEY = import.meta.env.VITE_TMDB_TOKEN || __VALUE__.VITE_TMDB_TOKEN;

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN_KEY}`
};

export const getMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${TOKEN_KEY}&language=en-US`);
    return response.data.results;
};
export const fetchDataFromAPI = async (url,params) => {
    try {
        const {data} = await axios.get(`${BASE_URL}` + url, {params, headers} );
        return data;
    } catch (error) {
        console.log(error.message);
    }
};