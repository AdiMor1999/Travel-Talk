import express from "express";
import userController from "../controllers/user_controller";
import authMiddleware from "../middlewares/auth_middleware";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing user profiles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         profilePhoto:
 *           type: string
 *           description: URL of the user's profile photo.
 *         aboutMe:
 *           type: string
 *           description: A brief description about the user.
 *         posts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Post'  # Reference to the Post schema
 *       required:
 *         - email
 *         - password
 *         - name
 */


router.get("/:userId", authMiddleware, userController.getUserProfile);
router.patch("/:userId", authMiddleware, userController.updateUserProfile);

export default router;
