import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

export default axios.create({
    baseURL: BACKEND_BASE_URL
});