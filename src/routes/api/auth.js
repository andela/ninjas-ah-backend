import express from 'express';
import passport from 'passport';
import stratagy from '../../auth/passport_facebook';
import twitterStratagy from '../../auth/passport_twitter';
import googleStratagy from '../../auth/passport.google';
import UserController from '../../controllers/usersController';

const route = express.Router();

// Router for facebook stratagy
route.get('/auth/facebook', passport.authenticate('facebook'));
route.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), UserController.socialAuth);

// Router for twitter strategy
route.get('/auth/twitter', passport.authenticate('twitter'));
route.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false }), UserController.socialAuth);

// Router for Google strategy
route.get('/auth/google', passport.authenticate('google'));
route.get('/auth/google/callback', passport.authenticate('google', { session: false }), UserController.socialAuth);
export default route;
