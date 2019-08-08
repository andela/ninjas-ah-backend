import db from '../../models';

/**
 * @param {object} object
 * @returns {object} an object containing the information of the user or null
 */
export default async (object) => {
  try {
    const followUser = await db.Follows.create(
      { followed: object.followed, userId: object.userId },
      {
        logging: false,
        include: [
          {
            model: db.User,
            as: 'followedUser',
            attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'image']
          }
        ]
      }
    );
    return followUser.dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
