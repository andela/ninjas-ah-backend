import { Router } from 'express';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';

const rolesRouter = Router();

rolesRouter.put(
  '/:username',
  verifyToken,
  checkUpdateUserPermission,
  UserController.updateUserRole
);

export default rolesRouter;
