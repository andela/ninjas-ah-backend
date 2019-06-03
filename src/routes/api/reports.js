import { Router } from 'express';
import ReportController from '../../controllers/ReportController';
import checkArticle from '../../middlewares/checkArticle';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import { checkUserReport, checkReportExist, validateReport } from '../../middlewares/checkReport';

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
