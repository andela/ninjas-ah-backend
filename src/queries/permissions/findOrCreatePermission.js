import db from '../../models';

/**
 * @param {object} userType
 * @param {object} permissions
 * @returns {array} an array containing an object of permissions and a boolean
 * to check if the permissions were created or not
 */
export default async (userType, permissions) => {
  try {
    const findOrCreate = await db.Permission.findOrCreate({
      where: { userType },
      defaults: { userType, permissions },
      logging: false
    });
    return [findOrCreate[0].get(), findOrCreate[1]];
  } catch (error) {
    return {
      errors: error
    };
  }
};
