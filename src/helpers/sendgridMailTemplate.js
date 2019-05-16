import dotenv from 'dotenv';
import tokenGenerator from './tokens/tokenGenerator';

dotenv.config();

const appUrl = process.env.APP_URL;

export default {
  resetPassword: (to, from) => ({
    to,
    from,
    subject: 'Password Reset',
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password,<br>
     Click on the reset link bellow to complete the process<br>
     <a href='${appUrl}/api/v1/auth/reset/${tokenGenerator(
      { email: to },
      { expiresIn: '2h' }
    )}' target='_blank'>Reset Password</a></p>`
  })
};
