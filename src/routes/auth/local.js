import express from 'express';
import AuthLocalController from '../../controllers/AuthLocalController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import validateLogin from '../../middlewares/validateLogin';
import isActiveUser from '../../middlewares/isActiveUser';
import checkSingUpPermission from '../../middlewares/checkSignUpPermission';

const router = express.Router();

router.post(
  '/signup',
  checkSingUpPermission,
  validateUser,
  asyncHandler(AuthLocalController.signup)
);

// user login route
router.post('/login', validateLogin, isActiveUser, AuthLocalController.login);

// activate user account
router.get('/activate/:token', verifyToken, AuthLocalController.activate);

// Reset password
router.get('/reset/:token', asyncHandler(AuthLocalController.reset));
router.post('/reset', asyncHandler(AuthLocalController.sendEmail));
router.patch('/reset/:token', asyncHandler(AuthLocalController.updatePassword));

export default router;
