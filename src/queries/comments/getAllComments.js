import db from '../../models';
/**
 * Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class Getall {
  /**
   * Get all comments.
   * @param {objet} condition The first number.
   * @returns {int} The sum of the two numbers.
   */
  static async getAll(condition = {}) {
    const comment = await db.Comment.findAll({
      where: condition
    });
    return comment;
  }
}
