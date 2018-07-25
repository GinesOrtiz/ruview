// @flow

import axios from "axios";

const userToken = localStorage.getItem("token");

const client = axios.create({
  baseURL: "https://ru.misly.es/api",
  timeout: 30000
});

if (userToken) {
  client.defaults.headers.common.Authorization = userToken;
}

export default client;
