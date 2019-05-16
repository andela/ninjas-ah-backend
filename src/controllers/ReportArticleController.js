import status from '../config/status';
import createReport from '../queries/reports/createReport';
import getAllReports from '../queries/reports/getAllReports';
import getSingleReport from '../queries/reports/getSingleReport';
import deleteReport from '../queries/reports/deleteReport';

/**
 * The class to control the report of article
 */
export default class ReportArticleController {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object} res the response
   */
  static async create(req, res) {
    const userId = req.userId || req.body.userId || req.params.userId || null;
    const { reportBody, reportTitle, type } = req.body;
    const { articleSlug } = req.params;
    const newReport = {
      userId,
      articleSlug,
      reportTitle,
      reportBody,
      type
    };
    const createdReport = await createReport(newReport);

    return res.status(status.CREATED).send({
      Report: createdReport
    });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object} res the response
   */
  static async getAll(req, res) {
    const findAllReports = await getAllReports({
      articleSlug: req.params.articleSlug
    });
    if (findAllReports.length === 0) {
      return res.status(status.NOT_FOUND).send({
        message: 'No report for the specific article'
      });
    }
    return res.status(status.OK).send({
      message: `The article has been reported buy ${findAllReports.length} users`,
      Reports: findAllReports
    });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object} res the response
   */
  static async getSingle(req, res) {
    const findOneReport = await getSingleReport({
      articleSlug: req.params.articleSlug,
      id: req.params.id
    });
    if (!findOneReport) {
      return res.status(status.NOT_FOUND).send({
        message: 'Such report does not exist'
      });
    }
    return res.status(status.OK).send({
      message: 'The article report has been fetched successfully',
      Reports: findOneReport
    });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object} res the response
   */
  static async deleteReport(req, res) {
    const findOneReport = await getSingleReport({
      articleSlug: req.params.articleSlug,
      id: req.params.id
    });
    if (!findOneReport) {
      return res.status(status.NOT_FOUND).send({
        message: 'Such report does not exist'
      });
    }
    await deleteReport({
      articleSlug: req.params.articleSlug,
      id: req.params.id
    });
    return res.status(status.OK).send({
      message: 'You deleted the report successfully',
      Reports: findOneReport
    });
  }
}
