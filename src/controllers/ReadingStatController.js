import { getAllRatings, createRatings } from '../queries';
import status from '../config/status';

/**
 * A class to handle Reading Stats for users
 */
export default class ReadingStat {
  /**
   * Save reading stats
   * @param {object} req
   * @param {object} res
   * @returns {object} stats object
   */
  static async create(req, res) {
    const userId = req.user.id;
    const { slug } = req.params;

    const saveStat = await createRatings({
      userId,
      articleSlug: slug
    });

    return res.status(status.OK).json({
      saveStat
    });
  }

  /**
   *  Get reading stats
   * @param {Object} req express request
   * @param {Object} res express response
   * @returns {Array} user reading statistics
   */
  static async getAll(req, res) {
    const userId = req.user.id;

    const readingStats = await getAllRatings({
      userId
    });

    return res.status(status.OK).json({
      message: 'Reading Stats fetched',
      readingStats
    });
  }
}
