import { Router } from 'express';
import NotificationController from '../../controllers/NotificationController';
import verifyToken from '../../middlewares/verifyToken';
import validateNotificationConfig from '../../middlewares/validateNotificationConfig';
import checkUpdateNotification from '../../middlewares/checkUpdateNotification';

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
router.put('/seen', verifyToken, checkUpdateNotification, NotificationController.update);
router.put('/unseen', verifyToken, checkUpdateNotification, NotificationController.update);
router.put('/:notificationId', verifyToken, checkUpdateNotification, NotificationController.update);
router.put(
  '/:notificationId/seen',
  verifyToken,
  checkUpdateNotification,
  NotificationController.update
);
router.put(
  '/:notificationId/unseen',
  verifyToken,
  checkUpdateNotification,
  NotificationController.update
);
router.delete('/:notificationId', verifyToken, NotificationController.delete);

export default router;
