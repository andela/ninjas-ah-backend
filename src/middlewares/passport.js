import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passportConfig from '../config/passportConfig';

passport.use(new FacebookStrategy(passportConfig.facebook, passportConfig.facebook.callbackFunc));

passport.use(new TwitterStrategy(passportConfig.twitter, passportConfig.twitter.callbackFunc));

passport.use(new GoogleStrategy(passportConfig.google2, passportConfig.google2.callbackFunc));

passport.serializeUser(passportConfig.serializeUser);

passport.deserializeUser(passportConfig.deserializeUser);

export default passport;
