import express from "express";
import cors from "cors";
import { clientOrigin, port } from "./config/env.js";
import { closeDriver, verifyConnection } from "./database/neo4j.js";
import apiRoutes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(
  cors({
    origin: [clientOrigin, "http://wexagraph.netlify.app"],
  }),
);
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await verifyConnection();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(503).json({
      status: "unavailable",
      database: "disconnected",
      error: error.message,
    });
  }
});

app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`API listening at http://localhost:${port}`),
);

async function shutdown() {
  server.close();
  await closeDriver();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
