import { closeDriver, runQuery } from "./database/neo4j.js";

const constraints = [
  "CREATE CONSTRAINT developer_id IF NOT EXISTS FOR (d:Developer) REQUIRE d.id IS UNIQUE",
  "CREATE CONSTRAINT skill_id IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE",
  "CREATE CONSTRAINT project_id IF NOT EXISTS FOR (p:Project) REQUIRE p.id IS UNIQUE",
];
const nodes = [
  [
    "UNWIND $developers AS item MERGE (d:Developer {id:item.id}) SET d += item",
    "developers",
  ],
  [
    "UNWIND $skills AS item MERGE (s:Skill {id:item.id}) SET s += item",
    "skills",
  ],
  [
    "UNWIND $projects AS item MERGE (p:Project {id:item.id}) SET p += item",
    "projects",
  ],
];
const relationships = [
  [
    "UNWIND $items AS item MATCH (d:Developer {id:item.developerId}), (s:Skill {id:item.skillId}) MERGE (d)-[r:HAS_SKILL]->(s) SET r.proficiency=item.proficiency",
    "developerSkills",
  ],
  [
    "UNWIND $items AS item MATCH (p:Project {id:item.projectId}), (s:Skill {id:item.skillId}) MERGE (p)-[:USES_SKILL]->(s)",
    "projectSkills",
  ],
  [
    "UNWIND $items AS item MATCH (d:Developer {id:item.developerId}), (p:Project {id:item.projectId}) MERGE (d)-[:WORKED_ON]->(p)",
    "contributions",
  ],
];
const data = {
  developers: [
    {
      id: "priya",
      name: "Priya Sharma",
      role: "Full-stack Engineer",
      initials: "PS",
    },
    { id: "arjun", name: "Arjun Mehta", role: "Data Engineer", initials: "AM" },
    {
      id: "meera",
      name: "Meera Iyer",
      role: "Product Designer",
      initials: "MI",
    },
    { id: "ravi", name: "Ravi Nair", role: "Backend Engineer", initials: "RN" },
    {
      id: "sana",
      name: "Sana Khan",
      role: "Frontend Engineer",
      initials: "SK",
    },
    {
      id: "dev",
      name: "Dev Malhotra",
      role: "Platform Engineer",
      initials: "DM",
    },
    { id: "kavya", name: "Kavya Rao", role: "Data Analyst", initials: "KR" },
  ],
  skills: [
    {
      id: "react",
      name: "React",
      category: "Frontend",
      level: "Advanced",
      color: "#61dafb",
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Language",
      level: "Advanced",
      color: "#3178c6",
    },
    {
      id: "node-js",
      name: "Node.js",
      category: "Backend",
      level: "Advanced",
      color: "#78c257",
    },
    {
      id: "neo4j",
      name: "Neo4j",
      category: "Data",
      level: "Intermediate",
      color: "#008cc1",
    },
    {
      id: "cypher",
      name: "Cypher",
      category: "Data",
      level: "Intermediate",
      color: "#0aa1c0",
    },
    {
      id: "figma",
      name: "Figma",
      category: "Design",
      level: "Intermediate",
      color: "#f24e1e",
    },
    {
      id: "python",
      name: "Python",
      category: "Language",
      level: "Advanced",
      color: "#ffd343",
    },
    {
      id: "docker",
      name: "Docker",
      category: "Platform",
      level: "Intermediate",
      color: "#2496ed",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Data",
      level: "Intermediate",
      color: "#336791",
    },
    {
      id: "next-js",
      name: "Next.js",
      category: "Frontend",
      level: "Intermediate",
      color: "#111111",
    },
  ],
  projects: [
    {
      id: "atlas",
      name: "Atlas Analytics",
      description: "Self-service product analytics for growing teams.",
      status: "Active",
      category: "SaaS",
      updated: "2026-08-15",
      color: "#7c3aed",
    },
    {
      id: "graphlens",
      name: "GraphLens",
      description: "Knowledge graph exploration workspace for research teams.",
      status: "Active",
      category: "Data",
      updated: "2026-08-13",
      color: "#0891b2",
    },
    {
      id: "pulse",
      name: "Pulse Mobile",
      description: "A cross-platform habit and wellbeing companion.",
      status: "In discovery",
      category: "Consumer",
      updated: "2026-08-10",
      color: "#db2777",
    },
    {
      id: "shipyard",
      name: "Shipyard Platform",
      description:
        "Developer platform for deployment automation and observability.",
      status: "Active",
      category: "Platform",
      updated: "2026-08-16",
      color: "#ea580c",
    },
    {
      id: "insight",
      name: "Insight Studio",
      description: "Data storytelling workspace for customer-success teams.",
      status: "Planning",
      category: "Analytics",
      updated: "2026-08-09",
      color: "#16a34a",
    },
  ],
  developerSkills: [
    { developerId: "priya", skillId: "react", proficiency: "Advanced" },
    { developerId: "priya", skillId: "typescript", proficiency: "Advanced" },
    { developerId: "priya", skillId: "node-js", proficiency: "Intermediate" },
    { developerId: "arjun", skillId: "neo4j", proficiency: "Advanced" },
    { developerId: "arjun", skillId: "cypher", proficiency: "Advanced" },
    { developerId: "arjun", skillId: "node-js", proficiency: "Advanced" },
    { developerId: "arjun", skillId: "python", proficiency: "Advanced" },
    { developerId: "meera", skillId: "figma", proficiency: "Advanced" },
    { developerId: "meera", skillId: "react", proficiency: "Intermediate" },
    { developerId: "ravi", skillId: "node-js", proficiency: "Advanced" },
    { developerId: "ravi", skillId: "typescript", proficiency: "Advanced" },
    { developerId: "ravi", skillId: "postgresql", proficiency: "Intermediate" },
    { developerId: "sana", skillId: "react", proficiency: "Advanced" },
    { developerId: "sana", skillId: "next-js", proficiency: "Advanced" },
    { developerId: "sana", skillId: "typescript", proficiency: "Advanced" },
    { developerId: "dev", skillId: "docker", proficiency: "Advanced" },
    { developerId: "dev", skillId: "node-js", proficiency: "Intermediate" },
    { developerId: "kavya", skillId: "python", proficiency: "Advanced" },
    {
      developerId: "kavya",
      skillId: "postgresql",
      proficiency: "Intermediate",
    },
  ],
  projectSkills: [
    { projectId: "atlas", skillId: "react" },
    { projectId: "atlas", skillId: "typescript" },
    { projectId: "atlas", skillId: "node-js" },
    { projectId: "atlas", skillId: "postgresql" },
    { projectId: "graphlens", skillId: "react" },
    { projectId: "graphlens", skillId: "neo4j" },
    { projectId: "graphlens", skillId: "cypher" },
    { projectId: "pulse", skillId: "typescript" },
    { projectId: "pulse", skillId: "figma" },
    { projectId: "shipyard", skillId: "node-js" },
    { projectId: "shipyard", skillId: "docker" },
    { projectId: "shipyard", skillId: "typescript" },
    { projectId: "insight", skillId: "python" },
    { projectId: "insight", skillId: "postgresql" },
    { projectId: "insight", skillId: "figma" },
  ],
  contributions: [
    { developerId: "priya", projectId: "atlas" },
    { developerId: "priya", projectId: "graphlens" },
    { developerId: "arjun", projectId: "graphlens" },
    { developerId: "arjun", projectId: "atlas" },
    { developerId: "arjun", projectId: "insight" },
    { developerId: "meera", projectId: "pulse" },
    { developerId: "meera", projectId: "graphlens" },
    { developerId: "meera", projectId: "insight" },
    { developerId: "ravi", projectId: "atlas" },
    { developerId: "ravi", projectId: "shipyard" },
    { developerId: "sana", projectId: "pulse" },
    { developerId: "sana", projectId: "graphlens" },
    { developerId: "dev", projectId: "shipyard" },
    { developerId: "kavya", projectId: "insight" },
  ],
};
try {
  for (const cypher of constraints) await runQuery(cypher);
  for (const [cypher, key] of nodes)
    await runQuery(cypher, { [key]: data[key] });
  for (const [cypher, key] of relationships)
    await runQuery(cypher, { items: data[key] });
  console.log("Seed completed successfully.");
} finally {
  await closeDriver();
}
