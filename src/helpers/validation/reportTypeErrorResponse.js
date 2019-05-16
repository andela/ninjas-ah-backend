export default (errors) => {
  errors.forEach((err) => {
    switch (err.type) {
      case 'string.min':
        err.message = ' Minimum number of characters should not be less than 3';
        break;
      default:
        break;
    }
  });
  return errors;
};
