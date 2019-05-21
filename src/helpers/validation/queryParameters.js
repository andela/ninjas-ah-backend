import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    limit: Joi.number()
      .integer()
      .min(1)
      .optional(),
    offset: Joi.number()
      .integer()
      .min(0)
      .optional(),
    keyword: Joi.string()
      .min(1)
      .max(30)
      .optional(),
    author: Joi.string()
      .min(2)
      .max(50)
      .optional(),
    tag: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .label('Tag')
      .min(2)
      .max(60)
      .optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
