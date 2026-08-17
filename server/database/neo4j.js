import neo4j from 'neo4j-driver';
import { databaseConfig } from '../config/env.js';

let driver;

export function getDriver() {
  if (!driver) {
    const config = databaseConfig();
    driver = neo4j.driver(config.uri, neo4j.auth.basic(config.username, config.password));
  }
  return driver;
}

export async function runQuery(cypher, params = {}) {
  const { database } = databaseConfig();
  const session = getDriver().session({ database });
  try {
    return await session.run(cypher, params);
  } finally {
    await session.close();
  }
}

export async function verifyConnection() {
  await getDriver().verifyConnectivity();
}

export async function closeDriver() {
  if (driver) await driver.close();
}
