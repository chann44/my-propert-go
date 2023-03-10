import axios from "axios";
import { useCookies } from "react-cookie";

export const useAxios = () => {
  const [cookies, setCookes] = useCookies(["jwtToken"]);
  const instance = axios.create({
    baseURL: "https://mypropertygo-production.up.railway.app/api",
    // baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${cookies.jwtToken}`,
    },
  });
  return instance;
};
