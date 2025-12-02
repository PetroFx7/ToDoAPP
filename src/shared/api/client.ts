import axios from "axios";

// TODO: Export constants for token management
// Hint: You'll need TOKEN_TYPE, ACCESS_TOKEN, AUTH_HEADER
export const TOKEN_TYPE = "Bearer";
export const ACCESS_TOKEN = "accessToken";
export const AUTH_HEADER = "Authorization";

// TODO: Setup base URL from environment variable
const baseUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}` : "/api";

// TODO: Create axios instance with base configuration
const request = axios.create({
  baseURL: baseUrl,

});

// TODO: Add request interceptor to automatically include auth token
request.interceptors.request.use(
  (config) => {
    // TODO: Get access token from localStorage
    const token = localStorage.getItem(ACCESS_TOKEN);
    // TODO: Add token to headers if it exists
    if (token) {
      config.headers[AUTH_HEADER] = `${TOKEN_TYPE} ${token}`;
    }
    return config;
  },
  (error) => {
    // TODO: Handle request errors
    return Promise.reject(error);

  },
);

// TODO: Add response interceptor for error handling
request.interceptors.response.use(
  (response) => {
    // TODO: Handle successful responses
    return response;
  },
  (error) => {
    // TODO: Handle different types of errors
    const { response } = error;

    if (!response) {
      return Promise.reject("Network error");
    }

    // TODO: Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
      console.warn("Unauthorized access - perhaps redirect to login?");
      window.location.href = "/#/auth" ;
    }

    // TODO: Handle other common errors (403, 404, 500, etc.)
    if (error.response && error.response.status === 403) {
      console.warn("Forbidden access - you don't have permission to access this resource.");
    }
    if (error.response && error.response.status === 404) {
      console.warn("Resource not found - the requested resource does not exist.");
    }
    if (error.response && error.response.status === 500) {
      console.warn("Server error - please try again later.");
    }
    return Promise.reject(error);
  },
);

export default request;
