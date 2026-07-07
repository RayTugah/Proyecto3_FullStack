import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/games`;

export const getAllGames = async () => {
  return axios.get(BASE_URL);
};

export const getGameById = async (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};