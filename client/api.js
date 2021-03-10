import axios from "axios";
import { API_KEY } from "./src/config";

axios.create({
    baseURL: "/api/data",
    withCredentials: true,
});

// export const bookApi = {
//     bestSeller: () => api.get("bestSeller.api"),
//     recommend: () => api.get("recommend.api"),
//     newBook: () => api.get("newBook.api"),
// };
