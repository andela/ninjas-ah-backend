import db from '../../models';
/**
 * a Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class Getall {
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async getAll(condition = {}) {
    const comment = await db.Comment.findAll({
      where: condition
    });
    return comment;
  }
}
