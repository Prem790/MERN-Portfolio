import axios from "axios";

// Base URL for the portfolio API.
// - Local dev: set VITE_API_URL in client/.env (e.g. http://localhost:5001/api/portfolio)
// - Production: falls back to the deployed Render backend.
export const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://mern-portfolio-server-2ft6.onrender.com/api/portfolio";

export default axios;
