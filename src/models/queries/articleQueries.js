import db from '../index';

/**
 * @param {object} condition
 * @returns {object} an object containing the information of the user or null
 */
export default class ArticleQueries {
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async oneArticle(condition = {}) {
    const article = await db.Article.findOne({
      where: condition
    });
    return article;
  }
}
