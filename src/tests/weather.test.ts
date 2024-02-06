import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";

let app: Express;

describe("Weather API Tests", () => {
  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should return weather data for a valid city", async () => {
    const response = await request(app).get("/weather/london");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("temperature");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("icon");
  });

  test("should return 500  for a invalid city", async () => {
    const response = await request(app).get("/weather/nonexistcity");
    expect(response.status).toBe(500);
  });
});
