import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'localhost:3001',
});

export default api;
