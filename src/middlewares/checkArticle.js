import status from '../config/status';
import db from '../models';
/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next Allow app to continue
 * @returns {object} Object representing the response returned
 */
export default async (req, res, next) => {
  const response = await db.Article.findOne({ where: { slug: req.params.slug }, logging: false });
  if (!response) {
    return res.status(status.NOT_FOUND).send({
      error: 'No article found'
    });
  }
  next();
};
