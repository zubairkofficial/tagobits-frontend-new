import axios from 'axios';

export const API_BASE_URL = 'https://staging01.tagocash.com/api';

const tagocashaxiosinstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default tagocashaxiosinstance;
