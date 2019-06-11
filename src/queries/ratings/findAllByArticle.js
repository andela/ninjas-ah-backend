import db from '../../models';

export default async (articleId) => {
  const allRating = await db.Rating.findAll({
    where: {
      articleId
    },
    attributes: ['id', 'articleId', 'userId', 'rating'],
    logging: false
  });
  return allRating;
};
