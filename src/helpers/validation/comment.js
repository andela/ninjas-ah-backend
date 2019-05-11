import Joi from '@hapi/joi';
import commentErrors from './commentErrors';

export default (comment) => {
  const schema = {
    body: Joi.string()
      .min(3)
      .required()
      .error(commentErrors),
    userId: Joi.number()
      .integer()
      .min(1)
      .error(commentErrors)
  };

  return Joi.validate(comment, schema);
};
