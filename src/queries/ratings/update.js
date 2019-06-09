import db from '../../models';

import findAllByArticle from './findAllByArticle';

export default async (articleId) => {
  const allRatings = await findAllByArticle(articleId);
  let total = 0;
  allRatings.forEach((value) => {
    total += value.dataValues.rating; // calculate current rating
  });
  const rating = parseInt((total / allRatings.length).toFixed(0), 10);
  await db.Article.update({ rating }, { where: { id: articleId }, logging: false });
};
