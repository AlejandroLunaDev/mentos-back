import axios from "axios";
import { getBaseUrl } from "../../helper/envHelper";
const BASE_URL = getBaseUrl();
console.log(BASE_URL);
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = BASE_URL;

export default axios;
