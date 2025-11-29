import axios from 'axios';

// A URL base da API Spring Boot.
const api = axios.create({
  baseURL: 'http://YOUR_IP_ADDRESS:8080/bag', 
  timeout: 10000, // Tempo limite de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;