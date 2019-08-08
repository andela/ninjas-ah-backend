import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';
import checkSignUpPermission from '../../middlewares/checkSignUpPermission';

const router = express.Router();

router.get('/', passport.authenticate('twitter', { scope: ['email', 'profile'] }));

router.get(
  '/callback',
  passport.authenticate('twitter'),
  checkSignUpPermission,
  AuthPassportController.loginOrSignup
);

export default router;
