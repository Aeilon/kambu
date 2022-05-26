import axios from "axios";

const createConfig = () => {
  const api = axios.create({
    baseURL: "https://api.currencyapi.com/v3/",
  });

  return api;
};

const api = createConfig();

export default api;
