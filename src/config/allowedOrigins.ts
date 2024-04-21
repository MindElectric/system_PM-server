require('dotenv').config();

export const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5000"
]
