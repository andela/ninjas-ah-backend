
import db from '../index';
/**
 * a user class that handles all user queries to the db
 */
export default class CommentQueries {
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async allComments(condition = {}) {
    const comment = await db.Comment.findAll({
      where: condition
    });
    return comment;
  }
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async allComments(condition = {}) {
    const comment = await db.Comment.findAll({
      where: condition
    });
    return comment;
  }
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async createComment(condition = {}) {
    const comment = await db.Comment.create(condition);
    return comment;
  }
  /**
   * @param {object} condition1
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async updateComment(condition1 = {}, condition = {}) {
    const comment = await db.Comment.update(condition1, {
      where: condition
    });
    return comment;
  }
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async deleteComment(condition = {}) {
    const comment = await db.Comment.destroy({ where: condition });
    return comment;
  }
}
