import express from 'express';
import verifyToken from '../../middlewares/verifyToken';
import ChatController from '../../controllers/ChatController';

const router = express.Router();

router.post('/', verifyToken, ChatController.save);

router.get('/', verifyToken, ChatController.getAll);

router.delete('/:chatId', verifyToken, ChatController.delete);

export default router;
