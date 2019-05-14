import status from '../config/status';
import db from '../models';
import { dbUpdate } from '../helpers/queryHelper';

/**
 * A class to control the Article dislikes
 */
class ArticleDislikeController {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req  the request from a client
   * @param { res } res the response from a server
   */
  static async dislike(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const condition = { userId, articleSlug };
    const findDislike = await db.ArticleDislike.findOne(condition);
    if (findDislike) {
      return res.status(status.BAD_REQUEST).json({
        errors: { message: 'You already liked the article, unless you want to unlike' }
      });
    }
    const findLike = await db.ArticleLike.findOne({ where: condition });
    if (findLike) {
      await db.ArticleLike.destroy({ where: condition });
      const findAllLikes = await db.ArticleLike.findAll({ articleSlug });
      await dbUpdate(db.Article, { likes: findAllLikes.length }, { slug: articleSlug });
    }
    await db.ArticleDislike.create(condition);
    const findAll = await db.ArticleDislike.findAll({ articleSlug });

    await db.Article.update({ dislikes: findAll.length }, { where: { slug: articleSlug } });
    return res.status(status.CREATED).json({ message: 'You disliked the article' });
  }

  /**
   * A method to create an article like
   * @param {object} req the request to get like
   * @param {object} res the response of like from server
   * @returns {object} the return after liking a particular article
   */
  static async undislike(req, res) {
    const userId = req.user.id;
    const { articleSlug } = req.params;
    const condition = { userId, articleSlug };
    const findDislike = await db.ArticleDislike.findOne(condition);
    if (!findDislike) {
      return res.status(status.BAD_REQUEST).json({
        errors: { message: 'You did not dislike the article yet' }
      });
    }
    await db.ArticleDislike.destroy({ where: condition });
    const findAll = await db.ArticleDislike.findAll({ articleSlug });

    await dbUpdate(db.Article, { dislikes: findAll.length }, { slug: articleSlug });
    return res.status(status.CREATED).json({ message: 'You removed your dislike on the article' });
  }
}
export default ArticleDislikeController;
