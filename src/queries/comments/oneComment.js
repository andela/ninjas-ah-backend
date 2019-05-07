import db from '../../models';
/**
 * a Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class GetOne {
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async getOne(condition = {}) {
    const comment = await db.Comment.findOne({
      where: condition
    });
    return comment;
  }
}
