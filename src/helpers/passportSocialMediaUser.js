/**
 * @param {object} user user account to create
 * @returns {object} a user object
 */
export default (user = {}) => (Object.keys(user).length
  ? {
    firstName: user.name ? user.name.givenName : user.displayName.split(' ')[0],
    lastName: user.name ? user.name.familyName : user.displayName.split(' ')[1],
    email: user.emails && user.emails.length ? user.emails[0].value : null,
    username: user.username || null,
    image: user.photos[0].value,
    accountProvider: user.provider,
    accountProviderUserId: user.id
  }
  : {});
