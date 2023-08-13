import { Router } from "express";
import * as controllers from "../controllers/userController.js";

const router = Router();

// Sign up a new user
router.post("/signup", controllers.signUp);

// Sign in a user
router.post("/signin", controllers.signIn);

// Special route for 'me'
router.get('/me', controllers.getUserByToken);

//Get all users
router.get("/", controllers.getUsers)

// Update an existing user
router.put("/:id", controllers.updateUser);

// Delete a user
router.delete("/:id", controllers.deleteUser);

//Get a user by ID
router.get("/:id", controllers.getUserById)

export default router;
