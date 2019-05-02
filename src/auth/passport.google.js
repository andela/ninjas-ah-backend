import passport from 'passport';
import GooglePlusStrategy from 'passport-google-plus';
import passportStratagy from '../helpers/passport';

export default passport.use('google', new GooglePlusStrategy({
  clientId: '652349978349-panc0jllv6pv88td6kkkmtsb2bmc9uk2.apps.googleusercontent.com',
  clientSecret: 'O_EsOMEvr6HL5f8qnU2SnsvG',
  callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
}, passportStratagy.socialNetwork));
