import db from '../../models';

/**
 * @param {object} value what to update
 * @param {object} condition where to update
 * @returns {boolean} return true when successfuly updated otherwise false
 */
export default async (value = {}, condition = {}) => {
  try {
    const updated = await db.User.update(value, { where: condition, logging: false });
    return !!updated[0];
  } catch (error) {
    return {
      errors: error
    };
  }
};
