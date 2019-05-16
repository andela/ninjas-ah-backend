import express from 'express';
import AuthLocalController from '../../controllers/AuthLocalController';

const router = express.Router();

router.post('/signup', AuthLocalController.signup);

// user login route
router.post('/login', AuthLocalController.login);

export default router;
