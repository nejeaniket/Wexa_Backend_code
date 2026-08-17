import 'dotenv/config';

const required = ['NEO4J_URI', 'NEO4J_USERNAME', 'NEO4J_PASSWORD'];

export function databaseConfig() {
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Database configuration is missing: ${missing.join(', ')}. Copy .env.example to .env and fill in the CognoDB values.`);
  }
  return {
    uri: process.env.NEO4J_URI,
    username: process.env.NEO4J_USERNAME,
    password: process.env.NEO4J_PASSWORD,
    database: process.env.NEO4J_DATABASE || 'neo4j'
  };
}

export const port = Number(process.env.PORT || 3001);
export const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
