import db from '../../models';
/**
 * class that is used to delete a comment
 */
export default class DeleteComment {
  /**
   * Delete one comment
   * @param {object} deleteCondition deleteCondition to delete one comment needed
   * @returns {object} object that contains information used delete one comment
   */
  static async delete(deleteCondition = {}) {
    const comment = await db.Comment.destroy({ where: deleteCondition });
    return comment;
  }
}
