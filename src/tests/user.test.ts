import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import UserModel from "../models/user_model";
import { Express } from "express";

let app: Express;
let testUserId;

beforeAll(async () => {
  app = await initApp();

  // Create a test user
  const testUser = await UserModel.create({
    email: "testUser@test.com",
    name: "Test User",
    password: "testPassword",
    profilePhoto: "testPhoto.jpg",
    aboutMe: "I love testing!",
  });

  testUserId = testUser._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Controller Tests", () => {
  test("GET /user/:userId - Get User Profile", async () => {
    const response = await request(app).get(`/user/${testUserId}`);
    expect(response.status).toBe(200);

    const userProfile = response.body.userProfile;
    expect(userProfile).toBeDefined();
    expect(userProfile.email).toBeDefined();
    expect(userProfile.Name).toBeDefined();
    expect(userProfile.profilePhoto).toBeDefined();
    expect(userProfile.aboutMe).toBeDefined();
  });

  test("GET /user/:userId - Get User Profile (User not found)", async () => {
    const nonExistentUserId = "123456789012345678901234"; // A non-existent user ID
    const response = await request(app).get(`/user/${nonExistentUserId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("PATCH /user/:userId - Update User Profile", async () => {
    const updatedProfile = {
      name: "Updated Name",
      profilePhoto: "updatedPhoto.jpg",
      aboutMe: "Updated bio!",
    };

    const response = await request(app)
      .patch(`/user/${testUserId}`)
      .send(updatedProfile);
    expect(response.status).toBe(200);

    const updatedUser = response.body;
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updatedProfile.name);
    expect(updatedUser.profilePhoto).toBe(updatedProfile.profilePhoto);
    expect(updatedUser.aboutMe).toBe(updatedProfile.aboutMe);
  });

  test("PATCH /user/:userId - Update User Profile (User not found)", async () => {
    const nonExistentUserId = "123456789012345678901234"; // A non-existent user ID
    const updatedProfile = {
      name: "Updated Name",
      profilePhoto: "updatedPhoto.jpg",
      aboutMe: "Updated bio!",
    };

    const response = await request(app)
      .patch(`/user/${nonExistentUserId}`)
      .send(updatedProfile);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});
