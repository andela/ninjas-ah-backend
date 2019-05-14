import { Router } from 'express';
import CommentController from '../../controllers/CommentController';
import Validation from '../../middlewares/validateComment';
import checkArticle from '../../middlewares/checkArticle';
import checkComment from '../../middlewares/checkComment';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router.post('/:articleSlug/comments', Validation, checkArticle, CommentController.create);
router.get('/:articleSlug/comments', asyncHandler(CommentController.getAll));
router.put(
  '/:articleSlug/comments/:id',
  Validation,
  checkArticle,
  checkComment,
  CommentController.edit
);
router.delete('/:articleSlug/comments/:id', checkArticle, checkComment, CommentController.delete);

export default router;
