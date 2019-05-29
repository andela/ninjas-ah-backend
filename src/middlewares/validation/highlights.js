import Error from '../../helpers/errorHandler';
import * as validate from '../../helpers';

/**
 * A class to handle highlights on articles
 */
class highlights {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static create(req, res, next) {
    const result = validate.validation.createHighlight(req.body);
    return result.error ? Error.joiErrorHandler(res, result) : next();
  }
}

export default highlights;
