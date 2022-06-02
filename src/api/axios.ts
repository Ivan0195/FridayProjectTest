import axios from 'axios';

export const api = axios.create({
  baseURL:'https://neko-back.herokuapp.com/2.0/',                         //process.env.REACT_APP_API_KEY,
  withCredentials: true,
});
