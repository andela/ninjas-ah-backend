import db from '../../models';
/**
 * Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class Getall {
  /**
   * Get all comments.
   * @param {objet} getAllCondition getAllCondition to find comments needed.
   * @returns { object} object that contains information to get all comments .
   */
  static async getAll(getAllCondition = {}) {
    const comment = await db.Comment.findAll({
      where: getAllCondition
    });
    return comment;
  }
}
