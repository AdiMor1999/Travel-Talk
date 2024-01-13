import express from "express";
const router = express.Router();
import postController from "../controllers/post_controller";


router.get('/', postController.getAll.bind(postController));

router.get('/:id', postController.getById.bind(postController));

router.post('/', postController.create.bind(postController));

router.patch('/:id', postController.updateById.bind(postController));

router.delete('/:id', postController.deleteById.bind(postController));

export default router;