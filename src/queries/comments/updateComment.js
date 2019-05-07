import db from '../../models';
/**
 * class used to update one comment
 */
export default class UpdateComment {
  /**
   * @param {object} condition1
   * @param {object} condition
   * @returns {object} object that contains information used to update only one comment
   */
  static async update(condition1 = {}, condition = {}) {
    const comment = await db.Comment.update(condition1, {
      where: condition
    });
    return comment;
  }
}
