import db from '../../models';

/**
 * @param {object} value what to update
 * @param {object} condition where to update
 * @returns {object|boolean} return an object containig updated user information
 * when successfuly updated otherwise false
 */
export default async (value = {}, condition = {}) => {
  try {
    const updatedUser = await db.User.update(value, {
      where: condition,
      returning: true,
      logging: false
    });
    return updatedUser[0] ? updatedUser[1][0].get() : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
