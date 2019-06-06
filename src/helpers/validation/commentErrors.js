export default (errors) => {
  errors.forEach((err) => {
    switch (err.type) {
      case 'any.empty':
        err.message = " Comment can't be empty";
        break;
      case 'string.min':
        err.message = ' Your comment should have at least 3 characters!';
        break;
      default:
        break;
    }
  });
  return errors;
};
