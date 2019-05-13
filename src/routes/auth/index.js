import express from 'express';
import local from './local';
import facebook from './facebook';
import twitter from './twitter';
import google from './google';
import status from '../../config/status';

const router = express.Router();

router.use('/', local);
router.use('/facebook', facebook);
router.use('/twitter', twitter);
router.use('/google', google);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(status.OK).json({
    message: 'you are successfuly logged out'
  });
});

export default router;
