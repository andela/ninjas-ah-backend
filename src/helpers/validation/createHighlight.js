import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    highlightedText: Joi.string()
      .min(5)
      .max(255)
      .required(),
    startIndex: Joi.number().required(),
    stopIndex: Joi.number().required(),
    comment: Joi.string()
      .min(5)
      .max(255)
      .required()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
