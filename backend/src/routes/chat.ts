import { Router } from "express";
import { chatController, validateKey, genTitle } from "../controllers/chat.controller";

const router = Router();

router.post("/chat", chatController);
router.post("/validate-key",  validateKey);
router.post("/title",  genTitle);

export default router;