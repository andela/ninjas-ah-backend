import dotenv from 'dotenv';
import { generate as generateToken } from '../../tokens';

dotenv.config();

export default (data) => {
  const message = {};
  const token = generateToken({ userId: data.userId, email: data.email }, { expiresIn: '1h' });
  const appUrl = process.env.APP_URL_BACKEND;
  const link = `${appUrl}/api/v1/users/email/confirm/${token}`;
  message.subject = 'Update email - Authors Haven';
  message.html = `Hello</br>,
  <p>You are receiving this because you (or someone else) have requested the reset of your current email,<br>
   Click on the link bellow to confirm the process<br>
  <br><br><br>
  <a href='${link}' style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'>Confirm email</a></p>`;
  return message;
};
