import express from "express";
import authController from "../controllers/auth_controller";
import authMiddleware from "../middlewares/auth_middleware";
const router = express.Router();
/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*           example:
*             email: "ofek@gmail.com"
*             password: "1234"
*             name: "ofek zavaro"
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/


router.post("/register", authController.register);

/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The JWT access token
*         refreshToken:
*           type: string
*           description: The JWT refresh token
*           example:
*             accessToken: '123cd123x1xx1'
*             refreshToken: '134r2134cr1x3c'
*/

/**
* @swagger
* /auth/login:
*   post:
*     summary: Logs in a user and returns access & refresh tokens
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*           example:
*             email: "ofek@gmail.com"
*             password: "1234"
*     responses:
*       200:
*         description: The access & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/


router.post("/login", authController.login);
//router.post("/login/google", authController.loginWithGoogle);

/**
* @swagger
* /auth/logout:
*   get:
*     summary: Logout a user
*     tags: [Auth]
*     description: Need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: [] 
*     responses:
*       200:
*         description: Logout completed successfully
*/

router.post("/logout", authController.logout);
router.get("/refresh", authController.refreshToken);

export default router;
