import { Router } from 'express';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validateUser';
import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';

const router = Router();

router.put('/', verifyToken, validateUser, UserController.update); // update user profile
router.put('/:id', verifyToken, validateUser, checkUpdateUserPermission, UserController.update); // update user profile by id

export default router;
