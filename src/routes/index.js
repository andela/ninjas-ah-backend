import express from 'express';
import auth from './auth';
import api from './api';

const router = express.Router();

router.use('/auth', auth);
router.use(api);

export default router;
