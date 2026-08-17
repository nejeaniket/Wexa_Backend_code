import { Router } from "express";
import {
  getSkills, getSkill, getProjects, getProject,
  getDevelopers, getDeveloper, search,
  getRelatedDevelopers, getRecommendations,
} from "../controllers/graph.controller.js";

const router = Router();

router.get("/skills", getSkills);
router.get("/skills/:id", getSkill);
router.get("/projects", getProjects);
router.get("/projects/:id", getProject);
router.get("/developers", getDevelopers);
router.get("/developers/:id", getDeveloper);
router.get("/developers/:id/related", getRelatedDevelopers);
router.get("/developers/:id/recommendations", getRecommendations);
router.get("/search", search);

export default router;
