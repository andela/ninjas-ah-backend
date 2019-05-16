import { Router } from 'express';
import { getAllRoles, updateUserRole } from '../../controllers/roles';
import verifyAdminUser from '../../middlewares/verifyAdmin';

const rolesRouter = Router();

rolesRouter.get('/', verifyAdminUser, getAllRoles);

rolesRouter.put('/:username', verifyAdminUser, updateUserRole);

export default rolesRouter;
