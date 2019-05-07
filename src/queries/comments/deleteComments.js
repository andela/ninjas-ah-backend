import db from '../../models';
/**
 * class that is used to delete a comment
 */
export default class DeleteComment {
  /**
   * @param {object} deleteCondition deleteCondition to delete one comment needed
   * @returns {object} return response
   */
  static async delete(deleteCondition = {}) {
    const comment = await db.Comment.destroy({ where: deleteCondition });
    return comment;
  }
}
