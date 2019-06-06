import Joi from 'joi';

export default (input) => {
  const configBody = () => Joi.object()
    .keys({
      articles: Joi.object()
        .keys({
          show: Joi.boolean().required(),
          on: Joi.array()
            .items(Joi.string().min(3))
            .required()
        })
        .optional()
    })
    .required();

  const schema = Joi.object().keys({
    config: Joi.object()
      .keys({
        inApp: configBody(),
        email: configBody()
      })
      .required()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
