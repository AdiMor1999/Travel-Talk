"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post_model"));
const globals_1 = require("@jest/globals");
let app;
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield post_model_1.default.deleteMany();
}));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Post API test", () => {
    let postId;
    test("Test Get All Posts - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post creation", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = {
            title: "Test Post",
            location: "Test Location",
            description: "Test Description",
            photos: ["photo1.jpg", "photo2.jpg"],
            userId: "testUserId",
        };
        const response = yield (0, supertest_1.default)(app).post("/post").send(post);
        expect(response.statusCode).toBe(201);
        const postsAfterCreation = yield (0, supertest_1.default)(app).get("/post");
        expect(postsAfterCreation.body.length).toBe(1);
        expect(postsAfterCreation.body[0].title).toBe("Test Post");
        expect(postsAfterCreation.body[0].location).toBe("Test Location");
        expect(postsAfterCreation.body[0].description).toBe("Test Description");
        expect(postsAfterCreation.body[0].photos).toEqual(["photo1.jpg", "photo2.jpg"]);
        expect(postsAfterCreation.body[0].userId).toBe("testUserId");
    }));
    test("Test Get All Posts with one post in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/post");
        expect(response.statusCode).toBe(200);
        const firstPost = response.body[0];
        expect(firstPost.title).toBe("Test Post");
        expect(firstPost.location).toBe("Test Location");
        expect(firstPost.description).toBe("Test Description");
        expect(firstPost.userId).toBe("testUserId");
        postId = firstPost._id;
    }));
    test("Test Get Post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/post/${postId}`);
        expect(response.statusCode).toBe(200);
        const postById = response.body;
        expect(postById.title).toBe("Test Post");
        expect(postById.location).toBe("Test Location");
        expect(postById.description).toBe("Test Description");
        expect(postById.userId).toBe("testUserId");
    }));
    test("Test Update Post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPost = {
            title: "Updated Test Post",
            location: "Updated Test Location",
            description: "Updated Test Description",
            photos: ["photo3.jpg", "photo4.jpg"],
            userId: "updatedTestUserId",
        };
        const response = yield (0, supertest_1.default)(app).patch(`/post/${postId}`).send(updatedPost);
        expect(response.statusCode).toBe(200);
        const updatedPostById = response.body;
        expect(updatedPostById.title).toBe("Updated Test Post");
        expect(updatedPostById.location).toBe("Updated Test Location");
        expect(updatedPostById.description).toBe("Updated Test Description");
        expect(updatedPostById.photos).toEqual(["photo3.jpg", "photo4.jpg"]);
        expect(updatedPostById.userId).toBe("updatedTestUserId");
    }));
    test("Test Delete Post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/post/${postId}`);
        expect(response.statusCode).toBe(200);
        const postsAfterDeletion = yield (0, supertest_1.default)(app).get("/post");
        expect(postsAfterDeletion.body.length).toBe(0);
    }));
});
//# sourceMappingURL=post.test.js.map