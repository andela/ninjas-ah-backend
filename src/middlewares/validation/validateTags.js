import Joi from 'joi';
import Error from '../../helpers/errorHandler';

/**
 * Author: Gilles Kagarama
 * @returns {object} Object representing the response returned
 */
class tags {
  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @param {object} next If no error continue
   * @returns {object} Object representing the response returned
   */
  static create(req, res, next) {
    const schema = Joi.object().keys({
      tagList: Joi.array()
        .min(1)
        .max(5)
        .required()
    });
    const result = Joi.validate(req.body, schema, { abortEarly: false });
    if (!result.error) {
      return next();
    }
    return Error.joiErrorHandler(res, result);
  }
}

export default tags;
