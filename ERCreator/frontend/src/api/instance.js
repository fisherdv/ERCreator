import axios from "axios";
import { baseURL } from "../config";
import { getRefreshToken, setAccessToken } from "../localStorage";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});


const refreshToken = (refreshToken) => {
  return axios.post(`${baseURL}/api/token/refresh/`, {
    refresh: refreshToken
  })
}

instance.interceptors.response.use(request => request, async (error) => {
    const originalConfig = error.config;
    if (error.response) {    
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rq = await refreshToken(getRefreshToken());        
          setAccessToken(rq.data.access);
          setToken(rq.data.access);
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }      
    }
    return Promise.reject(error);
})

export const setToken = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const delToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export default instance;
