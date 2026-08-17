import { graphService } from "../services/graph.service.js";

export async function getSkills(_req, res, next) {
  try { res.json({ data: await graphService.getSkills() }); } catch (error) { next(error); }
}
export async function getSkill(req, res, next) {
  try {
    const data = await graphService.getSkill(req.params.id);
    if (!data) return res.status(404).json({ error: "Skill not found" });
    res.json({ data });
  } catch (error) { next(error); }
}
export async function getProjects(_req, res, next) {
  try { res.json({ data: await graphService.getProjects() }); } catch (error) { next(error); }
}
export async function getProject(req, res, next) {
  try {
    const data = await graphService.getProject(req.params.id);
    if (!data) return res.status(404).json({ error: "Project not found" });
    res.json({ data });
  } catch (error) { next(error); }
}
export async function getDevelopers(_req, res, next) {
  try { res.json({ data: await graphService.getDevelopers() }); } catch (error) { next(error); }
}
export async function getDeveloper(req, res, next) {
  try {
    const data = await graphService.getDeveloper(req.params.id);
    if (!data) return res.status(404).json({ error: "Developer not found" });
    res.json({ data });
  } catch (error) { next(error); }
}
export async function search(req, res, next) {
  try {
    const term = String(req.query.q || "").trim();
    if (!term) return res.status(400).json({ error: "Query parameter q is required" });
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    res.json({ data: await graphService.search(term, limit) });
  } catch (error) { next(error); }
}
export async function getRelatedDevelopers(req, res, next) {
  try { res.json({ data: await graphService.getRelatedDevelopers(req.params.id) }); } catch (error) { next(error); }
}
export async function getRecommendations(req, res, next) {
  try { res.json({ data: await graphService.getRecommendedSkills(req.params.id, 5) }); } catch (error) { next(error); }
}
