import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import passportStratagy from '../helpers/passport';

export default passport.use('twitter', new TwitterStrategy({
  consumerKey: 'XAqZhSlptKyxqKnBwGa0BdTzr',
  consumerSecret: '3yPahUjc4tS2cZLC26SLto1WtapX0TFKJUfD0HNMr4yLhEeYc6',
  callbackURL: 'http://localhost:3000/api/v1/auth/twitter/callback',
  profileFields: ['id', 'emails', 'displayName'],
}, passportStratagy.socialNetwork));
