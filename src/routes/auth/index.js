import express from 'express';
import local from './local';
import facebook from './facebook';
import twitter from './twitter';
import google from './google';
import logout from '../../middlewares/logout';
import verifyToken from '../../middlewares/verifyToken';

const router = express.Router();

router.use('/', local);
router.use('/facebook', facebook);
router.use('/twitter', twitter);
router.use('/google', google);
router.get('/logout', verifyToken, logout);

export default router;
