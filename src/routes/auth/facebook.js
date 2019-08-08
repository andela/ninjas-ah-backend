import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';
import checkSignUpPermission from '../../middlewares/checkSignUpPermission';

const router = express.Router();

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/callback',
  passport.authenticate('facebook'),
  checkSignUpPermission,
  AuthPassportController.loginOrSignup
);

export default router;
