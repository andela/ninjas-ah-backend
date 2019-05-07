// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
import commentErrors from '../helpers/commentErrors';

describe('Comment helper validator', () => {
  it('should pass', () => {
    const errors = [{ type: 'any.empty' }, { type: 'string.min' }];
    chai.expect(commentErrors(errors).length).to.be.above(0);
  });

  it('should not pass', () => {
    const errors = [{ type: 'aaaaa' }];
    chai.expect(commentErrors(errors).length).to.be.above(0);
  });
});
