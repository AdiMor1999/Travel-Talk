"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_controller_1 = __importDefault(require("../controllers/post_controller"));
router.get('/', post_controller_1.default.getAll.bind(post_controller_1.default));
router.get('/:id', post_controller_1.default.getById.bind(post_controller_1.default));
router.post('/', post_controller_1.default.create.bind(post_controller_1.default));
router.patch('/:id', post_controller_1.default.updateById.bind(post_controller_1.default));
router.delete('/:id', post_controller_1.default.deleteById.bind(post_controller_1.default));
exports.default = router;
//# sourceMappingURL=post_route.js.map