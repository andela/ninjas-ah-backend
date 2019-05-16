/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import reportTitleErrorResponse from '../../../helpers/validation/reportTitleErrorResponse';

describe('Comment helper validator', () => {
  it('should pass', () => {
    const errors = [{ type: 'any.empty' }, { type: 'string.min' }];
    chai.expect(reportTitleErrorResponse(errors).length).to.be.above(0);
  });

  it('should not pass', () => {
    const errors = [{ type: 'aaaaa' }];
    chai.expect(reportTitleErrorResponse(errors).length).to.be.above(0);
  });
});
