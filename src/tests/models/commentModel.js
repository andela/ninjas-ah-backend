/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import sinonChai from 'sinon-chai';

import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import CommentModel from '../../models/comment';

const { expect } = chai;
chai.use(sinonChai);

// test comment model
describe('src/models/Comment', () => {
  const Comment = CommentModel(sequelize, dataTypes);
  const comment = new Comment();

  checkModelName(Comment)('Comment');

  context('properties', () => {
    ['id', 'articleId', 'userId', 'body', 'createdAt', 'updatedAt'].forEach(
      checkPropertyExists(comment)
    );
  });

  context('check associations', () => {
    const User = 'user';
    before(() => {
      Comment.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(Comment.belongsTo).to.have.been.calledWith(User);
    });
  });
});
