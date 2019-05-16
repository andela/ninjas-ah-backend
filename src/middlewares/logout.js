import { Token } from '../queries';
import status from '../config/status';

export default async (req, res) => {
  const token = req.headers['access-token'] || req.params.token || null;
  const { user } = req;

  const destroyToken = await Token.destroy(user.id);

  if (destroyToken.errors) {
    return res.status(status.SERVER_ERROR).json({ errors: destroyToken.errors });
  }

  const savedToken = await Token.save(token, user.id);

  if (savedToken.errors) {
    return res.status(status.SERVER_ERROR).json({ errors: savedToken.errors });
  }
  return res.status(status.OK).json({ message: 'you are successfuly logged out' });
};
