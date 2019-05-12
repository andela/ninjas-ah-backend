import Joi from 'joi';
import Error from '../../helpers/errorHandler';

/**
 * Author: Gilles Kagarama
 * @returns {object} Object representing the response returned
 */
class articles {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next Log errors
   * @returns {object} Object representing the response returned
   */
  static tags(req, res, next) {
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
