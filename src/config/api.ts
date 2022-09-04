import axios from 'axios';
import config from './config';

// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(config.storage.token)}`

export default axios.create({
  baseURL: config.countyApiUrl
});