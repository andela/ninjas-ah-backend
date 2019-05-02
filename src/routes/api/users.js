import { Router } from 'express';
import usersController from '../../controllers/usersController';

const users = Router();

// Register new user
users.post('/users', usersController.signup);

export default users;
