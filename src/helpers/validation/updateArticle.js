import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    description: Joi.string()
      .min(5)
      .max(255)
      .required(),
    body: Joi.string()
      .min(5)
      .required(),
    tagList: Joi.array()
      .min(2)
      .max(255)
      .optional(),
    status: Joi.string()
      .min(3)
      .max(255)
      .optional(),
    coverUrl: Joi.string()
      .min(5)
      .max(255)
      .optional(),
    readTime: Joi.number()
      .integer()
      .required()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
