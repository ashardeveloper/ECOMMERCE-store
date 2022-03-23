import axios from "axios";

const BASE_URL = "https://eshop-68b6c-default-rtdb.firebaseio.com/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
