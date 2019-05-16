export default (errors) => {
  errors.forEach((err) => {
    switch (err.type) {
      case 'any.empty':
        err.message = 'Please enter the title of your report, it should not be empty';
        break;
      case 'string.min':
        err.message = ' Minimum number of characters should not be less than 3';
        break;
      default:
        break;
    }
  });
  return errors;
};
