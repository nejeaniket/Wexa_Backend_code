# Developer Skill & Project Explorer — Backend

A Node.js and Express REST API that provides developer, skill, project, and graph relationship data from CognoDB / Neo4j.

## Overview

The backend acts as the API layer between the React frontend and the graph database.

It provides APIs for:

- Skills
- Projects
- Developers
- Search
- Related developers
- Skill recommendations
- Graph relationships

## Tech Stack

- Node.js
- Express.js
- Neo4j Driver
- CognoDB
- Cypher
- REST API
- CORS
- dotenv

## Architecture

The backend follows an MVC-oriented architecture with separate layers for API handling, business logic, database access, and Cypher queries.

```text
server/
├── config/
│   └── config.js
│
├── controllers/
│   └── graph.controller.js
│
├── services/
│   └── graph.service.js
│
├── repositories/
│   └── graph.repository.js
│
├── database/
│   └── neo4j.js
│
├── queries/
│   └── graph.queries.js
│
├── routes/
│   └── index.js
│
├── middleware/
│   └── error.js
│
├── data/
│   └── mockData.js
│
├── index.js
└── seed.js