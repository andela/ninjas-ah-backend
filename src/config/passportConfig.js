import dotenv from 'dotenv';

dotenv.config();

export default {
  serializeUser: (user, done) => done(null, user),
  deserializeUser: (obj, done) => done(null, obj),
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.APP_URL_BACKEND}/api/v1/auth/facebook/callback`,
    profileFields: ['id', 'name', 'photos', 'email'],
    callbackFunc: (accessToken, refreshToken, profile, cb) => cb(null, profile)
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${process.env.APP_URL_BACKEND}/api/v1/auth/twitter/callback`,
    profileFields: ['id', 'name', 'photos', 'email'],
    includeEmail: true,
    callbackFunc: (token, tokenSecret, profile, cb) => cb(null, profile)
  },
  google: {
    consumerKey: process.env.GOOGLE_CONSUMER_KEY,
    consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${process.env.APP_URL_BACKEND}/api/v1/auth/google/callback`,
    callbackFunc: (accessToken, refreshToken, profile, cb) => cb(null, profile)
  },
  google2: {
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${process.env.APP_URL_BACKEND}/api/v1/auth/google/callback`,
    callbackFunc: (accessToken, refreshToken, profile, cb) => cb(null, profile)
  }
};
