import { Router } from 'express';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';
import authLocalController from '../../controllers/AuthLocalController';
import isActiveUser from '../../middlewares/isActiveUser';

const router = Router();

router.put('/', verifyToken, validateUser, UserController.update); // update user profile
router.put(
  '/:id',
  verifyToken,
  validateUser,
  isActiveUser,
  checkUpdateUserPermission,
  UserController.update
); // update user profile by id

router.delete('/:id', verifyToken, isActiveUser, authLocalController.deactivateAccount);
router.get('/', verifyToken, authLocalController.getAll);
router.get('/:id', verifyToken, authLocalController.getOne);
router.post('/', verifyToken, validateUser, authLocalController.create);
export default router;
