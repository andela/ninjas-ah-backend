import db from '../../models';
/**
 * Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class Getall {
  /**
   * @param {object} condition
   * @returns {object} object that contains information used to get all comments
   */
  static async getAll(condition = {}) {
    const comment = await db.Comment.findAll({
      where: condition
    });
    return comment;
  }
}
