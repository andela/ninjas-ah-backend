import * as Factory from '../helpers/factory';

const article = Factory.article.build();
article.createdAt = '2019-05-12T22:00:00';
article.updatedAt = '2019-05-12T22:00:00';
delete article.id;

export default {
  up: queryInterface => queryInterface.bulkInsert('Articles', [article], {}),

  down: queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
