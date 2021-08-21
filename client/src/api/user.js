import axios from "axios";
import { SERVER_URL } from "../config/server_url";

axios.defaults.withCredentials = true;

export async function postLoginAPI(data) {
  const response = await axios.post(`${SERVER_URL}/users/login`, data);

  return response.data;
}

export async function postSignupAPI(data) {
  const response = await axios.post(`${SERVER_URL}/users/register`, data);

  return response.data;
}

export async function getLogoutAPI() {
  const response = await axios.get(`${SERVER_URL}/users/logout`);

  return response.data;
}

export async function getAuthenticationAPI() {
  const response = await axios.get(`${SERVER_URL}/users/auth`);

  return response.data;
}
