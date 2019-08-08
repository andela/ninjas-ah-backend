import Error from '../../helpers/errorHandler';
import * as validate from '../../helpers/validation';

/**
 * @param {object} req Request sent to the route
 * @param {object} res Response from server
 * @param {object} next If no error continue
 * @returns {object} Object representing the response returned
 */
export default (req, res, next) => {
  const result = validate.createPermissions(req.body);
  return (result.error && Error.joiErrorHandler(res, result)) || next();
};
