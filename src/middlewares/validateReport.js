import report from '../helpers/validation/report';
// eslint-disable-next-line valid-jsdoc
/**
 * @param { object } req the request
 * @param { object } res the respond
 * @param { function } next
 */
export default function validateReport(req, res, next) {
  const { error } = report(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      message: error.details[0].message
    });
  }
  next();
}
