import status from '../config/status';
import * as report from '../queries/reports';
/**
 * A class to control the report
 */
export default class ReportController {
  /**
   * A method to create a report
   * @param {object} req the request
   * @param {object } res the response
   * @returns {object} a response to the client
   */
  static async createReport(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const { title, body, type } = req.body;
    const newReport = await report.create({
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

  /**
   * A method to get all reports for a specific article
   * @param {object} req the request
   * @param {object } res the response
   * @returns {object} a response to the client
   */
  static async getAll(req, res) {
    const findAllReport = await report.getAll({ articleSlug: req.params.articleSlug });
    return res.status(status.OK).json({
      message: 'fetched all reports successfully',
      Reports: findAllReport
    });
  }

  /**
   * A method to get a single report
   * @param {object} req the request
   * @param {object } res the response
   * @returns {object} a response to the client
   */
  static async getSingle(req, res) {
    const { articleSlug, reportId } = req.params;
    const newreport = { articleSlug, id: reportId };
    const findSingle = await report.getSingle(newreport);
    return res
      .status(status.OK)
      .json({ message: 'Report fetched Successfully', Report: findSingle });
  }

  /**
   * A method to delete a report
   * @param {object} req the request
   * @param {object } res the response
   * @returns {object} a response to the client
   */
  static async deleteSingle(req, res) {
    const { articleSlug, reportId } = req.params;
    const deleteSingle = await report.remove({ articleSlug, id: reportId });
    return res
      .status(status.OK)
      .json({ message: 'Report deleted Successfully', Report: deleteSingle });
  }
}
