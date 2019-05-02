/* eslint-disable require-jsdoc */

class passportStratagy {
  // find if user exists
  static async getUser(model, user) {
    const userExists = await model.findOne({ where: user });
    return userExists;
  }

  // verify social network
  static async socialNetwork(accessToken, refreshToken, profile, done) {
    let user;
    console.log(profile);
    try {
      // Get a facebook user
      if (profile.provider === 'facebook') {
        user = {
          firstName: profile.displayName,
          lastName: profile.displayName,
          username: profile.username,
          email: profile.email || null,
          password: profile.id,
          provider: profile.provider
        };
        return done(null, user);
      } if (profile.provider === 'twitter') {
        // Get a twitter user
        user = {
          firstName: profile.displayName,
          lastName: profile.displayName,
          username: profile.username,
          email: profile.email || null,
          password: profile.id,
          provider: profile.provider
        };
        done(null, user);
      } else if (profile.provider === 'google') {
        // Get a google user
        user = {
          username: profile.name.givenName,
          email: profile.emails[0].value,
          password: profile.id,
          provider: profile.provider
        };
        done(null, user);
      } else {
        done(null);
      }
    } catch (error) {
      done(error, false, error.message);
    }
  }
}

export default passportStratagy;
