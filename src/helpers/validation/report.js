import Joi from '@hapi/joi';

export default (report) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    type: Joi.array().items(Joi.string().required())
  });

  return Joi.validate(report, schema);
};
