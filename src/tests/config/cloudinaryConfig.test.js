/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import cloudinaryConfig from '../../config/cloudinaryConfig';

dotenv.config();
const { expect } = chai;

chai.use(chaiHttp);

describe('Cloudinary config', () => {
  it('should return api information from the callback', (done) => {
    const response = cloudinaryConfig();
    expect(response).to.be.an('object');
    response.cloud_name.should.be.a('string');
    response.api_key.should.be.a('string');
    response.api_secret.should.be.a('string');
    done();
  });
});
