import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .min(2)
      .max(45)
      .required()
      .label('First name'),
    lastName: Joi.string()
      .min(2)
      .max(45)
      .required()
      .label('Last name'),
    username: Joi.string()
      .min(4)
      .max(45)
      .required(),
    email: Joi.string()
      .min(5)
      .max(100)
      .required(),
    bio: Joi.string()
      .min(5)
      .optional(),
    password: Joi.string()
      .min(8)
      .max(100)
      .required(),
    role: Joi.string()
      .min(2)
      .max(100)
      .optional(),
    permissions: Joi.object().optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
