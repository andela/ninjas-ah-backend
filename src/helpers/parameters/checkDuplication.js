/**
 * @param {string} query queries to be evaluated
 * @param {string} required
 * @returns {array} an array of errors or an empty array if no error
 */
export default (query) => {
  const errors = {};
  Object.keys(query).forEach((key) => {
    if (Array.isArray(query[key])) {
      errors[key] = `${key} can not be declared more than once`;
    }
  });

  return errors;
};
