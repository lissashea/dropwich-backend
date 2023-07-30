import { Router } from "express";
import * as controllers from "../controllers/orders.js";

const router = Router();

router.get("/", controllers.getOrders);
router.get("/:id", controllers.getOrder);
router.post("/", controllers.createOrder);
router.put("/:id", controllers.updateOrder);
router.delete("/:id", controllers.deleteOrder);

export default router;