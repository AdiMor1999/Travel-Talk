import express from "express";
import userController from "../controllers/user_controller";
const router = express.Router();

// Retrieve the profile information for a specific user
router.get("/:userId", userController.getUserProfile);

// Update the profile information for a specific user
router.patch("/:userId", userController.updateUserProfile);

export default router;
