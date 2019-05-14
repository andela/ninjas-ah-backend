import status from '../config/status';
import db from '../models';
import { dbFindSingle, dbUpdate, dbFindAll } from '../helpers/queryHelper';

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
  static async like(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const condition = { userId, articleSlug };
    const findLike = await dbFindSingle(db.ArticleLike, condition);
    if (findLike) {
      return res.status(status.BAD_REQUEST).json({
        errors: { message: 'You already liked the article, unless you want to unlike' }
      });
    }

    const findDislike = await db.ArticleDislike.findOne({ where: condition });
    if (findDislike) {
      await db.ArticleDislike.destroy({ where: condition });
      const findAll = await dbFindAll(db.ArticleDislike, { articleSlug });
      await dbUpdate(db.Article, { dislikes: findAll.length }, { slug: articleSlug });
    }

    await db.ArticleLike.create(condition);
    const findAllLikes = await db.ArticleLike.findAll({ articleSlug });
    await dbUpdate(db.Article, { likes: findAllLikes.length }, { slug: articleSlug });
    return res.status(status.CREATED).json({ message: 'You liked the article' });
  }

  /**
   * A method to create an article like
   * @param {object} req the request to get like
   * @param {object} res the response of like from server
   * @returns {object} the return after liking a particular article
   */
  static async unlike(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const like = { userId, articleSlug };
    const findLike = await dbFindSingle(db.ArticleLike, like);
    if (!findLike) {
      return res.status(status.BAD_REQUEST).json({
        errors: { message: 'You did not like the article yet' }
      });
    }
    await db.ArticleLike.destroy({ where: like });
    const findAllLikes = await db.ArticleLike.findAll({ articleSlug });

    await dbUpdate(db.Article, { likes: findAllLikes.length }, { slug: articleSlug });
    return res.status(status.CREATED).json({
      message: 'You unliked the article'
    });
  }
}
