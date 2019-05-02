import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import passportStratagy from '../helpers/passport';

export default passport.use('facebook', new FacebookStrategy({
  clientID: '343626592820181',
  clientSecret: '8716c2c77a7b4e7c1438e7cafda09294',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
  profileFields: ['id', 'emails', 'displayName'],
}, passportStratagy.socialNetwork));
