import React from 'react'; // Import React library
import axios from 'axios'; // Import axios for making HTTP requests

// Define the base URL for the API
// It will use the production URL if available, otherwise fallback to localhost
const API_BASE_URL = 'https://breepartone.onrender.com/api/SSA' || 'http://localhost:3000/api/SSA';

// Function to submit the form data to the API
// It sends a POST request with the form data
export const submitForm = (formData: { fullName: string; dob: string; country: string }) => {
  return axios.post(API_BASE_URL, formData); // Make the POST request to the API
};
