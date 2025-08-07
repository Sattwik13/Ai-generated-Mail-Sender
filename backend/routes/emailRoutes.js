import express from "express";
import { generateEmail } from "../controllers/aiController.js";
import { sendEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/generate-email", generateEmail);
router.post("/send-email", sendEmail);

export default router;
