import express from "express";
import * as resetPassword from '../controller'

const router = express.Router();

router.post("/enter-email", resetPassword.enterEmail);

router.post("/enter-new-password/:userId/:token", resetPassword.enterNewPassword);
export default router;
