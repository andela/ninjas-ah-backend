/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import reportBodyErrorResponse from '../../../helpers/validation/reportBodyErrorResponse';

describe('Comment helper validator', () => {
  it('should pass', () => {
    const errors = [{ type: 'any.empty' }, { type: 'string.min' }];
    chai.expect(reportBodyErrorResponse(errors).length).to.be.above(0);
  });

  it('should not pass', () => {
    const errors = [{ type: 'aaaaa' }];
    chai.expect(reportBodyErrorResponse(errors).length).to.be.above(0);
  });
});
