import db from '../../models';
/**
 * class that is used to create one comment
 */
export default class Create {
  /**
   * @param {object} condition
   * @returns {object} object that contains information used to create a comment
   */
  static async create(condition = {}) {
    const comment = await db.Comment.create(condition);
    return comment;
  }
}
