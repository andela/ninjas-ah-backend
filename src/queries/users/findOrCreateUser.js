import db from '../../models';

/**
 * @param {object} condition
 * @param {object} user
 * @returns {array} an array containing the user object and a boolean
 * to check if the user was created or not
 */
export default async (condition = {}, user = {}) => {
  try {
    const findOrCreate = await db.User.findOrCreate({
      where: condition,
      defaults: user,
      logging: false
    });
    return [findOrCreate[0].get(), findOrCreate[1]];
  } catch (error) {
    return {
      errors: error
    };
  }
};
