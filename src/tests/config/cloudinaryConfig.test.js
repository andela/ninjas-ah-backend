/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { cloudinaryConfig, uploader } from '../../config/cloudinaryConfig';

// const { expect } = chai;

chai.use(chaiHttp);

describe('Cloudinary config', () => {
  it('should return user information from the callback', async () => {
    const response = await cloudinaryConfig();
    console.log('rw', response);
    // expect(Object.keys(result).length).to.be.above(0);
  });
});
