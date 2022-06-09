import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY || 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
});
