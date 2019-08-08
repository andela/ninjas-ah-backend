import db from '../../models';

export default async (articleId, userId) => {
  const allRating = await db.Rating.findAll({
    limit: 1,
    where: {
      articleId,
      userId
    },
    attributes: ['id', 'articleId', 'userId', 'rating'],
    logging: false
  });
  return allRating;
};
