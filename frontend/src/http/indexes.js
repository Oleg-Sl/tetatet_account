import axios from 'axios';

export const BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});


// Перхватывает исходящий запрос
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

// Перхватывает ответ
api.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get('/auth/jwt/refresh/');
                localStorage.setItem('token', response.data.access);
                return api.request(originalRequest);
            } catch (e) {
                console.log('Не удалось обновить токен доступа.');
            }
            localStorage.removeItem('token');
        }
        throw error;
    }
);

export default api;
