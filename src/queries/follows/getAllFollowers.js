import db from '../../models';

/**
 * @param {object} values
 * @returns {object} an object the return users
 */
export default async (values) => {
  const user = await db.Follows.findAll({
    where: values,
    logging: false,
    include: [
      {
        model: db.User,
        as: 'follower',
        attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'image']
      },
      {
        model: db.User,
        as: 'followedUser',
        attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'image']
      }
    ]
  });
  return user;
};
