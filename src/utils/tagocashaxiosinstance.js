import axios from 'axios';

// Automatically switch between localhost and staging based on environment
export const API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8000/api'
  : 'https://tago.cash/api';

const tagocashaxiosinstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default tagocashaxiosinstance;
