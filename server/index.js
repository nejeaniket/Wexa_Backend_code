import express from "express";
import cors from "cors";

import { clientOrigin, port } from "./config/env.js";
import {
  closeDriver,
  verifyConnection,
} from "./database/neo4j.js";

import apiRoutes from "./routes/index.js";
import {
  notFound,
  errorHandler,
} from "./middleware/error.js";

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://wexagraph.netlify.app",
  clientOrigin,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from Postman, curl, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked: ${origin}`)
      );
    },
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* =========================
   Middleware
========================= */

app.use(express.json());

/* =========================
   Health Check
========================= */

app.get("/health", async (_req, res) => {
  try {
    await verifyConnection();

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "unavailable",
      database: "disconnected",
      error: error.message,
    });
  }
});

/* =========================
   API Routes
========================= */

app.use("/api", apiRoutes);

/* =========================
   Error Handling
========================= */

app.use(notFound);
app.use(errorHandler);

/* =========================
   Server
========================= */

const server = app.listen(
  port,
  "0.0.0.0",
  () => {
    console.log(
      `API listening on port ${port}`
    );
  }
);

/* =========================
   Graceful Shutdown
========================= */

async function shutdown() {
  server.close();

  await closeDriver();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);