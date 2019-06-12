import { Router } from 'express';
import ReportController from '../../controllers/ReportController';
import checkArticle from '../../middlewares/checkArticle';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import { checkUserReport, checkReportExist, validateReport } from '../../middlewares/checkReport';
import checkPermissions from '../../middlewares/checkPermissions';

const router = Router();

router.post(
  '/:articleSlug/report',
  verifyToken,
  checkArticle,
  validateReport,
  checkUserReport,
  asyncHandler(ReportController.createReport)
);
router.get(
  '/:articleSlug/report',
  verifyToken,
  checkPermissions({
    route: 'articles',
    action: 'read'
  }),
  checkArticle,
  asyncHandler(ReportController.getAll)
);
router.get(
  '/:articleSlug/report/:reportId',
  verifyToken,
  checkArticle,
  checkReportExist,
  asyncHandler(ReportController.getSingle)
);
router.delete(
  '/:articleSlug/report/:reportId',
  verifyToken,
  checkArticle,
  checkReportExist,
  asyncHandler(ReportController.deleteSingle)
);

export default router;
