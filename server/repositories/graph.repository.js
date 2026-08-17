import { runQuery } from "../database/neo4j.js";
import { queries } from "../queries/graph.queries.js";
import { records, toPlainObject } from "../utils/neo4j.js";

export async function findSkills() {
  return records(await runQuery(queries.skills), "skill");
}
export async function findSkillById(id) {
  const result = await runQuery(queries.skillById, { id });
  const item = result.records[0]?.get("skill");
  return item ? toPlainObject(item) : null;
}
export async function findProjects() {
  return records(await runQuery(queries.projects), "project");
}
export async function findProjectById(id) {
  const result = await runQuery(queries.projectById, { id });
  const item = result.records[0]?.get("project");
  return item ? toPlainObject(item) : null;
}
export async function findDevelopers() {
  return records(await runQuery(queries.developers), "developer");
}
export async function findDeveloperById(id) {
  const result = await runQuery(queries.developerById, { id });
  const item = result.records[0]?.get("developer");
  return item ? toPlainObject(item) : null;
}
export async function search(term, limit) {
  const result = await runQuery(queries.search, { term, limit });
  return result.records.map((record) => ({
    type: record.get("type"),
    ...toPlainObject(record.get("result")),
  }));
}
export async function findRelatedDevelopers(id) {
  const result = await runQuery(queries.relatedDevelopers, { id });
  return result.records.map((record) => ({
    ...toPlainObject(record.get("developer")),
    sharedSkills: toPlainObject(record.get("sharedSkills")),
    sharedSkillCount: Number(record.get("sharedSkillCount")),
  }));
}
export async function findRecommendedSkills(id, limit) {
  const result = await runQuery(queries.recommendedSkills, { id, limit });
  return result.records.map((record) => ({
    ...toPlainObject(record.get("skill")),
    projectUsage: Number(record.get("projectUsage")),
  }));
}
