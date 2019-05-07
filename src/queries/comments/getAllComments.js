import db from '../../models';
/**
 * Getall that contain all the queries that can be needed to manupilate the comment models
 */
export default class Getall {
  /**
   * Get all comments.
   * @param {objet} articleId Article Id to find comments needed.
   * @returns { object} object that contains information to get all comments .
   */
  static async getAll(articleId = {}) {
    const comment = await db.Comment.findAll({
      where: articleId
    });
    return comment;
  }
}
