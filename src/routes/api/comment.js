import { Router } from 'express';
import comments from '../../controllers/commentsController';
import Validation from '../../middlewares/commentValidate';
import getArticle from '../../middlewares/checkElements/checkArticle';
import getComment from '../../middlewares/checkElements/checkComment';

const app = Router();

app.post(
  '/:articleId/comments',
  Validation,
  getArticle,
  comments.createComment
);
app.get('/:articleId/comments', getArticle, comments.getComments);
app.put(
  '/:articleId/comments/:id',
  Validation,
  getArticle,
  getComment,
  comments.editComment
);
app.delete(
  '/:articleId/comments/:id',
  getArticle,
  getComment,
  comments.deleteComment
);

export default app;
