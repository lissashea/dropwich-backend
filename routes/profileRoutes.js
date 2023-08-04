import { Router } from "express";
import * as controllers from "../controllers/profileController.js";

const router = Router();
// Get all profiles
router.get("/", controllers.getProfiles);

// Get profile by ID
router.get("/:id", controllers.getProfileById);

// Create a new profile
router.post("/", controllers.createProfile);

// Update an existing profile
router.put("/:id", controllers.updateProfile);

// Delete a profile
router.delete("/:id", controllers.deleteProfile);

export default router;
