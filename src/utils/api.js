// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // You can add headers, interceptors, etc.
});

export const fetchData = async () => {
  try {
    const response = await api.get('/exec');
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error;
  }
};
