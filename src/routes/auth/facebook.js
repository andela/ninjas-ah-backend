import express from 'express';
import passport from '../../middlewares/passport';
import AuthPassportController from '../../controllers/AuthPassportController';

const router = express.Router();

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/callback', passport.authenticate('facebook'), AuthPassportController.loginOrSignup);

export default router;
