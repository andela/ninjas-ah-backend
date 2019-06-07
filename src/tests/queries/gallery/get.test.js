/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { Gallery } from '../../../queries';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

let createdUser = '';
let createdGallery = '';
const user = Factory.user.build();

delete user.id;

describe('Get gallery query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).dataValues;
      createdGallery = (await db.Gallery.create(
        { image: 'placeholder.png', userId: createdUser.id },
        { logging: false }
      )).dataValues;
    } catch (error) {
      throw error;
    }
  });

  it('should get chats', async () => {
    const galleries = await Gallery.get();
    expect(galleries.length).to.be.above(0);
  });
});
