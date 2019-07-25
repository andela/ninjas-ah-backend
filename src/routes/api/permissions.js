import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import PermissionController from '../../controllers/PermissionController';
import validatePermissions from '../../middlewares/validation/permissions';
import checkPermissions from '../../middlewares/checkPermissions';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyAdmin from '../../middlewares/verifyAdmin';

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

router.get('/', verifyToken, verifyAdmin, asyncHandler(PermissionController.findAll));
router.get('/:userType', verifyToken, verifyAdmin, asyncHandler(PermissionController.findAll));

export default router;
