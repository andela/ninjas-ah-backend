/**
 * @param {string} input
 * @param {string} required
 * @returns {array} an array of errors or an empty array if no error
 */
export default (input, required = '') => {
  let errors = [];

  if (!input && !required) {
    return [];
  }
  if (
    input.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/)
    && input.match(/[ \\,;:"!#$@*%&'+-/=?^_`{|}~]/)
  ) {
    return [];
  }

  errors = [
    ...errors,
    'Your password should have a minimum 8 and maximum of 25 characters, it must include at least one upper case letter, one lower case letter, one numeric digit and one special character (*&^!%$@#)'
  ];

  return errors;
};
