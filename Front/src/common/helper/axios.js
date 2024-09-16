import axios from "axios";
import { getBaseUrl } from "../../helper/envHelper";

axios.defaults.baseURL = getBaseUrl();

export default axios;
