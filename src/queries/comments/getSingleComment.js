import db from '../../models';
/**
 * class used to get only one comment
 */
export default class GetOne {
  /**
   * Get one comment
   * @param {object} getOneCondition getOneCondition to fetch one comment needed
   * @returns {object} object that contains information used to get only one comment
   */
  static async getOne(getOneCondition = {}) {
    const comment = await db.Comment.findOne({
      where: getOneCondition
    });
    return comment;
  }
}
