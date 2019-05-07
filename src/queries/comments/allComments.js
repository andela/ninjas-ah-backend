import db from '../../models';
/**
 * a Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class Getall {
  /**
   * @param {object} condition
   * @returns {object} an object containing information used to get all comments from database or null
   */
  static async getAll(condition = {}) {
    const comment = await db.Comment.findAll({
      where: condition
    });
    return comment;
  }
}
