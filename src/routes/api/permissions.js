import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import PermissionController from '../../controllers/PermissionController';
import checkPermissions from '../../middlewares/checkPermissions';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router.post(
  '/',
  verifyToken,
  checkPermissions({
    route: 'users',
    action: 'create',
    message: 'you can not create this account'
  }),
  asyncHandler(PermissionController.create)
);

export default router;
