import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4040/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
