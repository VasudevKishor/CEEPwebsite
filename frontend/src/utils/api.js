import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://ceepweb-backend.vercel.app/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

// Export specific API functions
export const teamAPI = {
    getAll: () => api.get('/team'),
    getOne: (id) => api.get(`/team/${id}`),
    create: (data) => api.post('/team', data),
    update: (id, data) => api.put(`/team/${id}`, data),
    delete: (id) => api.delete(`/team/${id}`),
};

export const servicesAPI = {
    getAll: () => api.get('/services'),
    getTraining: () => api.get('/services/training'),
    getVideos: () => api.get('/services/videos'),
};

export const clientsAPI = {
    getAll: () => api.get('/clients'),
    getOne: (id) => api.get(`/clients/${id}`),
};

export const caseStudiesAPI = {
    getAll: () => api.get('/case-studies'),
    getOne: (id) => api.get(`/case-studies/${id}`),
};

export const contactAPI = {
    submit: (data) => api.post('/contact', data),
};


