import db from '../../models';
/**
 * a commentQueries that contain all the queries that can be needed to manupilate the comment models
 */
export default class DeleteComment {
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async delete(condition = {}) {
    const comment = await db.Comment.destroy({ where: condition });
    return comment;
  }
}
