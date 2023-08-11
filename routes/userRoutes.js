import { Router } from "express";
import * as controllers from "../controllers/userController.js";

const router = Router();

// Sign up a new user
router.post("/signup", controllers.signUp);

// Sign in a user
router.post("/signin", controllers.signIn);

// Update an existing user
router.put("/:id", controllers.updateUser);

// Delete a user
router.delete("/:id", controllers.deleteUser);

//Get a user
router.get("/:id", controllers.getUserById)

//Get all user
router.get("/", controllers.getUsers)

export default router;
