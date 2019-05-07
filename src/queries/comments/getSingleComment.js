import db from '../../models';
/**
 * class used to get only one comment
 */
export default class GetOne {
  /**
   * Get one comment
   * @param {object} condition
   * @returns {object} object that contains information used to get only one comment
   */
  static async getOne(condition = {}) {
    const comment = await db.Comment.findOne({
      where: condition
    });
    return comment;
  }
}
