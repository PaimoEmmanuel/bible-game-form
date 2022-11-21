import axios from "axios";

const requestBibleText = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_BIBLE_TEXT,
});

export default requestBibleText;
