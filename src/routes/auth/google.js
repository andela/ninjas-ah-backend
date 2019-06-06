import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';
import checkSignUpPermission from '../../middlewares/checkSignUpPermission';

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/callback',
  passport.authenticate('google'),
  checkSignUpPermission,
  AuthPassportController.loginOrSignup
);

export default router;
