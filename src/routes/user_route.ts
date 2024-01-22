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
 *       required:
 *         - email
 *         - password
 *         - name
 */

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     description: Retrieve the profile of a specific user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with user profile data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. User must be authenticated.
 *       404:
 *         description: User not found.
 */
router.get("/:userId", authMiddleware, userController.getUserProfile);

/**
 * @swagger
 * /user/{userId}:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     description: Update the profile of a specific user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       description: Updated user profile data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful response with updated user profile data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. User must be authenticated.
 *       404:
 *         description: User not found.
 */
router.patch("/:userId", authMiddleware, userController.updateUserProfile);

export default router;
