import request from "supertest";
import initApp from "../app";
import User from "../models/user_model";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;
const userLogIn = {
  email: "loginuser@example.com",
  password: "loginpassword",
  name: "User Log In",
};
const userData = {
  email: "test@example.com",
  password: "password123",
  name: "Adi Ofek",
};
const userLogOut = {
  email: "logoutuser@example.com",
  password: "logoutpassword",
  name: "Logout User",
};
const userLogout = {
  email: userLogOut.email,
  password: "logoutpassword",
  name: "logout",
};
const userLogoutNoToken = {
  email: "userLogoutNoToken@gmail.com",
  password: "1234",
  name: "userLogoutNoToken",
};

const user3 = {
  email: "user3@gmail.com",
  password: "1234",
  name: "user3",
};

describe("Auth Tests", () => {
  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await User.deleteMany({ email: userLogIn.email });
    await User.deleteMany({ email: userData.email });
    await User.deleteMany({ email: userLogout.email });
    await User.deleteMany({ email: userLogoutNoToken.email });
    await mongoose.connection.close();
  });

  test("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.email).toBe(userData.email);
    expect(response.body.name).toBe(userData.name);
  });

  test("should return 400 if missing email, password, or name", async () => {
    const response = await request(app).post("/auth/register").send({});

    expect(response.status).toBe(400);
  });

  test("should return 406 if email already exists", async () => {
    const existingUser = {
      email: "existing@example.com",
      password: "existingpassword",
      name: "Existing User",
    };

    await request(app).post("/auth/register").send(existingUser);

    const response = await request(app)
      .post("/auth/register")
      .send(existingUser);

    expect(response.status).toBe(406);
  });

  test("should login with correct credentials", async () => {
    // Register a user
    await request(app).post("/auth/register").send(userLogIn);

    // Login with correct credentials
    const response = await request(app).post("/auth/login").send({
      email: "loginuser@example.com",
      password: "loginpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });

  test("should return 400 if missing email or password", async () => {
    const response = await request(app).post("/auth/login").send({});

    expect(response.status).toBe(400);
  });

  test("should return 401 if email or password incorrect", async () => {
    const userData = {
      email: "incorrect@example.com",
      password: "incorrectpassword",
    };

    const response = await request(app).post("/auth/login").send(userData);

    expect(response.status).toBe(401);
  });
  test("should log out the user", async () => {
    // Login with the test user's credentials
    await request(app).post("/auth/register").send(userLogout);
    const loginResponse = await request(app).post("/auth/login").send({
      email: userLogOut.email,
      password: "logoutpassword",
    });

    const refreshToken = loginResponse.body.refreshToken;
    expect(refreshToken).toBeDefined();

    // Logout the user
    const logoutResponse = await request(app)
      .post("/auth/logout")
      .set("authorization", `JWT ${refreshToken}`)
      .send();

    expect(logoutResponse.status).toBe(200);
  });

  test("should return 401 if refreshToken is null", async () => {
    // Login with the test user's credentials
    await request(app).post("/auth/register").send(userLogoutNoToken);
    const loginResponse = await request(app).post("/auth/login").send({
      email: userLogoutNoToken.email,
      password: "1234",
    });

    // Logout the user withpou refresh token
    const logoutResponse = await request(app).post("/auth/logout");
    expect(logoutResponse.status).toBe(401);
  });

  test("should return 401 if verify not success", async () => {
    // Login with the test user's credentials
    await request(app).post("/auth/register").send(user3);
    const loginResponse = await request(app).post("/auth/login").send({
      email: user3.email,
      password: "1234",
    });
    const refreshToken = "invalidRefreshToken";
    // Logout the user
    const logoutResponse = await request(app)
      .post("/auth/logout")
      .set("authorization", `JWT ${refreshToken}`)
      .send();
    expect(logoutResponse.status).toBe(401);
  });
});
