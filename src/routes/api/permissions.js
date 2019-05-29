import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import PermissionController from '../../controllers/PermissionController';
import validatePermissions from '../../middlewares/validation/permissions';
import checkPermissions from '../../middlewares/checkPermissions';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router.post(
  '/',
  verifyToken,
  validatePermissions,
  checkPermissions({
    route: 'users',
    action: 'create',
    message: 'you can not create this permission'
  }),
  asyncHandler(PermissionController.create)
);

export default router;
