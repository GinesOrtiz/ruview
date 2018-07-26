import axios from "axios";

const client = axios.create({
  baseURL: "https://ru.misly.es/api",
  timeout: 30000
});

const outtvClient = axios.create({
  baseURL: "https://ca.misly.es/",
  timeout: 30000
});

export default client;
export { outtvClient };
