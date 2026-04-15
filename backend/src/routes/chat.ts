import { Router } from "express";
import { chatController, validateKey } from "../controllers/chat.controller";

const router = Router();

router.post("/chat", chatController);
router.post("/validate-key",  validateKey);

export default router;