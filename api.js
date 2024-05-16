import axios from 'axios';

const api = axios.create({
  baseURL: 'mongodb+srv://vancarlolabanan:94n5AiiqGUtePNso@cluster0.b5ukob8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Replace this with your backend server URL
  timeout: 5000,
});

export default api;
