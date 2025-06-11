import api from './api';

// Expects a FormData with field 'image'
export const uploadImage = formData =>
  api.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
