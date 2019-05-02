import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user';

// Create a passport middleware to handle user registration

export default passport.use('local_signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
},
  (req, email, password, done) => {
    User.getOne({ email }, (err, user) => {
      console.log('email');
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne(id, (err, user) => {
    done(err, user);
  });
});