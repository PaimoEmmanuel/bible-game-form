import axios from "axios";

const getToken = () =>
  JSON.parse(localStorage.getItem("egfmbg-tk") || "{}").token || "";
const conf = {
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 100000,
};

const request = axios.create(conf);

const onRequest = (config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers["Authorization"] = `Bearer ${getToken()}`;
  return config;
};

request.interceptors.request.use(onRequest);

export default request;
