import db from '../../models';

/**
 * @param {object} condition
 * @returns {object} an object the return users
 */
export default async (condition = {}) => {
  const user = await db.User.findAll({
    where: condition,
    logging: false
  });
  return user;
};
