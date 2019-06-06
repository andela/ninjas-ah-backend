import status from '../config/status';
import * as report from '../queries/reports';
import * as validate from '../helpers/validation';
import Error from '../helpers/errorHandler';

const validateReport = (req, res, next) => {
  const result = validate.report(req.body);
  if (result.error) {
    return Error.joiErrorHandler(res, result);
  }
  next();
};
const checkUserReport = async (req, res, next) => {
  const userId = req.user.id;
  const { articleSlug } = req.params;
  const newreport = { userId, articleSlug };
  const findReport = await report.getSingle(newreport);
  if (findReport) {
    return res.status(status.OK).json({ message: 'You already reported the article' });
  }
  next();
};
const checkReportExist = async (req, res, next) => {
  const { articleSlug, reportId } = req.params;
  const newreport = { id: reportId, articleSlug };
  const findReport = await report.getSingle(newreport);
  if (!findReport) {
    return res.status(status.BAD_REQUEST).json({ message: 'The report does not exist' });
  }
  next();
};

export { checkUserReport, checkReportExist, validateReport };
