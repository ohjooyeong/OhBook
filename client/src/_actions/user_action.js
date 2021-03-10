import axios from "axios";
import { USER_API_URL } from "../config";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
    const request = axios
        .post(`${USER_API_URL}/login`, dataToSubmit, { withCredentials: true })
        .then((response) => response.data);

    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const request = axios
        .post(`${USER_API_URL}/register`, dataToSubmit)
        .then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios
        .get(`${USER_API_URL}/auth`, { withCredentials: true })
        .then((response) => response.data);
    return {
        type: AUTH_USER,
        payload: request,
    };
}
