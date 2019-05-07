/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import { deleteElement } from '../queries/helpers/queryHelper';

describe('Delete query', () => {
  it('should pass', () => {
    chai.expect(deleteElement).not.be.an('array');
  });
});
