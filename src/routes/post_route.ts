import express from "express";
const router = express.Router();
import postController from "../controllers/post_controller";
import authMiddleware from "../middlewares/auth_middleware";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           description: The city associated with the post.
 *         location:
 *           type: string
 *           description: The location associated with the post.
 *         description:
 *           type: string
 *           description: A description of the post.
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of photo URLs associated with the post.
 *         userId:
 *           type: string
 *           description: The user ID associated with the post.
 *       required:
 *         - city
 *         - location
 *         - description
 *         - photos
 *         - userId
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get("/", postController.getAll.bind(postController));

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", postController.getById.bind(postController));
/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []  # Use bearer token for authentication
 *     requestBody:
 *       description: Post data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'   # Reference to the Post schema
 *           example:
 *             city: "Example Post"
 *             location: "Example Location"
 *             description: "This is an example post description."
 *             photos: ["example-photo1.jpg", "example-photo2.jpg"]
 *             userId: "65aa93a86c316d58657c7f4d"
 *     responses:
 *       201:
 *         description: The created post
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post("/", authMiddleware, postController.create.bind(postController));
/**
 * @swagger
 * /post/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []  # Use bearer token for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     requestBody:
 *       description: Updated post data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'   # Reference to the Post schema
 *     responses:
 *       200:
 *         description: The updated post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id",
  authMiddleware,
  postController.updateById.bind(postController)
);
/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []  # Use bearer token for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  authMiddleware,
  postController.deleteById.bind(postController)
);

export default router;
