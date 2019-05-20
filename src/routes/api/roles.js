import { Router } from 'express';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';
import verifyAdminUser from '../../middlewares/verifyAdmin';
// import verifyAdminUser from '../../middlewares/verifyAdmin';

const rolesRouter = Router();

rolesRouter.put(
  '/:username',
  verifyToken,
  checkUpdateUserPermission,
  verifyAdminUser,
  UserController.updateUserRole
);

export default rolesRouter;
