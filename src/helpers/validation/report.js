import Joi from '@hapi/joi';
import reportTitleErrorResponse from './reportTitleErrorResponse';
import reportBodyErrorResponse from './reportBodyErrorResponse';
import reportTypeErrorResponse from './reportTypeErrorResponse';

export default (comment) => {
  const schema = {
    reportTitle: Joi.string()
      .min(3)
      .max(50)
      .required()
      .error(reportTitleErrorResponse),
    reportBody: Joi.string()
      .min(5)
      .required()
      .error(reportBodyErrorResponse),
    type: Joi.array()
      .items(
        Joi.string()
          .required()
          .min(3)
          .max(15)
      )
      .error(reportTypeErrorResponse)
  };

  return Joi.validate(comment, schema);
};
