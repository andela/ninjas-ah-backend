import commentValidate from '../helpers/validation/comment';
// eslint-disable-next-line valid-jsdoc
/**
 * @param { object } req the request
 * @param { object } res the respond
 * @param { function } next
 */
export default function Validation(req, res, next) {
  const { error } = commentValidate(req.body);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message
    });
  }
  next();
}
