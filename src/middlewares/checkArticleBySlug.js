import status from '../config/status';
import { Article } from '../queries';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  const response = await Article.get({ slug: req.params.slug });
  if (!response) {
    return res.status(status.NOT_FOUND).send({
      error: 'No article found'
    });
  }
  req.article = response.get();
  next();
};
