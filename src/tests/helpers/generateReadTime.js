// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
// eslint-disable-next-line import/no-extraneous-dependencies
import chaiHttp from 'chai-http';
import generator from '../../helpers/generateReadTime';
import * as Factory from '../../helpers/factory';

// const { expect } = chai;
chai.should();
const readtime = Factory.readtime.build();
chai.use(chaiHttp);

describe('Readtime', async () => {
  it('should add 12 if there is one image in the content of article', async () => {
    await generator(readtime.oneimage);
  });
  it('should add 22 if there is two images in the content of article', async () => {
    await generator(readtime.twoimage);
  });
  it('should add 22 for the first 2 images and add 2 seconds for each additional image in the content of article', async () => {
    await generator(readtime.threeimage);
  });
});
