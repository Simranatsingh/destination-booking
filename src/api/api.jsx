import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getDestinations = () => axios.get(`${BASE_URL}/destinations`);
export const addDestination = (data) =>
  axios.post(`${BASE_URL}/destinations`, data);
export const getHotels = (destinationId) =>
  axios.get(`${BASE_URL}/hotels`, { params: { destinationId } });
export const addHotel = (data) => axios.post(`${BASE_URL}/hotels`, data);
