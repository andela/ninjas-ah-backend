import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import Passport from '../config/passportLocalConfig';

dotenv.config();
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;


export default (passport) => {
  passport.use('jwt', new JWTStrategy(opts, Passport));
};
