import express from 'express';
import local from './local';
import facebook from './facebook';
import twitter from './twitter';
import google from './google';
import logout from '../../middlewares/logout';
import verifyToken from '../../middlewares/verifyToken';
import AuthLocalController from '../../controllers/AuthLocalController';
import status from '../../config/status';

const router = express.Router();

router.use('/', local);
router.use('/facebook', facebook);
router.use('/twitter', twitter);
router.use('/google', google);
router.get('/logout', verifyToken, logout);
router.get(
  '/:id',
  verifyToken,
  (req, res, next) => (req.user.id === (req.params && Number.parseInt(req.params.id, 10))
    ? next()
    : res
      .status(status.UNAUTHORIZED)
      .json({ errors: { user: "Sorry, this account doesn't exist" } })),
  AuthLocalController.getOne
);

export default router;
