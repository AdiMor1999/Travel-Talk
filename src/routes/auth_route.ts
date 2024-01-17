import express from "express";
import authController from "../controllers/auth_controller";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
//router.post("/login/google", authController.loginWithGoogle);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refreshToken);

export default router;
