/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import reportTypeErrorResponse from '../../../helpers/validation/reportTypeErrorResponse';

describe('Comment helper validator', () => {
  it('should pass', () => {
    const errors = [{ type: 'string.min' }];
    chai.expect(reportTypeErrorResponse(errors).length).to.be.above(0);
  });

  it('should not pass', () => {
    const errors = [{ type: 'a' }];
    chai.expect(reportTypeErrorResponse(errors).length).to.be.above(0);
  });
});
