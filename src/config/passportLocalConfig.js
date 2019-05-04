
import models from '../models';

const { User } = models;
const passport = async (jwtPayload, done) => {
  const user = await User.findOne({ where: { id: jwtPayload.id } });
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
};

export default passport;
