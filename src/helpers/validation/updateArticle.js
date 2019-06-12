import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(5)
      .max(255)
      .optional(),
    description: Joi.string()
      .min(5)
      .max(255)
      .optional(),
    body: Joi.string()
      .min(5)
      .optional(),
    coverUrl: Joi.string()
      .min(5)
      .max(255)
      .optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
