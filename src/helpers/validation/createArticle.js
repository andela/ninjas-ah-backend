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
    coverUrl: Joi.string()
      .min(5)
      .max(255)
      .optional(),
    tagList: Joi.array()
      .min(2)
      .max(255)
      .optional(),
    userId: Joi.number().optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
