/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Gallery } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
const user = Factory.user.build();

delete user.id;

describe('Save gallery query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should save a gallery', async () => {
    const savedGallery = await Gallery.save({ image: 'placeholder.png', userId: createdUser.id });
    expect(Object.keys(savedGallery).length).to.be.above(0);
  });
});
