import express from 'express';
import AuthLocalController from '../../controllers/AuthLocalController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import checkSingUpPermission from '../../middlewares/checkSingUpPermission';

const router = express.Router();

router.post(
  '/signup',
  validateUser,
  checkSingUpPermission,
  asyncHandler(AuthLocalController.signup)
);

// user login route
router.post('/login', AuthLocalController.login);

// Reset password
router.post('/reset', asyncHandler(AuthLocalController.sendEmail));
router.patch('/reset/:token', verifyToken, asyncHandler(AuthLocalController.updatePassword));

export default router;
