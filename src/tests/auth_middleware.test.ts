import request from "supertest";
import initApp from "../app";
import { Express } from "express";
import User, { IUser } from "../models/user_model";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let app: Express;
let testUserId: string;
let accessToken: string;
let refreshToken: string;
let newRefreshToken: string;
// Create a test user
const testUser: IUser = {
  email: "testUser@test.com",
  name: "Test User",
  password: "testPassword",
};

describe("Auth Middleware Tests", () => {
  beforeAll(async () => {
    app = await initApp();
    await User.deleteMany({ email: testUser.email });
    const registerResponse = await request(app)
      .post("/auth/register")
      .send(testUser);
    testUserId = registerResponse.body._id;
    //console.log(testUserId);
    const loginResponse = await request(app).post("/auth/login").send({
      email: testUser.email,
      password: "testPassword",
    });
    accessToken = loginResponse.body.accessToken;
    refreshToken = loginResponse.body.refreshToken;
    console.log(accessToken);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should return 401 if auth token is missing", async () => {
    const response = await request(app).get(`/user/${testUserId}`);
    expect(response.status).toBe(401);
  });

  test("Test access with invalid token", async () => {
    const response = await request(app)
      .get(`/user/${testUserId}`)
      .set("Authorization", "JWT 1" + accessToken);
    expect(response.statusCode).toBe(401);
  });

  test("should return 200 if auth token is valid", async () => {
    const response = await request(app)
      .get(`/user/${testUserId}`)
      .set("Authorization", `JWT ${accessToken}`);
    expect(response.status).toBe(200);
  });

  test("Test access after timeout of token", async () => {
    const shortAccessToken = jwt.sign(
      { _id: testUserId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1s",
      }
    );
    await new Promise((resolve) => setTimeout(() => resolve("done"), 1100));

    const response = await request(app)
      .get(`/user/${testUserId}`)
      .set("Authorization", `JWT ${shortAccessToken}`);
    expect(response.status).not.toBe(200);
  });

  test("Test refresh token", async () => {
    const response = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "JWT " + refreshToken)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();

    const newAccessToken = response.body.accessToken;

    const response2 = await request(app)
      .get(`/user/${testUserId}`)
      .set("Authorization", `JWT ${newAccessToken}`);
    expect(response2.status).toBe(200);

    // const response3 = await request(app)
    //   .get("/auth/refresh")
    //   .set("Authorization", "JWT " + refreshToken)
    //   .send();
    // expect(response3.statusCode).not.toBe(200);
  });
});
