import db from '../../models';
/**
 * class that is used to delete a comment
 */
export default class DeleteComment {
  /**
   * @param {object} condition
   * @returns {object} return an object that contain information used delete one comment
   */
  static async delete(condition = {}) {
    const comment = await db.Comment.destroy({ where: condition });
    return comment;
  }
}
