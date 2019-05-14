import status from '../config/status';
import * as helper from '../helpers';
import { Token } from '../queries';

export default async (req, res, next) => {
  const token = req.headers['access-token'] || req.params.token || null;

  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ errors: { authentication: 'Please, sign-in!' } });
  }

  const decodedToken = helper.token.decode(token);

  if (decodedToken.errors || !decodedToken) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ errors: { token: 'Failed to authenticate token' } });
  }

  const isLoggedout = decodedToken.id ? await Token.findOne(decodedToken.id, token) : {};

  if (!isLoggedout.errors && Object.keys(isLoggedout).length) {
    return res.status(status.UNAUTHORIZED).json({ errors: { token: 'This token is invalid' } });
  }

  req.user = decodedToken;

  return next();
};
