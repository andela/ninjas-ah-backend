import status from '../config/status';
import getAllLikes from '../queries/articles/getAllLikes';
import getSingleLike from '../queries/articles/getSinglelike';
import db from '../models';

// eslint-disable-next-line valid-jsdoc
/**
 * The middleware to check if the article like already exists
 * @param {object} req the request
 * @param { object} res the response
 * @param { function } next the function to allow the following
 */
export default async function checkArticleLike(req, res, next) {
  const userId = req.params.userId || req.userId || 10;
  const findAllArticleLike = await getAllLikes({
    articleSlug: req.params.articleSlug
  });
  const findLike = await getSingleLike({ userId, articleSlug: req.params.articleSlug });
  if (findLike) {
    const condition = { likes: findAllArticleLike.length - 1 };
    await db.Article.update(condition, {
      where: {
        slug: req.params.articleSlug
      }
    });

    res.status(status.BAD_REQUEST).send({
      message: 'You already liked the article, so you remove the like'
    });
  }
  next();
}
