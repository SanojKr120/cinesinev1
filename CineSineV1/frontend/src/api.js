import axios from 'axios';

// Normalize API URL - remove '/api' suffix if present (to match new backend) and trailing slashes
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api\/?$/, '').replace(/\/+$/, '');

// Create axios instance with timeout and retry configuration
const api = axios.create({
    baseURL: API_URL,
    timeout: 30000, // 30 seconds timeout for Vercel cold starts
    headers: {
        'Content-Type': 'application/json',
    }
});

// Retry interceptor for failed requests (handles cold starts)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Retry once on network errors or 5xx errors (cold start issues)
        if (
            !originalRequest._retry &&
            (error.code === 'ECONNABORTED' || 
             error.code === 'ERR_NETWORK' ||
             (error.response && error.response.status >= 500))
        ) {
            originalRequest._retry = true;
            console.log('Retrying request due to server error...');
            
            // Wait 1 second before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
            return api(originalRequest);
        }
        
        return Promise.reject(error);
    }
);


export const fetchStories = () => api.get('/stories');
export const fetchStoryById = (id) => api.get(`/stories/${id}`);
export const fetchFilms = () => api.get('/films');
export const fetchPreWeddings = () => api.get('/pre-weddings');
export const fetchPreWeddingById = (id) => api.get(`/pre-weddings/${id}`);
export const fetchPhotobooks = () => api.get('/photobooks');

// Helper to get image URL (if using remote or local)
export const getImageUrl = (path) => path; // Placeholder if transformation needed

export const sendContactForm = (data) => api.post('/contact', data);

// CRUD Operations
export const deleteStory = (id) => api.delete(`/stories/${id}`);
export const deleteFilm = (id) => api.delete(`/films/${id}`);
export const deletePreWedding = (id) => api.delete(`/pre-weddings/${id}`);
export const deletePhotobook = (id) => api.delete(`/photobooks/${id}`);

export const createStory = (data) => api.post('/stories', data);
export const updateStory = (id, data) => api.put(`/stories/${id}`, data);
export const createFilm = (data) => api.post('/films', data);
export const updateFilm = (id, data) => api.put(`/films/${id}`, data);
export const createPreWedding = (data) => api.post('/pre-weddings', data);
export const updatePreWedding = (id, data) => api.put(`/pre-weddings/${id}`, data);
export const createPhotobook = (data) => api.post('/photobooks', data);

export const fetchUserProfile = () => api.get('/user');
export const updateUserProfile = (data) => api.put('/user', data);

export const updatePhotobook = (id, data) => api.put(`/photobooks/${id}`, data);

export const fetchImages = () => api.get('/images');
export const createImage = (data) => api.post('/images', data);
export const deleteImage = (id) => api.delete(`/images/${id}`);

