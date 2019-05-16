// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param {object} errors errors from Joi
 */
export default function reportBodyErrorResponse(errors) {
  errors.forEach((err) => {
    switch (err.type) {
      case 'any.empty':
        err.message = 'Please enter the report, it should not be empty';
        break;
      case 'string.min':
        err.message = ' Minimum number of characters should not be less than 5';
        break;
      default:
        break;
    }
  });
  return errors;
}
