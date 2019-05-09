import { Router } from 'express';
import CommentController from '../../controllers/CommentController';
import Validation from '../../middlewares/validateComment';
import checkArticle from '../../middlewares/checkArticle';
import checkComment from '../../middlewares/checkComment';

const router = Router();

// router.post('/:articleId/comments', Validation, checkArticle, CommentController.create);
router.post('/:articleId/comments', Validation, checkArticle, CommentController.create);
router.get('/:articleId/comments', CommentController.getAll);
router.put(
  '/:articleId/comments/:id',
  Validation,
  checkArticle,
  checkComment,
  CommentController.edit
);
router.delete('/:articleId/comments/:id', checkArticle, checkComment, CommentController.delete);

export default router;
