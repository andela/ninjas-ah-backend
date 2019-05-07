/* eslint-disable require-jsdoc */
import Joi from 'joi';
import commentErrors from './commentErrors';

export default (comment) => {
  const schema = {
    body: Joi.string()
      .min(3)
      .required()
      .error(commentErrors)
  };

  return Joi.validate(comment, schema);
};
