import { Router } from 'express';
import checkCommentLike from '../../middlewares/checkCommentLike';
import CommentLikeController from '../../controllers/CommentLikeController';

const router = Router();

router.post('/comments/:commentId/likes', checkCommentLike, CommentLikeController.create);

export default router;
