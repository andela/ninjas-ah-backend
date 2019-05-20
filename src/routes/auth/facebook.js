import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';
import checkSingUpPermission from '../../middlewares/checkSingUpPermission';

const router = express.Router();

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/callback',
  passport.authenticate('facebook'),
  checkSingUpPermission,
  AuthPassportController.loginOrSignup
);

export default router;
