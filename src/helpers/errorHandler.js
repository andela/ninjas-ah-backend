import status from '../config/status';

/**
 * Author: Gilles Kagarama
 * Joi error logger
 */
class Error {
  /**
   * Joi error logger
   * @param {object} res response
   * @param {object} result Results passed
   * @returns {object} Object representing the response returned
   */
  static joiErrorHandler(res, result) {
    const errorArray = [];
    result.error.details.forEach((value) => {
      errorArray.push(value.message.replace(/"/g, ''));
    });
    return res.status(status.BAD_REQUEST).send({
      errors: errorArray
    });
  }
}

export default Error;
