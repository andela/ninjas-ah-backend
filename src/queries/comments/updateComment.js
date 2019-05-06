import db from '../../models';
/**
 * a commentQueries that contain all the queries that can be needed to manupilate the comment models
 */
export default class UpdateComment {
  /**
   * @param {object} condition1
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async update(condition1 = {}, condition = {}) {
    const comment = await db.Comment.update(condition1, {
      where: condition
    });
    return comment;
  }
}
