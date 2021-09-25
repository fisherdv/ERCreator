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
  return instance.post('/api/token/refresh/', {
    refresh: refreshToken
  })
}

instance.interceptors.response.use(request => request, async (error) => {
  // && error.config.url !== "/api/token/refresh/"
  if (!error.config._retry){
    try {
      if (error.response.status === 401 && error.response.data.code === 'token_not_valid'){
        error.config._retry = true;    
        const rq = await refreshToken(getRefreshToken());        
        setAccessToken(rq.data.access);
        setToken(rq.data.access);
        return instance(error.config);
      }            
    } catch(_error) {
      return Promise.reject(_error);
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
