import axios from "axios";

const createConfig = () => {
  const api = axios.create({
    baseURL: "https://free.currconv.com/api/v7/",
  });

  return api;
};

const api = createConfig();

export default api;
