import axios from "axios";

const bearer_token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjY5MDI4MzQ4LCJleHAiOjE2NjkxMTQ3NDh9.A8m5bCDvbFtgfmBF2RQCp6MPfkyIGVsbc1jY6RwyiLP38OqH0NCjy1R0om4xvtvvj_9-eLCgLAsFnawgQGhMVg";
const conf = {
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 100000,
};

const request = axios.create(conf);

const onRequest = (config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers["Authorization"] = `Bearer ${bearer_token}`;
  return config;
};

request.interceptors.request.use(onRequest);

export default request;
