import status from '../config/status';
import db from '../models';
import getSingleDislike from '../queries/articles/getSingleDislike';
import getAllDislikes from '../queries/articles/getAllDislikes';
import createDislike from '../queries/articles/createDislike';
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
  static async create(req, res) {
    const userId = req.params.userId || req.userId || 9;
    const findDislike = await getSingleDislike({ userId, articleSlug: req.params.articleSlug });

    if (!findDislike) {
      const newArticleDislike = await createDislike({
        userId,
        articleSlug: req.params.articleSlug
      });
      const findAllArticleDislike = await getAllDislikes({
        articleSlug: req.params.articleSlug
      });
      const where = { slug: req.params.articleSlug };
      await db.Article.update({ dislikes: findAllArticleDislike.length + 1 }, { where });

      return res.status(status.CREATED).send({
        message: 'You disliked the article successfully',
        dislike: newArticleDislike
      });
    }
  }
}
export default ArticleDislikeController;
