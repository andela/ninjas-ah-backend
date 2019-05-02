import { Router } from 'express';
import comments from '../../controllers/Comments';

const app = Router();

app.post('/:id', comments.createComment);
app.get('/:id', comments.getAllComments);
app.put('/:id', comments.editComment);
app.delete('/:id', comments.deleteComment);

export default app;
