import { Router } from 'express';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';
import asyncHandler from '../../middlewares/asyncHandler';
import AuthLocalController from '../../controllers/AuthLocalController';
import isActiveUser from '../../middlewares/isActiveUser';
import verifyAdmin from '../../middlewares/verifyAdmin';
import checkUpdateUser from '../../middlewares/checkUpdateUser';

const router = Router();

router.put(
  '/',
  verifyToken,
  checkUpdateUserPermission,
  validateUser,
  checkUpdateUser,
  UserController.update
); // update user profile
router.get('/email/confirm/:token', verifyToken, UserController.confirmEmailUpdate); // confirm email update
router.get('/authors', verifyToken, asyncHandler(UserController.getAllAuthors));
router.put(
  '/:id',
  verifyToken,
  validateUser,
  isActiveUser,
  checkUpdateUserPermission,
  checkUpdateUser,
  UserController.update
); // update user profile by id

router.get('/', verifyToken, verifyAdmin, asyncHandler(UserController.getAll));
// user followers
router.get('/followers', verifyToken, UserController.followers);

// user following
router.get('/following', verifyToken, UserController.following);
router.delete(
  '/:id',
  verifyToken,
  checkUpdateUserPermission,
  isActiveUser,
  AuthLocalController.deactivateAccount
);
router.patch('/:username/unfollow', verifyToken, UserController.unfollow);

router.get('/:id', verifyToken, verifyAdmin, checkUpdateUserPermission, AuthLocalController.getOne);
router.post('/', verifyToken, verifyAdmin, validateUser, AuthLocalController.create);
router.patch('/:username/follow', verifyToken, isActiveUser, UserController.follow);
export default router;
