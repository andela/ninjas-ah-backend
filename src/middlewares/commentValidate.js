import validate from '../helpers/commentValidate';
// eslint-disable-next-line valid-jsdoc
/**
 * @param { object } req the request
 * @param { object } res the respond
 * @param { function } next the
 */
export default function Validation(req, res, next) {
  const { error } = validate.validateComment(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      message: error.details[0].message
    });
  }
  next();
}
