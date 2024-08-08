import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:3000/api/SSA' || 'https://breepartone.onrender.com/api/SSA';

export const submitForm = (formData: { fullName: string; dob: string; country: string }) => {
  return axios.post(API_BASE_URL, formData); // Make the POST request to the API
};
