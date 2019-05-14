import status from '../config/status';
import db from '../models';
import getAllLikes from '../queries/articles/getAllLikes';
import getSingleLike from '../queries/articles/getSinglelike';
import createLike from '../queries/articles/createLike';
/**
 * A class to control the Article likes
 */
export default class ArticleLikeController {
  /**
   * A method to create an article like
   * @param {object} req the request to get like
   * @param {object} res the response of like from server
   * @returns {object} the return after liking a particular article
   */
  static async create(req, res) {
    const userId = req.params.userId || req.userId || 10;
    const findLike = await getSingleLike({ userId, articleSlug: req.params.articleSlug });
    const findAllArticleLike = await getAllLikes({
      articleSlug: req.params.articleSlug
    });
    if (!findLike) {
      const newArticleLike = await createLike({
        userId,
        articleSlug: req.params.articleSlug
      });
      const condition = { likes: findAllArticleLike.length + 1 };
      const where = { slug: req.params.articleSlug };
      await db.Article.update(condition, { where });
      return res.status(status.CREATED).send({
        message: 'You liked the article successfully',
        like: newArticleLike
      });
    }
  }
}
