import dotenv from 'dotenv';
import { generate as generateToken } from '../../tokens';

dotenv.config();

export default ({ email, firstName, lastName }) => {
  const message = {};
  const token = generateToken({ email }, { expiresIn: '1h' });
  const appUrl = process.env.APP_URL;
  const singUpLink = `${appUrl}/api/v1/auth/activate/${token}`;

  message.subject = 'Activate your account - Authors Haven';
  message.html = `Hello ${firstName} ${lastName} </br>,
  <p>
    You are receiving this because you requested to create an account on Authors Haven,
    <br>
    Please, click on the link bellow to activate your account!!!
    <br><br><br>
    <a
      href='${singUpLink}'
      style="margin:35px 0;padding:15px 35px;background:#266cef;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
      Activate account Now
    </a>
  </p>`;

  return message;
};
