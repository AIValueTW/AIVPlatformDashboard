import axios from "axios";
import { dateISOString } from "../components/dateISOString";

// const ip = "http://210.64.10.243:8080"
const ip = "http://210.64.10.243/dashboard-api";
const loginIp = "http://210.64.10.243:8080";

export const LOGIN_ip = loginIp + "/login";

export const login = () => {
  let data = axios.post(LOGIN_ip,);
  return data;
};

export const infoData = () => {
  let data = axios.get(loginIp + "/account/info");
  return data;
};

export const getDashboard1ChartData = (author, ma_id) => {
  let data = axios.get(ip + "/by_event/?author=" + author + "&ma_id=" + ma_id);
  return data;
};

export const getDashboard2ChartData = (author) => {
  let data = axios.get(ip + "/by_user/?author=" + author);
  return data;
};

export const getExcelOptions = (author, ma_id) => {
  let data = axios.get(
    ip + "/by_event_filter_to_export/?author=" + author + "&ma_id=" + ma_id
  );
  return data;
};

export const getExcelName = (author, ma_id, request) => {
  let data = axios.post(
    ip+"/by_event_export/?author=" + author + "&ma_id=" + ma_id,
    request
  );
  return data;
};
