import axios from "axios";

// TODO - Make token dynamic because of expiration
const bearer_token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjY5MjIyNjg0LCJleHAiOjE2NjkzMDkwODR9.g3SG3M6BbeGuw6-dCs6jZteLvBfaKEpxGEOVkPyRYlZnHgX3hc5b1f9_gKjPZC22Y7eYganrLYGvVoTtaTaE1Q";
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
