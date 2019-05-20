import { Router } from 'express';
import CommentController from '../../controllers/CommentController';
import Validation from '../../middlewares/validateComment';
import checkArticle from '../../middlewares/checkArticle';
import checkComment from '../../middlewares/checkComment';
import asyncHandler from '../../middlewares/asyncHandler';
import CommentEditController from '../../controllers/CommentEditController';

const router = Router();

router.post('/:articleSlug/comments', Validation, checkArticle, CommentController.create);
router.get('/:articleSlug/comments', asyncHandler(CommentController.getAll));

router.delete('/:articleSlug/comments/:id', checkArticle, checkComment, CommentController.delete);
router.put(
  '/:articleSlug/comments/:id',
  Validation,
  checkArticle,
  checkComment,
  CommentEditController.edit
);
router.get('/:articleSlug/comments/:id/edits', checkArticle, checkComment, CommentEditController.getAll);

export default router;
