// All application values are supplied through parameters, never interpolated into Cypher.
export const queries = {
  skills: `
    MATCH (s:Skill)
    OPTIONAL MATCH (d:Developer)-[:HAS_SKILL]->(s)
    OPTIONAL MATCH (p:Project)-[:USES_SKILL]->(s)
    RETURN { id: s.id, name: s.name, category: s.category, level: s.level, color: s.color,
      developers: count(DISTINCT d), projects: count(DISTINCT p) } AS skill
    ORDER BY skill.name`,

  skillById: `
    MATCH (s:Skill {id: $id})
    OPTIONAL MATCH (d:Developer)-[hs:HAS_SKILL]->(s)
    WITH s, collect(DISTINCT d { .id, .name, .role, .initials, proficiency: hs.proficiency }) AS developers
    OPTIONAL MATCH (p:Project)-[:USES_SKILL]->(s)
    RETURN { id: s.id, name: s.name, category: s.category, level: s.level, color: s.color,
      developers: developers,
      projects: collect(DISTINCT p { .id, .name, .status, .category }) } AS skill`,

  projects: `
    MATCH (p:Project)
    OPTIONAL MATCH (p)-[:USES_SKILL]->(s:Skill)
    OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
    RETURN { id: p.id, name: p.name, description: p.description, status: p.status, category: p.category, updated: p.updated, color: p.color,
      skills: collect(DISTINCT s.name), contributors: count(DISTINCT d) } AS project
    ORDER BY project.updated DESC`,

  projectById: `
    MATCH (p:Project {id: $id})
    OPTIONAL MATCH (p)-[:USES_SKILL]->(s:Skill)
    WITH p, collect(DISTINCT s { .id, .name, .category, .color }) AS skills
    OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
    RETURN { id: p.id, name: p.name, description: p.description, status: p.status, category: p.category, updated: p.updated, color: p.color,
      skills: skills, contributors: collect(DISTINCT d { .id, .name, .role, .initials }) } AS project`,

  developers: `
    MATCH (d:Developer)
    OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
    RETURN { id: d.id, name: d.name, role: d.role, initials: d.initials, skills: collect(DISTINCT s.name) } AS developer
    ORDER BY developer.name`,

  developerById: `
    MATCH (d:Developer {id: $id})
    OPTIONAL MATCH (d)-[hs:HAS_SKILL]->(s:Skill)
    WITH d, collect(DISTINCT s { .id, .name, .category, .color, proficiency: hs.proficiency }) AS skills
    OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
    RETURN { id: d.id, name: d.name, role: d.role, initials: d.initials, skills: skills,
      projects: collect(DISTINCT p { .id, .name, .status, .category }) } AS developer`,

  search: `
    CALL {
      MATCH (s:Skill) WHERE toLower(s.name) CONTAINS toLower($term)
      RETURN 'skill' AS type, { id: s.id, name: s.name, category: s.category } AS result
      UNION
      MATCH (p:Project) WHERE toLower(p.name) CONTAINS toLower($term)
      RETURN 'project' AS type, { id: p.id, name: p.name, category: p.category } AS result
      UNION
      MATCH (d:Developer) WHERE toLower(d.name) CONTAINS toLower($term)
      RETURN 'developer' AS type, { id: d.id, name: d.name, role: d.role } AS result
    }
    RETURN type, result LIMIT $limit`,

  // Two-hop graph query: people sharing a skill with a selected developer.
  relatedDevelopers: `
    MATCH (source:Developer {id: $id})-[:HAS_SKILL]->(s:Skill)<-[:HAS_SKILL]-(peer:Developer)
    WHERE source <> peer
    RETURN { id: peer.id, name: peer.name, role: peer.role, initials: peer.initials } AS developer,
      collect(DISTINCT s.name) AS sharedSkills, count(DISTINCT s) AS sharedSkillCount
    ORDER BY sharedSkillCount DESC, developer.name`,

  // Three-hop recommendation: skills used in a developer's projects but not held by that developer.
  recommendedSkills: `
    MATCH (d:Developer {id: $id})-[:WORKED_ON]->(:Project)-[:USES_SKILL]->(suggested:Skill)
    WHERE NOT (d)-[:HAS_SKILL]->(suggested)
    RETURN { id: suggested.id, name: suggested.name, category: suggested.category, color: suggested.color } AS skill, count(*) AS projectUsage
    ORDER BY projectUsage DESC, skill.name LIMIT $limit`
};
