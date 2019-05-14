import status from '../config/status';
import * as report from '../queries/reports';
/**
 * A class to control the report
 */
export default class ReportController {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object } res the response
   */
  static async createReport(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const { title, body, type } = req.body;
    const newReport = await report.createReport({
      userId,
      articleSlug,
      title,
      body,
      type
    });
    res.status(status.CREATED).json({
      message: 'Report created successfully',
      Report: newReport
    });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object } res the response
   */
  static async getAll(req, res) {
    const { articleSlug } = req.params;
    const findAllReport = await report.getAllReports({ articleSlug });
    return res
      .status(status.OK)
      .json({ message: 'fetched all reports successfully', Reports: findAllReport });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object } res the response
   */
  static async getSingle(req, res) {
    const { articleSlug, reportId } = req.params;
    const newreport = { articleSlug, id: reportId };
    const findSingle = await report.getSingleReport(newreport);
    return res
      .status(status.OK)
      .json({ message: 'Report fetched Successfully', Report: findSingle });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req the request
   * @param {object } res the response
   */
  static async deleteSingle(req, res) {
    const { articleSlug, reportId } = req.params;
    const deleteSingle = await report.deleteReport({ articleSlug, id: reportId });
    return res
      .status(status.OK)
      .json({ message: 'Report deleted Successfully', Report: deleteSingle });
  }
}
