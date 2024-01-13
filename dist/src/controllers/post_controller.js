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
const post_model_1 = __importDefault(require("../models/post_model"));
class postController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAllPosts");
            try {
                const posts = yield post_model_1.default.find();
                res.send(posts);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getPostById:" + req.params.id);
            const postId = req.params.id;
            try {
                const post = yield post_model_1.default.findById(postId);
                if (!post) {
                    res.status(404).json({ error: 'Post not found' });
                }
                res.send(post);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("createPost:" + req.body);
            try {
                const createdPost = yield post_model_1.default.create(req.body);
                res.status(201).send(createdPost);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("updateOrderById:" + req.body);
            const postId = req.params.id;
            try {
                const updatedPost = yield post_model_1.default.findByIdAndUpdate(postId, req.body, { new: true });
                if (!updatedPost) {
                    return res.status(404).json({ error: 'Post not found' });
                }
                res.send(updatedPost);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("deleteOrderById:" + req.body);
            const postId = req.params.id;
            try {
                const deletedPost = yield post_model_1.default.findByIdAndDelete(postId);
                if (!deletedPost) {
                    res.status(404).json({ error: 'Post not found' });
                }
                res.status(200).send({ message: 'Post deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new postController();
//# sourceMappingURL=post_controller.js.map