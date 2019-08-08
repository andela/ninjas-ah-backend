import db from '../../models';

export default async (limit, offset, articleId) => {
  const allRatings = await db.Rating.findAll({
    limit,
    offset,
    where: {
      articleId
    },
    logging: false,
    attributes: ['id', 'rating', 'createdAt'],
    include: [
      {
        model: db.User,
        as: 'author',
        attributes: ['username', 'firstName', 'lastName', 'bio', 'image', 'createdAt']
      }
    ]
  });
  return allRatings;
};
