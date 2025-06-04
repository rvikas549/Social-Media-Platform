// src/config/api.js
const BASE_URL = "http://localhost:5000"; // change to your production URL on deploy

export const API = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  getMe: `${BASE_URL}/user/me`,
  postMessage: `${BASE_URL}/message`,
  getPosts: `${BASE_URL}/post`,
  // Add more endpoints as needed
};
