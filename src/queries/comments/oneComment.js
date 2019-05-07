import db from '../../models';
/**
 * class used to get only one comment
 */
export default class GetOne {
  /**
   * @param {object} condition
   * @returns {object} return an object that contain information used to get only one comment
   */
  static async getOne(condition = {}) {
    const comment = await db.Comment.findOne({
      where: condition
    });
    return comment;
  }
}
