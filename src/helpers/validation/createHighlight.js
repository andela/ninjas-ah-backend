import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    highlightedText: Joi.string()
      .min(5)
      .required(),
    startIndex: Joi.number().required(),
    stopIndex: Joi.number().required(),
    comment: Joi.string()
      .allow(null, '')
      .optional(),
    anchorKey: Joi.string()
      .allow(null, '')
      .optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
