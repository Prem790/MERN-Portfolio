// Starting the node server
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const dbConfig = require("./config/dbConfig");
const portfolioRoute = require("./routes/portfolioRoute");

const app = express();

// Trust the proxy (Render / most PaaS) so rate limiting sees real client IPs
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// Body parser with a sane size limit
app.use(express.json({ limit: "1mb" }));

// CORS — allow the configured frontend origin(s) plus localhost in dev
const allowedOrigins = (
  process.env.CLIENT_URL || "https://mern-portfolio-client-yaps.onrender.com"
)
  .split(",")
  .map((o) => o.trim())
  .concat(["http://localhost:3000"]);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (no origin) and any whitelisted origin
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Stricter limit for the login endpoint to slow brute-force attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});
app.use("/api/portfolio/admin-login", loginLimiter);

app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
