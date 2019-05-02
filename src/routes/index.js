import express from 'express';
import api from './api/index';

const router = express.Router();

router.use(api);

export default router;
