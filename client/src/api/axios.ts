import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach the JWT saved at login to every request.
api.interceptors.request.use((config) => {
    const stored = localStorage.getItem('user');
    if (stored) {
        try {
            const { token } = JSON.parse(stored);
            if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch {
            localStorage.removeItem('user');
        }
    }
    return config;
});

// An expired or invalid token means the session is over: clear it and go to login.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?.url?.startsWith('/auth/')) {
            localStorage.removeItem('user');
            window.location.assign('/login');
        }
        return Promise.reject(error);
    },
);

export default api;
