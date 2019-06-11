import Joi from '@hapi/joi';

export default (slug) => {
  const schema = Joi.object().keys({
    slug: Joi.string()
      .min(16)
      .max(85)
      .required()
  });

  return Joi.validate(slug, schema, { abortEarly: false });
};
