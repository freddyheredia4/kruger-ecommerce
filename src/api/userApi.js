import axios from 'axios';

//connectar al customer-microservice
export const userApi = axios.create({
    baseURL: `http://localhost:8082/api/users/`,
}) 