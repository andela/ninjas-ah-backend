import { Router } from 'express';
import comments from '../../controllers/Comments';

const app = Router();

app.post('/:id/comments', comments.createComment);
app.get('/:id/comments', comments.getAllComments);
app.put('/:articleId/comments/:commentId', comments.editComment);
app.delete('/:articleId/comments/:commentId', comments.deleteComment);

export default app;
