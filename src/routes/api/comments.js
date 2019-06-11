import { Router } from 'express';
import CommentController from '../../controllers/CommentController';
import Validation from '../../middlewares/validateComment';
import checkArticle from '../../middlewares/checkArticle';
import checkComment from '../../middlewares/checkComment';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import checkPermissions from '../../middlewares/checkPermissions';

const router = Router();

router.post(
  '/:articleSlug/comments',
  verifyToken,
  checkPermissions({
    route: 'comments',
    action: 'create'
  }),
  Validation,
  checkArticle,
  asyncHandler(CommentController.create)
);
router.get('/:articleSlug/comments', checkArticle, asyncHandler(CommentController.getAll));
router.patch(
  '/:articleSlug/comments/:commentId',
  verifyToken,
  checkPermissions({
    route: 'comments',
    action: 'edit'
  }),
  Validation,
  checkArticle,
  checkComment,
  asyncHandler(CommentController.editComment)
);
router.delete(
  '/:articleSlug/comments/:commentId',
  verifyToken,
  checkPermissions({
    route: 'comments',
    action: 'delete'
  }),
  checkArticle,
  checkComment,
  asyncHandler(CommentController.delete)
);
router.get(
  '/:articleSlug/comments/:commentId/edits',
  verifyToken,
  checkPermissions({
    route: 'comments',
    action: 'read'
  }),
  checkArticle,
  checkComment,
  asyncHandler(CommentController.getAllEdit)
);
router.delete(
  '/:articleSlug/comments/:commentId',
  verifyToken,
  checkPermissions({
    route: 'comments',
    action: 'delete'
  }),
  checkArticle,
  checkComment,
  asyncHandler(CommentController.delete)
);
router.delete(
  '/:articleSlug/comments/:commentId/edits/:id',
  verifyToken,
  checkPermissions({
    route: 'comments',
    action: 'delete'
  }),
  checkArticle,
  checkComment,
  asyncHandler(CommentController.remove)
);

export default router;
