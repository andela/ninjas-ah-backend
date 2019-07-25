import status from '../config/status';
import * as helper from '../helpers';
import { User } from '../queries';

export default async (req, res, next) => {
  let [isEmailUsed, isSameOldEmail] = [false, false];
  req.changeEmail = { newEmail: '', message: '' };

  if (req.body.password) {
    req.body.password = helper.password.hash(req.body.password);
  }
  if (req.body.permissions) {
    req.body.permissions = JSON.stringify(req.body.permissions);
  }
  if (req.body.email && req.user.role !== 'admin') {
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser.errors && Object.keys(findUser).length > 0) {
      isEmailUsed = req.user.id !== findUser.id;
      isSameOldEmail = req.body.email === findUser.email;
    }
    if (!isSameOldEmail) {
      req.changeEmail.newEmail = req.body.email;
      req.changeEmail.message = 'Check your email to confirm your new email';
    }
    delete req.body.email;
  }

  return (
    (isEmailUsed && res.status(status.EXIST).json({ errors: { email: 'email already used' } }))
    || next()
  );
};
