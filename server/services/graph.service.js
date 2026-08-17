import * as repository from "../repositories/graph.repository.js";
import { mockData } from "../data/mockData.js";

async function listWithFallback(loader, fallback, label) {
  try {
    const data = await loader();
    return data.length ? data : fallback;
  } catch (error) {
    console.warn(`Using sample ${label} data because CognoDB is unavailable: ${error.message}`);
    return fallback;
  }
}

async function oneWithFallback(loader, id, fallback, label) {
  try {
    const data = await loader(id);
    if (data?.id && data?.name) return data;
  } catch (error) {
    console.warn(`Using sample ${label} data because CognoDB is unavailable: ${error.message}`);
  }
  return fallback.find((entry) => entry.id === id) ?? null;
}

export const graphService = {
  getSkills: () => listWithFallback(repository.findSkills, mockData.skills, "skills"),
  getSkill: (id) => oneWithFallback(repository.findSkillById, id, mockData.skills, "Skill"),
  getProjects: () => listWithFallback(repository.findProjects, mockData.projects, "projects"),
  getProject: (id) => oneWithFallback(repository.findProjectById, id, mockData.projects, "Project"),
  getDevelopers: () => listWithFallback(repository.findDevelopers, mockData.developers, "developers"),
  getDeveloper: (id) => oneWithFallback(repository.findDeveloperById, id, mockData.developers, "Developer"),
  search: repository.search,
  getRelatedDevelopers: repository.findRelatedDevelopers,
  getRecommendedSkills: repository.findRecommendedSkills,
};
