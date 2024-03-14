import cors from "cors";

export const corsOptions = cors({
  credentials: true,
  origin: ["http://localhost:5173", "https://"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
});
