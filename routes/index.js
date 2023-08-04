import { Router } from "express";
import usersRoutes from "./userRoutes.js";
import ordersRoutes from "./orderRoutes.js";
import profileRoutes from "./profileRoutes.js"
import parser from "body-parser";


const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.use("/profile",profileRoutes)

export default router;