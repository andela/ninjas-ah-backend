/**
 * @param {string} input
 * @param {string} required
 * @param {string} label
 * @returns {boolean|string} true if the name is valid otherwise returns an error message
 */
export default (input, required = '', label) => {
  const re = /[A-Z]{2,4}/gim;
  const reName = /[0-9\\ ,;:"!#$%&'*+/=?^`{|}~([\])]/g;

  return (
    (!input && !required)
    || (re.test(input) && !reName.test(input))
    || (label && `Please provide a valid ${label}, it should only contain alphabetic characters`)
    || 'Please provide a valid name, it should only contain alphabetic characters'
  );
};
