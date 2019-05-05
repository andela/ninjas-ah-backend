import express from 'express';
import userControllers from '../../controllers/User';
import errorCatcher from '../../middlewares/errorCatcher';

const router = express.Router();

// Reset password
router.post('/auth/reset', errorCatcher(userControllers.sendEmail));
router.patch('/auth/reset/:token', errorCatcher(userControllers.updatePassword));

export default router;
