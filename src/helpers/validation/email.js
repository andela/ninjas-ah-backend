/**
 * @param {string} input
 * @param {string} required
 * @returns {array} an array of errors or an empty array if no error
 */
export default (input, required = '') => {
  if (!input && !required) {
    return [];
  }

  let errors = [];
  const re = /[A-Z0-9]+@[A-Z0-9-]+\.[A-Z]{2,4}/gim;
  const reUsername = /[\\ ,;:"!#$%&'*+/=?^`{|}~([\])]/g;
  const reDomainSLD = /[ \\,;:"!#$%&'*+/=?^`{|}~([\])]/g;
  const reDomainTLD = /[\d+ \\,;:"!#$%&'*+-/=?^_`{|}~([\])]/g;

  const emailUsername = input.substring(0, input.lastIndexOf('@'));
  const emailDomainSLD = input.substring(input.lastIndexOf('@') + 1, input.lastIndexOf('.'));
  const emailDomainTLD = input.substring(input.lastIndexOf('.') + 1);

  const isEmailUsername = !emailUsername.match(/^[0-9]/) && !reUsername.test(emailUsername);
  const isEmailDomainSLD = !emailDomainSLD.match(/^[0-9]/) && !reDomainSLD.test(emailDomainSLD);
  const isEmailDomainTLD = !emailDomainTLD.match(/^[0-9]/) && !reDomainTLD.test(emailDomainTLD);

  if (re.test(input) && isEmailUsername && isEmailDomainSLD && isEmailDomainTLD) {
    return [];
  }

  errors = [...errors, 'Please provide a valid email address'];

  return errors;
};
