import Joi from 'joi';
import Error from '../../helpers/errorHandler';
import * as validate from '../../helpers/validation';

/**
 * Author: Gilles Kagarama
 * @returns {object} Object representing the response returned
 */
class articles {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static create(req, res, next) {
    const result = validate.createArticle(req.body);
    if (result.error) {
      return Error.joiErrorHandler(res, result);
    }
    next();
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static update(req, res, next) {
    const response = validate.updateArticle(req.body);
    return !response.error ? next() : Error.joiErrorHandler(res, response);
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next Log errors
   * @returns {object} Object representing the response returned
   */
  static slug(req, res, next) {
    const schema = Joi.object().keys({
      slug: Joi.string()
        .min(16)
        .max(85)
        .required()
    });
    const result = Joi.validate(req.params, schema, { abortEarly: false });
    if (!result.error) {
      return next();
    }
    return Error.joiErrorHandler(res, result);
  }
}

export default articles;
