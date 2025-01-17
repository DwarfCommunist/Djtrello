// djsr/frontend/src/axiosApi.js

import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        console.log(originalRequest.url);
        if (error.response.status === 401 && originalRequest.url === 'auth/token/refresh') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized") {
            const refreshToken = localStorage.getItem('refresh_token');

            console.log(refreshToken);
            if (refreshToken) {
                return axiosInstance
                    .post('auth/token/refresh', {refresh: refreshToken})
                    .then((response) => {

                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);

                        axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance