import { Router } from "express";
import usersRoutes from "./users.js";
import ordersRoutes from "./orders.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);

export default router;