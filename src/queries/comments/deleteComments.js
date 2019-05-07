import db from '../../models';
/**
 * class that is used to delete a comment
 */
export default class DeleteComment {
  /**
   * Delete one comment
   * @param {object} condition
   * @returns {object} object that contains information used delete one comment
   */
  static async delete(condition = {}) {
    const comment = await db.Comment.destroy({ where: condition });
    return comment;
  }
}
