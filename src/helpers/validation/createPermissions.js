import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    userType: Joi.string()
      .min(5)
      .max(6)
      .required(),
    permissions: Joi.object({
      articles: Joi.array().required(),
      comments: Joi.array().required(),
      tags: Joi.array().required(),
      users: Joi.array().required()
    }).required()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
