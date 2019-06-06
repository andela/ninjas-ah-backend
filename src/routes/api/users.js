import { Router } from 'express';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';
import asyncHandler from '../../middlewares/asyncHandler';
import AuthLocalController from '../../controllers/AuthLocalController';
import isActiveUser from '../../middlewares/isActiveUser';
import verifyAdmin from '../../middlewares/verifyAdmin';

const router = Router();

router.put('/', verifyToken, checkUpdateUserPermission, validateUser, UserController.update); // update user profile
router.get('/', verifyToken, asyncHandler(UserController.getAllAuthors));
router.put(
  '/:id',
  verifyToken,
  validateUser,
  isActiveUser,
  checkUpdateUserPermission,
  UserController.update
); // update user profile by id

router.get('/', verifyToken, asyncHandler(UserController.getAll));
// user followers
router.get('/followers', verifyToken, AuthLocalController.followers);

// user following
router.get('/following', verifyToken, AuthLocalController.following);
router.delete(
  '/:id',
  verifyToken,
  checkUpdateUserPermission,
  isActiveUser,
  AuthLocalController.deactivateAccount
);
router.patch('/:username/unfollow', verifyToken, AuthLocalController.unfollow);

router.get('/:id', verifyToken, verifyAdmin, checkUpdateUserPermission, AuthLocalController.getOne);
router.post('/', verifyToken, verifyAdmin, validateUser, AuthLocalController.create);
router.patch('/:username/follow', verifyToken, isActiveUser, AuthLocalController.follow);
export default router;
