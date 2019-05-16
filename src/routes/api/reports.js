import { Router } from 'express';
import checkArticle from '../../middlewares/checkArticle';
import checkReport from '../../middlewares/checkReport';
import ReportArticleController from '../../controllers/ReportArticleController';
import validateReport from '../../middlewares/validateReport';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router.post(
  '/:articleSlug/report',
  validateReport,
  checkArticle,
  checkReport,
  asyncHandler(ReportArticleController.create)
);
router.get('/:articleSlug/report', checkArticle, asyncHandler(ReportArticleController.getAll));
router.get(
  '/:articleSlug/report/:id',
  checkArticle,
  asyncHandler(ReportArticleController.getSingle)
);

router.delete(
  '/:articleSlug/report/:id',
  checkArticle,
  asyncHandler(ReportArticleController.deleteReport)
);

export default router;
