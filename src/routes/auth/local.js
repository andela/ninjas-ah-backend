import express from 'express';
import AuthLocalController from '../../controllers/AuthLocalController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import isActiveUser from '../../middlewares/isActiveUser';

const router = express.Router();

router.post('/signup', validateUser, AuthLocalController.signup);

// user login route
router.post('/login', isActiveUser, AuthLocalController.login);

// Reset password
router.post('/reset', asyncHandler(AuthLocalController.sendEmail));
router.patch('/reset/:token', verifyToken, asyncHandler(AuthLocalController.updatePassword));

export default router;
