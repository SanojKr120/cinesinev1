import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchStories = () => axios.get(`${API_URL}/stories`);
export const fetchStoryById = (id) => axios.get(`${API_URL}/stories/${id}`);
export const fetchFilms = () => axios.get(`${API_URL}/films`);
export const fetchPreWeddings = () => axios.get(`${API_URL}/pre-weddings`);
export const fetchPreWeddingById = (id) => axios.get(`${API_URL}/pre-weddings/${id}`);
export const fetchPhotobooks = () => axios.get(`${API_URL}/photobooks`);

// Helper to get image URL (if using remote or local)
export const getImageUrl = (path) => path; // Placeholder if transformation needed

export const sendContactForm = (data) => axios.post(`${API_URL}/contact`, data);

// CRUD Operations
export const deleteStory = (id) => axios.delete(`${API_URL}/stories/${id}`);
export const deleteFilm = (id) => axios.delete(`${API_URL}/films/${id}`);
export const deletePreWedding = (id) => axios.delete(`${API_URL}/pre-weddings/${id}`);
export const deletePhotobook = (id) => axios.delete(`${API_URL}/photobooks/${id}`);

export const createStory = (data) => axios.post(`${API_URL}/stories`, data);
export const updateStory = (id, data) => axios.put(`${API_URL}/stories/${id}`, data);
export const createFilm = (data) => axios.post(`${API_URL}/films`, data);
export const updateFilm = (id, data) => axios.put(`${API_URL}/films/${id}`, data);
export const createPreWedding = (data) => axios.post(`${API_URL}/pre-weddings`, data);
export const updatePreWedding = (id, data) => axios.put(`${API_URL}/pre-weddings/${id}`, data);
export const createPhotobook = (data) => axios.post(`${API_URL}/photobooks`, data);

export const fetchUserProfile = () => axios.get(`${API_URL}/user`);
export const updateUserProfile = (data) => axios.put(`${API_URL}/user`, data);

export const updatePhotobook = (id, data) => axios.put(`${API_URL}/photobooks/${id}`, data);

export const fetchImages = () => axios.get(`${API_URL}/images`);
export const createImage = (data) => axios.post(`${API_URL}/images`, data);
export const deleteImage = (id) => axios.delete(`${API_URL}/images/${id}`);
