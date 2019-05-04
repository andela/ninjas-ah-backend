/* eslint-disable require-jsdoc */
import Joi from 'joi';

export default class Validate {
  static validateComment(comment) {
    const schema = {
      body: Joi.string()
        .min(3)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'Please enter your comment';
                break;
              case 'string.min':
                err.message = ` Your comment should have at least ${
                  err.context.limit
                } characters!`;
                break;
              default:
                break;
            }
          });
          return errors;
        })
    };

    return Joi.validate(comment, schema);
  }
}
