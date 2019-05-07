import db from '../../models';
/**
 * class that is used to create one comment
 */
export default class Create {
  /**
   * @param {object} createCondition createCondition to create one comment needed
   * @returns {object} object that contains information used to create a comment
   */
  static async create(createCondition = {}) {
    const comment = await db.Comment.create(createCondition);
    return comment;
  }
}
