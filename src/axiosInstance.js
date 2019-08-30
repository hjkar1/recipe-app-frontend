import axios from 'axios';

// The development environment uses locally running API and production environment uses an external API.

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API
    : process.env.REACT_APP_DEV_API;

const instance = axios.create({
  baseURL: `${apiUrl}`
});

export default instance;
