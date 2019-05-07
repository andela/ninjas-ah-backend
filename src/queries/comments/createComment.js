import db from '../../models';
/**
 * class that is used to create one comment
 */
export default class Create {
  /**
   * @param {object} data data to Create a comment
   * @returns {object} object that contains information used to create a comment
   */
  static async create(data = {}) {
    const comment = await db.Comment.create(data);
    return comment;
  }
}
