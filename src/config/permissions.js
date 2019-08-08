import getAll from '../queries/permissions/findAllPermission';

/**
 * @returns {array} an array containing the list of permissions
 */
export default async () => {
  const allPermissions = await getAll();
  let normal = {};
  let admin = {};
  allPermissions.forEach((perm) => {
    if (perm.userType === 'normal') {
      normal = perm.permissions;
    } else if (perm.userType === 'admin') {
      admin = perm.permissions;
    }
  });
  return {
    normal,
    admin
  };
};
