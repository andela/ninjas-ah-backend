import { Router } from 'express';
import NotificationController from '../../controllers/NotificationController';
import verifyToken from '../../middlewares/verifyToken';
import validateNotificationConfig from '../../middlewares/validateNotificationConfig';

const router = Router();

router.get('/configuration', verifyToken, NotificationController.getConfig);
router.post(
  '/configuration',
  verifyToken,
  validateNotificationConfig,
  NotificationController.setConfig
);
router.put(
  '/configuration',
  verifyToken,
  validateNotificationConfig,
  NotificationController.updateConfig
);
router.get('/', verifyToken, NotificationController.getAll);
router.get('/seen', verifyToken, NotificationController.getAll);
router.get('/unseen', verifyToken, NotificationController.getAll);
router.get('/:notificationId', verifyToken, NotificationController.getOne);
router.delete('/:notificationId', verifyToken, NotificationController.delete);

export default router;
