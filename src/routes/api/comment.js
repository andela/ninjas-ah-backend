import { Router } from 'express';
import comments from '../../controllers/commentsController';
import Validation from '../../middlewares/commentValidate';

const app = Router();

app.post('/:id/comments', Validation, comments.createComment);
app.get('/:id/comments', comments.getComments);
app.put('/:articleId/comments/:commentId', comments.editComment);
app.delete('/:articleId/comments/:commentId', comments.deleteComment);

export default app;
