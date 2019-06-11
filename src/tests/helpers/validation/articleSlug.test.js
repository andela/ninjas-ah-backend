import chai from 'chai';
import * as helpers from '../../../helpers';

chai.should();

describe('Article Slug helper', () => {
  it('should pass', () => {
    const slug = 'hello-world-good-things-to-come';
    const checkSlug = helpers.validation.articleSlug(slug);
    chai.expect(checkSlug).to.be.an('object');
  });
});
