// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param {object} error
 */
function commentErrors(error) {
  error.forEach((err) => {
    switch (err.type) {
      case 'any.empty':
        err.message = 'Please enter your comment';
        break;
      case 'string.min':
        err.message = ' Your comment should have at least 3 characters!';
        break;
      default:
        break;
    }
  });
  return error;
}
export default commentErrors;
