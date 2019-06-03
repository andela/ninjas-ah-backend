import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';
import checkSingUpPermission from '../../middlewares/checkSingUpPermission';

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/callback',
  passport.authenticate('google'),
  checkSingUpPermission,
  AuthPassportController.loginOrSignup
);

export default router;
