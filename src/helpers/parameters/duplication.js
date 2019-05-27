/**
 * @param {string} query queries to be evaluated
 * @param {string} required
 * @returns {array} an array of errors or an empty array if no error
 */
export default (query) => {
  const { limit, offset } = query;
  const errors = {};
  if (Array.isArray(limit)) {
    errors.limit = 'Limit can not be declared more than once';
  }
  if (Array.isArray(offset)) {
    errors.offset = 'Offset can not be declared more than once';
  }
  return errors;
};
