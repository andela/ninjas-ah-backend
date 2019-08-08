import Joi from '@hapi/joi';

export default (report) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(2)
      .max(100)
      .required(),
    body: Joi.string()
      .min(2)
      .max(300)
      .required(),
    type: Joi.array().items(Joi.string().required())
  });

  return Joi.validate(report, schema, { abortEarly: false });
};
