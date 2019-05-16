import getSingleReport from '../queries/reports/getSingleReport';
import status from '../config/status';
// eslint-disable-next-line valid-jsdoc
/**
 *The  middleware to check if the report from a specific user exist
 * @param {object} req  the request
 * @param {object} res the response
 * @param { object} next the function
 */
export default async function checkReport(req, res, next) {
  const userId = req.userId || req.body.userId || req.params.userId || null;
  const condition = {
    userId,
    articleSlug: req.params.articleSlug
  };
  const findReport = await getSingleReport(condition);

  if (findReport) {
    return res.status(status.BAD_REQUEST).send({
      message: 'You already reported the article, unless you want to edit your report'
    });
  }
  next();
}
