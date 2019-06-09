import status from '../../config/status';

/**
 * Validate rating
 */
class rating {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static create(req, res, next) {
    const errors = {};
    if (req.body && typeof req.body.rating !== 'number') errors.rating = 'rating must be a number';
    if (req.body.rating < 1 || req.body.rating > 5) errors.rating = 'rating must be between 1 and 5';
    if (errors.rating) return res.status(status.BAD_REQUEST).json({ errors });
    next();
  }
}

export default rating;
