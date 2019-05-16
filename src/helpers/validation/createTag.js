import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    tagList: Joi.array()
      .min(1)
      .max(5)
      .items(
        Joi.string()
          .min(2)
          .max(25)
          .label('Tag element')
      )
      .required()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
