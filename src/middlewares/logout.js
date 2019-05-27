import { Token } from '../queries';
import status from '../config/status';
import { clearInvalidToken } from '../helpers';

export default async (req, res) => {
  const token = req.headers['access-token'] || req.params.token || null;
  const { user } = req;

  const savedToken = await Token.save(token, user.id);

  if (savedToken.errors) {
    return res
      .status(status.SERVER_ERROR)
      .json({ errors: 'Oops, something went wrong, please try again!' });
  }

  await clearInvalidToken(user.id);

  return res.status(status.OK).json({ message: 'you are successfully logged out' });
};
