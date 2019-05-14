import status from '../config/status';
import getAllDislikes from '../queries/articles/getAllDislikes';
import getSingleDislike from '../queries/articles/getSingleDislike';
import db from '../models';

// eslint-disable-next-line valid-jsdoc
/**
 * The middleware to check if the article dislike already exists
 * @param {object} req the request
 * @param { object} res the response
 * @param { function } next the function to allow the following
 */
export default async function checkArticleDislike(req, res, next) {
  const userId = req.params.userId || req.userId || 9;
  const findDislike = await getSingleDislike({ userId, articleSlug: req.params.articleSlug });
  const findAllArticleDislike = await getAllDislikes({
    articleSlug: req.params.articleSlug
  });
  if (findDislike) {
    await db.Article.update(
      { dislikes: findAllArticleDislike.length - 1 },
      {
        where: {
          slug: req.params.articleSlug
        }
      }
    );
    res.status(status.BAD_REQUEST).send({
      message: 'You already disliked the article, so you removed your dislike'
    });
  }
  next();
}
