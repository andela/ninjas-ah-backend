/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import db from '../../../models';
import { findOrCreate } from '../../../queries/highlights';
import * as Factory from '../../../helpers/factory';

const { expect } = chai;

const article = Factory.article.build();
const user = Factory.user.build();
delete article.id;
delete user.id;

let createdArticle = '';
let createdUser = '';

let highlight = '';

describe('Find or create highlight query', () => {
  before(async () => {
    try {
      await db.User.destroy({
        truncate: true,
        cascade: true,
        logging: false
      });
      createdUser = (await db.User.create(user, { logging: false })).get();
      article.userId = createdUser.id;
      createdArticle = (await db.Article.create(article, { logging: false })).dataValues;
      highlight = {
        articleSlug: createdArticle.slug,
        userId: createdUser.id,
        highlightedText: createdArticle.body.substring(0, 2),
        startIndex: 0,
        stopIndex: 2,
        comment: 'hey here'
      };
    } catch (error) {
      throw error;
    }
  });

  it('should throw an error message', async () => {
    const newOrExistingHighlight = await findOrCreate();
    expect(newOrExistingHighlight).to.include.keys('errors');
  });

  it('should create a highlight account', async () => {
    const newOrExistingHighlight = await findOrCreate(highlight);
    expect(Object.keys(newOrExistingHighlight[0]).length).to.be.above(0);
    expect(newOrExistingHighlight[1]).to.be.equal(true);
  });

  it('should not create a highlight account', async () => {
    const newOrExistingHighlight = await findOrCreate(highlight);
    expect(Object.keys(newOrExistingHighlight[0]).length).to.be.above(0);
    expect(newOrExistingHighlight[1]).to.be.equal(false);
  });
});
