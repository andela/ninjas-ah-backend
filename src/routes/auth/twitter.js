import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';
import checkSingUpPermission from '../../middlewares/checkSingUpPermission';

const router = express.Router();

router.get('/', passport.authenticate('twitter', { scope: ['email', 'profile'] }));

router.get(
  '/callback',
  passport.authenticate('twitter'),
  checkSingUpPermission,
  AuthPassportController.loginOrSignup
);

export default router;
