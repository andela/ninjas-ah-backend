import db from '../../models';

/**
 * @param {object} userType
 * @param {object} permissions
 * @returns {array} an array containing an object of permissions and a boolean
 * to check if the permissions were created or not
 */
export default async (userType, permissions) => {
  try {
    return (await db.Permission.create({ userType, permissions }, { logging: false })).get();
  } catch (error) {
    return {
      errors: error
    };
  }
};
