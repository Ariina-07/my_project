import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const apiService = {
 
  getItems() {
    return apiClient.get('/items');
  },
 
  createItem(newItem) {
    return apiClient.post('/items', newItem);
  },

  updateItem(id, updatedItem) {
    return apiClient.put(`/items/${id}`, updatedItem);
  },

  deleteItem(id) {
    return apiClient.delete(`/items/${id}`);
  },
};