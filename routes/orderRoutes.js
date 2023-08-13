import { Router } from "express";
import * as controllers from "../controllers/orderController.js";

const router = Router();

router.get("/", controllers.getOrders);
router.get("/:id", controllers.getOrder);
router.post("/:id", controllers.createOrder);
router.put("/:id", controllers.updateOrder);
router.delete("/:id", controllers.deleteOrder);

export default router;